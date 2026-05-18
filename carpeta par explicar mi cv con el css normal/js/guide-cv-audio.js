/**
 * Lecteur audio du guide (guide-cv.html) — Web Speech API (speechSynthesis).
 *
 * Ce qui fait que ça fonctionne de façon fiable :
 * - init() après DOMContentLoaded ; vérifie que les IDs (#ab-play, #ab-chapter, etc.) existent.
 * - Compteur `session` : incrémenté à l’arrêt et à chaque nouvelle lecture ; les callbacks onend
 *   retardés d’une ancienne session ne font rien (évite les bugs après Stop ou nouveau ▶).
 * - `utteranceHold` : garde une référence forte à l’utterance courante (Chrome peut la GC trop tôt).
 * - Voix : mode Auto privilégie les voix locales (localService), plus stables que les voix « online » ;
 *   sinon voix choisie dans #ab-voice (voiceURI). `utt.lang` aligné sur la voix pour une meilleure prononciation.
 * - Texte : découpe par phrases (. ? ! ; …) pour éviter des coupures au milieu de « index.html » ;
 *   normalisation (fichiers, caractères parasites) pour une lecture plus claire.
 * - Introduction sans « Enchaîner » : le sommaire est ajouté à la suite dans les mêmes chunks pour qu’il soit lu aussi ;
 *   avec « Enchaîner », le sommaire reste un chapitre séparé (pas de doublon).
 * - <code> hors <pre> : remplacé par le texte à l’intérieur de la balise (lecture du nom de fichier, balise, etc.).
 * - Chrome/Edge : getVoices() + événement voiceschanged + délais courts si la liste est vide au premier clic.
 * - Lecture / pause : pause() + flag deferredPaused ; entre deux passages speaking est souvent false
 *   (sinon le clic ▶ relançait tout depuis le début). Reprise : resume() et speakNext(session) si besoin.
 * - cancel() avant un nouveau chapitre ; clearChunkTimer pour ne pas enchaîner après pause.
 *
 * UI : taille / position du panneau = guide-cv.css + bloc <style> dans guide-cv.html (secours Go Live).
 */
'use strict';

