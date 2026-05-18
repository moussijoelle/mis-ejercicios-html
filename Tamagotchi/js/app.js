(function () {
  const IDS = {
    videoTayo: "videoTayo",
    mensajeJuego: "mensaje-juego",
    iconosFelicidad: "iconos-felicidad",
    iconosSalud: "iconos-salud",
    iconosLimpieza: "iconos-limpieza",
    iconosEnergia: "iconos-energia",
    btnAlimentar: "btn-alimentar",
    btnJugar: "btn-jugar",
    btnDuchar: "btn-duchar",
    btnAcariciar: "btn-acariciar",
    btnDormir: "btn-dormir",
    btnReprender: "btn-reprender",
  };

  const dom = {
    videoTayo: document.getElementById(IDS.videoTayo),
    mensajeJuego: document.getElementById(IDS.mensajeJuego),
    iconosFelicidad: document.getElementById(IDS.iconosFelicidad),
    iconosSalud: document.getElementById(IDS.iconosSalud),
    iconosLimpieza: document.getElementById(IDS.iconosLimpieza),
    iconosEnergia: document.getElementById(IDS.iconosEnergia),
    btnAlimentar: document.getElementById(IDS.btnAlimentar),
    btnJugar: document.getElementById(IDS.btnJugar),
    btnDuchar: document.getElementById(IDS.btnDuchar),
    btnAcariciar: document.getElementById(IDS.btnAcariciar),
    btnDormir: document.getElementById(IDS.btnDormir),
    btnReprender: document.getElementById(IDS.btnReprender),
  };

  const sourcePrincipal = dom.videoTayo?.querySelector("source");

  const videoPantallaPrincipal = "assets/videos/pantalla-principal.webm";

  const CLAVE_GUARDADO = "tamagotchi-tayo-guardado";
  const VERSION_GUARDADO = 1;
  const MINUTOS_PASIVO_OFFLINE_TOPE = 360;

  if (!dom.videoTayo || !sourcePrincipal) {
    return;
  }

  const ESTADO_INICIAL_DIA = Object.freeze({
    felicidad: 5,
    salud: 5,
    limpieza: 8,
    energia: 3,
  });

  const estado = {
    felicidad: ESTADO_INICIAL_DIA.felicidad,
    salud: ESTADO_INICIAL_DIA.salud,
    limpieza: ESTADO_INICIAL_DIA.limpieza,
    energia: ESTADO_INICIAL_DIA.energia,
  };

  const ventanasPorAccion = {
    alimentar: [
      [9 * 60, 10 * 60],
      [14 * 60, 15 * 60],
      [20 * 60, 21 * 60],
    ],
    jugar: [
      [11 * 60, 12 * 60],
      [17 * 60, 18 * 60],
    ],
    duchar: [[19 * 60, 19 * 60 + 45]],
    acariciar: [[21 * 60, 21 * 60 + 45]],
    dormir: [[22 * 60, 24 * 60 - 1]],
  };

  const idBotonATipo = {
    [IDS.btnAlimentar]: "alimentar",
    [IDS.btnJugar]: "jugar",
    [IDS.btnDuchar]: "duchar",
    [IDS.btnAcariciar]: "acariciar",
    [IDS.btnDormir]: "dormir",
  };

  const mensajesRebeldes = [
    "Tayo Tayo quiere banquetes ahora mismo.",
    "Tayo Tayo exige jugar fuera de hora.",
    "Tayo Tayo no quiere esperar: pide atención ya.",
    "Tayo Tayo hace un berrinche por comida.",
  ];

  const RUTAS_ICONO_ESTADO = {
    felicidad: "assets/img/star.svg",
    salud: "assets/img/heart.svg",
    limpieza: "assets/img/water.svg",
    energia: "assets/img/energy.svg",
  };

  let alertaRebeldeActiva = false;
  let textoAlertaRebelde = "";
  let alertasRebeldeHoy = 0;
  let diaConteoAlertas = "";
  let temporizadorMensajeTemporal = null;
  let temporizadorAlertaRebelde = null;

  function clamp(valor, min, max) {
    return Math.max(min, Math.min(max, valor));
  }

  function normalizarStat(valor, porDefecto) {
    const n = Number(valor);
    if (!Number.isFinite(n)) {
      return porDefecto;
    }
    return clamp(Math.round(n), 0, 10);
  }

  function guardarPartida() {
    try {
      const payload = {
        version: VERSION_GUARDADO,
        lastSaveAt: new Date().toISOString(),
        estado: {
          felicidad: estado.felicidad,
          salud: estado.salud,
          limpieza: estado.limpieza,
          energia: estado.energia,
        },
        alertaRebeldeActiva,
        textoAlertaRebelde,
        alertasRebeldeHoy,
        diaConteoAlertas,
        diaPartida: new Date().toDateString(),
        videoSinMute: dom.videoTayo.muted === false,
      };
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(payload));
    } catch {
      /* almacenamiento lleno o modo privado */
    }
  }

  function aplicarUnTickPasivo() {
    sincronizarDiaAlertas();
    estado.energia = clamp(estado.energia - 1, 0, 10);
    estado.limpieza = clamp(estado.limpieza - 1, 0, 10);
    const critico =
      estado.felicidad < 3 ||
      estado.limpieza < 3 ||
      estado.energia < 3;
    if (critico) {
      estado.salud = clamp(estado.salud - 1, 0, 10);
    }
  }

  function restaurarDesdeAlmacenamiento() {
    try {
      const raw = localStorage.getItem(CLAVE_GUARDADO);
      if (!raw) {
        return;
      }
      const data = JSON.parse(raw);
      if (data.version !== VERSION_GUARDADO || !data.estado || typeof data.estado !== "object") {
        return;
      }

      const hoy = new Date().toDateString();
      let diaPartidaGuardado =
        typeof data.diaPartida === "string" && data.diaPartida
          ? data.diaPartida
          : null;
      if (!diaPartidaGuardado && typeof data.lastSaveAt === "string") {
        const t0 = Date.parse(data.lastSaveAt);
        if (Number.isFinite(t0)) {
          diaPartidaGuardado = new Date(t0).toDateString();
        }
      }

      if (diaPartidaGuardado && diaPartidaGuardado !== hoy) {
        estado.felicidad = ESTADO_INICIAL_DIA.felicidad;
        estado.salud = ESTADO_INICIAL_DIA.salud;
        estado.limpieza = ESTADO_INICIAL_DIA.limpieza;
        estado.energia = ESTADO_INICIAL_DIA.energia;
        alertaRebeldeActiva = false;
        textoAlertaRebelde = "";
        alertasRebeldeHoy = 0;
        diaConteoAlertas = hoy;
        sincronizarDiaAlertas();
        mostrarCajaMensaje("");
        if (data.videoSinMute === true) {
          dom.videoTayo.muted = false;
        }
        return;
      }

      estado.felicidad = normalizarStat(data.estado.felicidad, estado.felicidad);
      estado.salud = normalizarStat(data.estado.salud, estado.salud);
      estado.limpieza = normalizarStat(data.estado.limpieza, estado.limpieza);
      estado.energia = normalizarStat(data.estado.energia, estado.energia);

      alertaRebeldeActiva = Boolean(data.alertaRebeldeActiva);
      textoAlertaRebelde =
        typeof data.textoAlertaRebelde === "string" ? data.textoAlertaRebelde : "";
      const nAlertas = Number(data.alertasRebeldeHoy);
      alertasRebeldeHoy = Number.isFinite(nAlertas)
        ? clamp(Math.round(nAlertas), 0, 99)
        : 0;
      diaConteoAlertas =
        typeof data.diaConteoAlertas === "string" ? data.diaConteoAlertas : "";

      sincronizarDiaAlertas();

      const last = data.lastSaveAt;
      if (typeof last === "string") {
        const t = Date.parse(last);
        if (Number.isFinite(t)) {
          let minutos = Math.floor((Date.now() - t) / 60000);
          if (minutos > MINUTOS_PASIVO_OFFLINE_TOPE) {
            minutos = MINUTOS_PASIVO_OFFLINE_TOPE;
          }
          for (let i = 0; i < minutos; i += 1) {
            aplicarUnTickPasivo();
          }
        }
      }

      if (data.videoSinMute === true) {
        dom.videoTayo.muted = false;
      }

      if (alertaRebeldeActiva && textoAlertaRebelde) {
        mostrarCajaMensaje(textoAlertaRebelde);
      }
    } catch {
      /* JSON inválido o datos corruptos */
    }
  }

  function minutosDelDia(fecha) {
    return fecha.getHours() * 60 + fecha.getMinutes();
  }

  function dentroDeHorario(tipo) {
    const ventanas = ventanasPorAccion[tipo];
    if (!ventanas) {
      return true;
    }
    const m = minutosDelDia(new Date());
    return ventanas.some(([ini, fin]) => m >= ini && m <= fin);
  }

  function sincronizarDiaAlertas() {
    const hoy = new Date().toDateString();
    if (hoy !== diaConteoAlertas) {
      diaConteoAlertas = hoy;
      alertasRebeldeHoy = 0;
      alertaRebeldeActiva = false;
      textoAlertaRebelde = "";
    }
  }

  function mostrarCajaMensaje(texto) {
    if (!dom.mensajeJuego) {
      return;
    }
    if (!texto) {
      dom.mensajeJuego.textContent = "";
      dom.mensajeJuego.classList.add("hidden");
      return;
    }
    dom.mensajeJuego.textContent = texto;
    dom.mensajeJuego.classList.remove("hidden");
  }

  function mostrarMensajeTemporal(texto, ms) {
    if (temporizadorMensajeTemporal) {
      clearTimeout(temporizadorMensajeTemporal);
    }
    mostrarCajaMensaje(texto);
    temporizadorMensajeTemporal = setTimeout(() => {
      temporizadorMensajeTemporal = null;
      if (alertaRebeldeActiva) {
        mostrarCajaMensaje(textoAlertaRebelde);
      } else {
        mostrarCajaMensaje("");
      }
    }, ms);
  }

  function programarSiguienteAlertaRebelde() {
    if (temporizadorAlertaRebelde) {
      clearTimeout(temporizadorAlertaRebelde);
      temporizadorAlertaRebelde = null;
    }
    sincronizarDiaAlertas();
    if (alertasRebeldeHoy >= 2 || alertaRebeldeActiva) {
      return;
    }
    const espera = 120000 + Math.random() * 180000;
    temporizadorAlertaRebelde = setTimeout(() => {
      temporizadorAlertaRebelde = null;
      sincronizarDiaAlertas();
      if (alertasRebeldeHoy >= 2 || alertaRebeldeActiva) {
        programarSiguienteAlertaRebelde();
        return;
      }
      alertasRebeldeHoy += 1;
      alertaRebeldeActiva = true;
      textoAlertaRebelde =
        mensajesRebeldes[Math.floor(Math.random() * mensajesRebeldes.length)];
      mostrarCajaMensaje(textoAlertaRebelde);
      guardarPartida();
      programarSiguienteAlertaRebelde();
    }, espera);
  }

  function pintarBarra(contenedor, valor, rutaSvg) {
    if (!contenedor) {
      return;
    }
    contenedor.replaceChildren();
    const nivel = clamp(Math.round(valor), 0, 10);
    for (let i = 0; i < 10; i += 1) {
      const icono = document.createElement("img");
      icono.src = rutaSvg;
      icono.alt = "";
      icono.setAttribute("aria-hidden", "true");
      icono.style.width = "0.8rem";
      icono.style.height = "0.8rem";
      icono.style.objectFit = "contain";
      icono.style.flexShrink = "0";
      icono.style.display = "inline-block";
      icono.style.opacity = i < nivel ? "1" : "0.1";
      contenedor.appendChild(icono);
    }
  }

  function pintarTodasLasBarras() {
    pintarBarra(dom.iconosFelicidad, estado.felicidad, RUTAS_ICONO_ESTADO.felicidad);
    pintarBarra(dom.iconosSalud, estado.salud, RUTAS_ICONO_ESTADO.salud);
    pintarBarra(dom.iconosLimpieza, estado.limpieza, RUTAS_ICONO_ESTADO.limpieza);
    pintarBarra(dom.iconosEnergia, estado.energia, RUTAS_ICONO_ESTADO.energia);
  }

  function intentarPlay() {
    const promesa = dom.videoTayo.play();
    if (promesa !== undefined) {
      promesa.catch(() => {});
    }
  }

  function quitarMuteTrasPrimerGesto() {
    if (dom.videoTayo.muted) {
      dom.videoTayo.muted = false;
    }
  }

  function reproducirRuta(ruta) {
    dom.videoTayo.loop = ruta === videoPantallaPrincipal;
    if (sourcePrincipal.getAttribute("src") !== ruta) {
      sourcePrincipal.setAttribute("src", ruta);
      dom.videoTayo.load();
    }
    intentarPlay();
  }

  function aplicarEfectoAccionCorrecta(tipo) {
    if (tipo === "alimentar") {
      estado.felicidad = clamp(estado.felicidad + 1, 0, 10);
      estado.energia = clamp(estado.energia + 1, 0, 10);
    } else if (tipo === "jugar" || tipo === "acariciar") {
      estado.felicidad = clamp(estado.felicidad + 1, 0, 10);
    } else if (tipo === "duchar") {
      estado.limpieza = clamp(estado.limpieza + 1, 0, 10);
    } else if (tipo === "dormir") {
      estado.energia = clamp(estado.energia + 2, 0, 10);
    }
  }

  function manejarReprender() {
    if (alertaRebeldeActiva) {
      estado.salud = clamp(estado.salud + 1, 0, 10);
      alertaRebeldeActiva = false;
      textoAlertaRebelde = "";
      mostrarCajaMensaje("");
    } else {
      estado.felicidad = clamp(estado.felicidad - 1, 0, 10);
      mostrarMensajeTemporal(
        "Reprender sin motivo: Tayo Tayo se entristece (−1 felicidad).",
        4500
      );
    }
    pintarTodasLasBarras();
    guardarPartida();
  }

  function manejarAccionNormal(boton) {
    const tipo = idBotonATipo[boton.id];
    const ruta = boton.getAttribute("data-video-src");
    if (!tipo || !ruta) {
      return;
    }
    const horarioOk = dentroDeHorario(tipo);
    if (horarioOk) {
      aplicarEfectoAccionCorrecta(tipo);
      mostrarMensajeTemporal("¡Buen horario! Acción adecuada.", 2500);
    } else {
      estado.felicidad = clamp(estado.felicidad - 1, 0, 10);
      mostrarMensajeTemporal(
        "Fuera del horario: es un capricho (−1 felicidad).",
        4000
      );
    }
    pintarTodasLasBarras();
    guardarPartida();
    reproducirRuta(ruta);
  }

  function tickPasivo() {
    aplicarUnTickPasivo();
    pintarTodasLasBarras();
    guardarPartida();
  }

  dom.videoTayo.addEventListener("ended", () => {
    const srcActual = sourcePrincipal.getAttribute("src");
    if (srcActual === videoPantallaPrincipal) {
      return;
    }
    reproducirRuta(videoPantallaPrincipal);
  });

  const botonesAccion = [
    dom.btnAlimentar,
    dom.btnJugar,
    dom.btnDuchar,
    dom.btnAcariciar,
    dom.btnDormir,
    dom.btnReprender,
  ];

  botonesAccion.forEach((boton) => {
    if (!boton || !boton.getAttribute("data-video-src")) {
      return;
    }
    boton.addEventListener("click", () => {
      quitarMuteTrasPrimerGesto();
      guardarPartida();
      if (boton.id === IDS.btnReprender) {
        const ruta = boton.getAttribute("data-video-src");
        manejarReprender();
        if (ruta) {
          reproducirRuta(ruta);
        }
        return;
      }
      manejarAccionNormal(boton);
    });
  });

  restaurarDesdeAlmacenamiento();

  sourcePrincipal.setAttribute("src", videoPantallaPrincipal);
  dom.videoTayo.loop = true;
  dom.videoTayo.load();
  intentarPlay();
  pintarTodasLasBarras();
  sincronizarDiaAlertas();
  programarSiguienteAlertaRebelde();
  guardarPartida();

  window.addEventListener("pagehide", guardarPartida);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      guardarPartida();
    }
  });

  window.setInterval(tickPasivo, 60000);
})();
