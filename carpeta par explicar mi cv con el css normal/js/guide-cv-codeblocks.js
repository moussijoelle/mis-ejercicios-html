// Remplace les <textarea class="codearea"> par du code coloré (highlight.js)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('textarea.codearea').forEach((ta) => {
    const isHtml = ta.classList.contains('code-html');
    const isCss = ta.classList.contains('code-css');
    const lang = isHtml ? 'language-html' : isCss ? 'language-css' : '';

    const pre = document.createElement('pre');
    pre.className = 'codearea';

    const code = document.createElement('code');
    if (lang) code.className = lang;
    code.textContent = ta.value;

    pre.appendChild(code);
    ta.replaceWith(pre);
  });

  if (window.hljs && typeof window.hljs.highlightAll === 'function') {
    window.hljs.highlightAll();
  }
});