(function () {
  const CHAPTER_IDS = [
    'guide-intro',
    'sommaire',
    'image-1',
    'image-2',
    'image-3',
    'image-4',
    'image-5',
    'image-6',
    'image-7',
    'image-8',
    'css',
    'revision-qa',
    'quiz-final',
  ];

  /** Phrases entières jusqu’à cette longueur (car.) — moins de coupures au milieu d’un mot. */
  const CHUNK_LEN = 300;
  const BETWEEN_CHUNKS_MS_NORMAL = 220;
  const BETWEEN_CHUNKS_MS_CLEAR = 420;
  const AFTER_CANCEL_MS = 50;

  function sectionTitle(id) {
    const el = document.getElementById(id);
    if (!el) return id;
    const h2 = el.querySelector('h2');
    if (h2 && h2.textContent.trim()) return h2.textContent.trim();
    if (id === 'guide-intro') return 'Introduction';
    return id;
  }

  function langMode() {
    const r = document.querySelector('input[name="ab-lang"]:checked');
    return r && r.value === 'es' ? 'es' : 'fr';
  }

  function extractReadableText(sectionEl) {
    const clone = sectionEl.cloneNode(true);
    clone.querySelectorAll('pre, textarea, script, style, svg').forEach((n) => n.remove());
    /** <code> hors <pre> : lire le contenu textuel (pas une phrase générique). */
    clone.querySelectorAll('code').forEach((c) => {
      if (c.closest('pre')) return;
      const inner = String(c.textContent || '')
        .replace(/\s+/g, ' ')
        .trim();
      const spoken = inner ? ` ${inner} ` : ' ';
      c.replaceWith(document.createTextNode(spoken));
    });
    clone.querySelectorAll('img').forEach((img) => {
      const alt = (img.getAttribute('alt') || '').trim();
      img.replaceWith(document.createTextNode(alt ? `Illustration : ${alt}. ` : ' '));
    });
    let t = (clone.innerText || '').replace(/\s+/g, ' ').trim();
    t = t.replace(/\bhttps?:\/\/\S+/gi, 'lien web. ');
    return normalizeForSpeech(t);
  }

  /** Caractères que la synthèse vocalise mal ; noms de fichiers lisibles ; restes d’anciennes annonces code. */
  function normalizeForSpeech(text) {
    let t = String(text || '')
      .replace(/\b([\w-]+)\.(html|css|js|png|jpg|jpeg|gif|webp|svg)\b/gi, '$1, fichier $2')
      .replace(/[<>{}[\]`_|\\]{1,}/g, ' ')
      /** Ancienne annonce TTS (ou restes si l’aperçu a modifié le texte) — retirée pour ne plus la lire. */
      .replace(/\.?\s*\(\s*voir le code à l['’]écran\.\s*\)\s*/gi, ' ')
      .replace(/voir le code à l['’]écran\.?\s*/gi, ' ')
      .replace(/\.?\s*\(\s*ver el código en pantalla\.\s*\)\s*/gi, ' ')
      .replace(/ver el código en pantalla\.?\s*/gi, ' ')
      .replace(/\uE000\uE001/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return t;
  }

  /** Découpe sur fin de phrase (. ! ? … ;) pour éviter « in dex point html » au milieu d’un mot. */
  function splitIntoPhrases(text) {
    const t = (text || '').replace(/\s+/g, ' ').trim();
    if (!t) return [];
    return t.split(/(?:\.\s+|\!\s+|\?\s+|…\s+|;\s+)/).map((s) => s.trim()).filter(Boolean);
  }

  function splitLongBySpace(rest, maxLen) {
    const parts = [];
    let guard = 0;
    let r = rest.trim();
    while (r.length > maxLen && guard++ < 5000) {
      let cut = r.lastIndexOf(' ', maxLen);
      if (cut < 32) cut = maxLen;
      const piece = r.slice(0, cut).trim();
      if (piece) parts.push(piece);
      const next = r.slice(cut).trim();
      if (!next || next.length >= r.length) break;
      r = next;
    }
    if (r) parts.push(r);
    return parts.filter(Boolean);
  }

  function mergePhrasesToChunks(phrases, maxLen) {
    const out = [];
    let cur = '';
    for (const p of phrases) {
      if (!p) continue;
      if (!cur) {
        cur = p;
        continue;
      }
      if (cur.length + 2 + p.length <= maxLen) {
        cur = `${cur}. ${p}`;
      } else {
        if (cur.length > maxLen) out.push(...splitLongBySpace(cur, maxLen));
        else out.push(cur);
        if (p.length > maxLen) {
          out.push(...splitLongBySpace(p, maxLen));
          cur = '';
        } else {
          cur = p;
        }
      }
    }
    if (cur) {
      if (cur.length > maxLen) out.push(...splitLongBySpace(cur, maxLen));
      else out.push(cur);
    }
    return out.filter(Boolean);
  }

  function splitText(text, maxLen) {
    const phrases = splitIntoPhrases((text || '').trim());
    if (!phrases.length) return [];
    const merged = mergePhrasesToChunks(phrases, maxLen);
    return merged.length ? merged : splitLongBySpace((text || '').trim(), maxLen);
  }

  /** Voix « type IA » = neurales / naturelles (Edge, parfois Chrome) — plus seulement localService. */
  function voicesForMode(list, mode) {
    if (!list.length) return [];
    if (mode === 'fr') {
      return list.filter((v) => (v.lang || '').toLowerCase().startsWith('fr'));
    }
    const esES = list.filter((v) => /^(es-ES|es_ES)/i.test(v.lang || ''));
    if (esES.length) return esES;
    return list.filter((v) => (v.lang || '').toLowerCase().startsWith('es'));
  }

  function voiceMatchesMode(v, mode) {
    if (mode === 'fr') return (v.lang || '').toLowerCase().startsWith('fr');
    if (mode === 'es') {
      if (/^(es-ES|es_ES)/i.test(v.lang || '')) return true;
      return (v.lang || '').toLowerCase().startsWith('es');
    }
    return true;
  }

  function scoreVoice(v) {
    const n = (v.name || '').toLowerCase();
    let s = 0;
    if (n.includes('neural') || n.includes('neuronal')) s += 130;
    if (n.includes('natural')) s += 75;
    if (n.includes('wavenet')) s += 120;
    if (n.includes('premium') || n.includes('enhanced')) s += 55;
    if (n.includes('microsoft') && (n.includes('online') || n.includes('neural'))) s += 85;
    if (n.includes('google') && (n.includes('fr') || n.includes('es') || n.includes('spanish'))) s += 35;
    if (v.default) s += 12;
    if (v.localService) s += 8;
    return s;
  }

  /**
   * Voix « Auto » : d’abord les voix locales (moins de coupures / silence qu’en ligne sans réseau),
   * puis la meilleure qualité parmi elles. Si aucune locale, toutes les voix de la langue.
   */
  function pickVoiceAuto(list, mode) {
    const cand = voicesForMode(list, mode);
    if (!cand.length) return null;
    const locals = cand.filter((v) => v.localService);
    const pool = locals.length ? locals : cand;
    let best = pool[0];
    let bestSc = scoreVoice(best);
    for (let i = 1; i < pool.length; i++) {
      const sc = scoreVoice(pool[i]);
      if (sc > bestSc || (sc === bestSc && pool[i].default && !best.default)) {
        best = pool[i];
        bestSc = sc;
      }
    }
    return best;
  }

  function resolveVoice(list, mode, preferredUri) {
    if (preferredUri && list.length) {
      const found = list.find((v) => v.voiceURI === preferredUri);
      if (found && voiceMatchesMode(found, mode)) return found;
    }
    return pickVoiceAuto(list, mode);
  }

  function configureUtterance(utt, mode, preferredVoiceUri, clearReading) {
    const list = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    const v = resolveVoice(list, mode, preferredVoiceUri || '');
    if (v) {
      utt.voice = v;
      const primary = (v.lang || '').split(',')[0].trim();
      if (primary) utt.lang = primary;
      else utt.lang = mode === 'es' ? 'es-ES' : 'fr-FR';
    } else {
      utt.lang = mode === 'es' ? 'es-ES' : 'fr-FR';
    }
    utt.rate = clearReading ? 0.84 : 0.92;
    utt.pitch = 1;
    utt.volume = 1;
  }

  function init() {
    const statusEl = document.getElementById('ab-status');
    const chapterEl = document.getElementById('ab-chapter');
    const chainEl = document.getElementById('ab-chain');
    const btnPlay = document.getElementById('ab-play');
    const btnStop = document.getElementById('ab-stop');
    const btnPrev = document.getElementById('ab-prev');
    const btnNext = document.getElementById('ab-next');
    const voiceEl = document.getElementById('ab-voice');
    const clearEl = document.getElementById('ab-clear');

    if (!statusEl || !chapterEl || !chainEl || !btnPlay || !btnStop || !btnPrev || !btnNext) {
      console.warn('[guide-cv-audio] Contrôles introuvables dans le DOM.');
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth) {
      statusEl.textContent = 'Synthèse vocale indisponible sur ce navigateur.';
      return;
    }

    let session = 0;
    let chapterIndex = 0;
    let chunkIndex = 0;
    let chunks = [];
    /** Référence forte pour Chrome (évite la collecte de l’utterance avant la fin) */
    let utteranceHold = null;
    /** L’utilisateur a mis en pause : entre deux phrases speaking === false sans ce flag → relance complète par erreur. */
    let deferredPaused = false;
    /** setTimeout entre deux passages (annulé à la pause). */
    let chunkTimerId = null;

    function clearChunkTimer() {
      if (chunkTimerId !== null) {
        clearTimeout(chunkTimerId);
        chunkTimerId = null;
      }
    }

    function midChapterProgress() {
      return chunks.length > 0 && chunkIndex < chunks.length;
    }

    function setStatus(msg) {
      statusEl.textContent = msg;
    }

    function setPlayIcon(playing) {
      btnPlay.textContent = playing ? '❚❚' : '▶';
    }

    function fillChapters() {
      chapterEl.innerHTML = '';
      CHAPTER_IDS.forEach((id, i) => {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = sectionTitle(id);
        chapterEl.appendChild(opt);
      });
      chapterEl.value = String(chapterIndex);
    }

    function populateVoiceSelect() {
      if (!voiceEl) return;
      const mode = langMode();
      const list = synth.getVoices();
      const prev = voiceEl.value;
      let saved = '';
      try {
        saved = localStorage.getItem('ab-voice-uri') || '';
      } catch (_) {}

      const voices = voicesForMode(list, mode).slice();
      voices.sort((a, b) => scoreVoice(b) - scoreVoice(a) || (a.name || '').localeCompare(b.name || ''));

      voiceEl.innerHTML = '';
      const optAuto = document.createElement('option');
      optAuto.value = '';
      optAuto.textContent =
        mode === 'es'
          ? 'Auto: voz del sistema (estable)'
          : 'Auto : voix de cet ordinateur (stable, recommandé)';
      voiceEl.appendChild(optAuto);

      for (const v of voices) {
        const o = document.createElement('option');
        o.value = v.voiceURI;
        const sc = scoreVoice(v);
        const tag = sc >= 90 ? ' ★' : sc >= 40 ? ' ·' : '';
        o.textContent = (v.name || v.voiceURI) + tag;
        voiceEl.appendChild(o);
      }

      let pick = '';
      if (prev && voices.some((w) => w.voiceURI === prev)) pick = prev;
      else if (saved && voices.some((w) => w.voiceURI === saved)) pick = saved;
      voiceEl.value = pick;
    }

    function preferredVoiceUri() {
      return (voiceEl && voiceEl.value) || '';
    }

    function buildChunks(index) {
      const id = CHAPTER_IDS[index];
      const sec = document.getElementById(id);
      if (!sec) return [];
      const title = sectionTitle(id);
      const body = extractReadableText(sec);
      const maxLen = clearEl && clearEl.checked ? Math.max(CHUNK_LEN, 380) : CHUNK_LEN;
      let fullText = `${title}. ${body}`;
      /*
       * Sans « Enchaîner les chapitres », la lecture s’arrêtait après l’intro : le sommaire n’était pas entendu
       * sans recliquer sur le chapitre. On concatène le bloc #sommaire après l’intro dans ce cas seulement.
       * Avec enchaînement activé, le sommaire est déjà le chapitre suivant — ne pas dupliquer.
       */
      if (id === 'guide-intro' && chainEl && !chainEl.checked) {
        const somEl = document.getElementById('sommaire');
        if (somEl) {
          fullText = `${fullText}\n\n${sectionTitle('sommaire')}. ${extractReadableText(somEl)}`;
        }
      }
      return splitText(fullText, maxLen);
    }

    function clearReadingOn() {
      return !!(clearEl && clearEl.checked);
    }

    function betweenChunksMs() {
      return clearReadingOn() ? BETWEEN_CHUNKS_MS_CLEAR : BETWEEN_CHUNKS_MS_NORMAL;
    }

    function stopPlayback() {
      session += 1;
      deferredPaused = false;
      clearChunkTimer();
      try {
        synth.cancel();
      } catch (_) {}
      utteranceHold = null;
      chunkIndex = 0;
      chunks = [];
      setPlayIcon(false);
      btnPlay.setAttribute('aria-label', 'Démarrer ou reprendre la lecture');
    }

    function speakNext(mySession) {
      if (mySession !== session) return;
      if (deferredPaused) return;

      while (chunkIndex < chunks.length && !String(chunks[chunkIndex] || '').trim()) {
        chunkIndex += 1;
      }

      if (chunkIndex >= chunks.length) {
        utteranceHold = null;
        setPlayIcon(false);
        btnPlay.setAttribute('aria-label', 'Démarrer ou reprendre la lecture');

        if (chainEl.checked && chapterIndex < CHAPTER_IDS.length - 1) {
          chapterIndex += 1;
          chapterEl.value = String(chapterIndex);
          document.getElementById(CHAPTER_IDS[chapterIndex])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => startChapter(false, mySession), AFTER_CANCEL_MS);
          return;
        }
        setStatus('Fin du chapitre.');
        return;
      }

      try {
        if (synth.paused) synth.resume();
      } catch (_) {}

      const raw = String(chunks[chunkIndex]).trim();
      const utt = new SpeechSynthesisUtterance(raw);
      utteranceHold = utt;
      configureUtterance(utt, langMode(), preferredVoiceUri(), clearReadingOn());

      utt.onend = () => {
        utteranceHold = null;
        if (mySession !== session) return;
        chunkIndex += 1;
        clearChunkTimer();
        if (deferredPaused) return;
        chunkTimerId = setTimeout(() => {
          chunkTimerId = null;
          if (mySession !== session) return;
          speakNext(mySession);
        }, betweenChunksMs());
      };

      utt.onerror = () => {
        utteranceHold = null;
        if (mySession !== session) return;
        setStatus('Erreur audio. Essayez Chrome ou Edge, ou rechargez la page.');
        setPlayIcon(false);
        btnPlay.setAttribute('aria-label', 'Démarrer ou reprendre la lecture');
      };

      setStatus(`${sectionTitle(CHAPTER_IDS[chapterIndex])} — passage ${chunkIndex + 1} / ${chunks.length}`);

      try {
        synth.speak(utt);
      } catch (e) {
        utteranceHold = null;
        setStatus('Impossible de lancer la lecture vocale.');
        setPlayIcon(false);
        btnPlay.setAttribute('aria-label', 'Démarrer ou reprendre la lecture');
      }
    }

    function startChapter(doScroll, mySession) {
      if (mySession !== session) return;

      deferredPaused = false;
      clearChunkTimer();
      try {
        synth.cancel();
      } catch (_) {}
      utteranceHold = null;
      chunkIndex = 0;
      chapterIndex = parseInt(chapterEl.value, 10) || 0;
      chunks = buildChunks(chapterIndex);

      if (!chunks.length) {
        setStatus('Pas de texte lisible pour ce chapitre.');
        setPlayIcon(false);
        btnPlay.setAttribute('aria-label', 'Démarrer ou reprendre la lecture');
        return;
      }

      if (doScroll) {
        document.getElementById(CHAPTER_IDS[chapterIndex])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      setPlayIcon(true);
      btnPlay.setAttribute('aria-label', 'Mettre en pause');

      const mode = langMode();
      const list = synth.getVoices();
      const v = resolveVoice(list, mode, preferredVoiceUri());
      if (v) {
        setStatus(`Lecture — ${mode === 'es' ? 'ES' : 'FR'} · ${v.name}`);
      } else {
        setStatus(`Lecture — ${mode === 'es' ? 'es-ES' : 'fr-FR'} (voix par défaut)`);
      }

      chunkTimerId = setTimeout(() => {
        chunkTimerId = null;
        try {
          if (synth.paused) synth.resume();
        } catch (_) {}
        speakNext(mySession);
      }, AFTER_CANCEL_MS);
    }

    function beginFromUserClick() {
      synth.getVoices();

      const tryStart = () => {
        session += 1;
        const sid = session;
        synth.getVoices();
        try {
          synth.resume();
        } catch (_) {}
        startChapter(true, sid);
      };

      if (synth.getVoices().length > 0) {
        tryStart();
        return;
      }

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        synth.removeEventListener('voiceschanged', onVc);
        tryStart();
      };

      function onVc() {
        synth.getVoices();
        if (synth.getVoices().length) finish();
      }

      synth.addEventListener('voiceschanged', onVc);
      setTimeout(() => {
        synth.getVoices();
        if (synth.getVoices().length) finish();
      }, 50);
      setTimeout(finish, 700);
    }

    function onPlayPause() {
      if (!synth) return;

      // Reprise après pause utilisateur (y compris entre deux passages : speaking est alors false)
      if (deferredPaused && midChapterProgress()) {
        deferredPaused = false;
        try {
          if (synth.paused) synth.resume();
          else if (!synth.speaking) speakNext(session);
        } catch (_) {}
        setPlayIcon(true);
        btnPlay.setAttribute('aria-label', 'Mettre en pause');
        setStatus(`${sectionTitle(CHAPTER_IDS[chapterIndex])} — passage ${chunkIndex + 1} / ${chunks.length}`);
        return;
      }

      if (synth.paused) {
        deferredPaused = false;
        try {
          synth.resume();
        } catch (_) {}
        if (!synth.speaking && midChapterProgress()) speakNext(session);
        setPlayIcon(true);
        btnPlay.setAttribute('aria-label', 'Mettre en pause');
        return;
      }

      /** Pause : phrase en cours, synthèse en pause, ou entre deux phrases (timer / utterance en attente). */
      const canPauseReading =
        synth.speaking ||
        synth.paused ||
        (midChapterProgress() && (chunkTimerId !== null || utteranceHold !== null));

      if (canPauseReading) {
        deferredPaused = true;
        clearChunkTimer();
        try {
          if (synth.speaking || synth.paused) synth.pause();
        } catch (_) {}
        setPlayIcon(false);
        btnPlay.setAttribute('aria-label', 'Reprendre la lecture');
        setStatus('Pause.');
        return;
      }

      beginFromUserClick();
    }

    function onStop() {
      stopPlayback();
      setStatus('Lecture arrêtée.');
    }

    function onStepChapter(delta) {
      stopPlayback();
      chapterIndex = Math.max(0, Math.min(CHAPTER_IDS.length - 1, chapterIndex + delta));
      chapterEl.value = String(chapterIndex);
      document.getElementById(CHAPTER_IDS[chapterIndex])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setStatus('Chapitre sélectionné. Appuyez sur ▶ pour lire.');
    }

    fillChapters();
    populateVoiceSelect();

    try {
      const saved = localStorage.getItem('ab-lang');
      if (saved === 'es') {
        const r = document.querySelector('input[name="ab-lang"][value="es"]');
        if (r) r.checked = true;
      }
    } catch (_) {}

    document.querySelectorAll('input[name="ab-lang"]').forEach((inp) => {
      inp.addEventListener('change', () => {
        try {
          localStorage.setItem('ab-lang', langMode());
        } catch (_) {}
        stopPlayback();
        populateVoiceSelect();
        setStatus(langMode() === 'es' ? 'Langue : espagnol (castillan).' : 'Langue : français.');
      });
    });

    chapterEl.addEventListener('change', () => {
      stopPlayback();
      chapterIndex = parseInt(chapterEl.value, 10) || 0;
      setStatus('Chapitre : ' + sectionTitle(CHAPTER_IDS[chapterIndex]) + '.');
    });

    try {
      chainEl.checked = localStorage.getItem('ab-chain') === '1';
    } catch (_) {}
    chainEl.addEventListener('change', () => {
      try {
        localStorage.setItem('ab-chain', chainEl.checked ? '1' : '0');
      } catch (_) {}
    });

    if (voiceEl) {
      voiceEl.addEventListener('change', () => {
        try {
          localStorage.setItem('ab-voice-uri', voiceEl.value || '');
        } catch (_) {}
        setStatus('Voix enregistrée. Relancez la lecture avec ▶.');
      });
    }

    if (clearEl) {
      try {
        const s = localStorage.getItem('ab-clear');
        if (s === '0') clearEl.checked = false;
        else if (s === '1') clearEl.checked = true;
      } catch (_) {}
      clearEl.addEventListener('change', () => {
        try {
          localStorage.setItem('ab-clear', clearEl.checked ? '1' : '0');
        } catch (_) {}
        setStatus(clearEl.checked ? 'Lecture lente + pauses. Relancez avec ▶.' : 'Lecture normale. Relancez avec ▶.');
      });
    }

    btnPlay.addEventListener('click', onPlayPause);
    btnStop.addEventListener('click', onStop);
    btnPrev.addEventListener('click', () => onStepChapter(-1));
    btnNext.addEventListener('click', () => onStepChapter(1));

    synth.addEventListener('voiceschanged', () => {
      synth.getVoices();
      populateVoiceSelect();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) return;
      if (deferredPaused) return;
      try {
        if (synth.paused) synth.resume();
      } catch (_) {}
    });

    setStatus('Prêt : chapitre + ▶ pour lire.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
