import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const specs = [
  ["1", "index.html", "Accueil / inicio", "#etape-2"],
  ["2", "educación.html", "Educación formal", "#etape-3"],
  ["3", "experiencia.html", "Experiencia profesional", "#etape-4"],
  ["4", "certificados.html", "Certificados", "#etape-5"],
  ["5", "Idiomas.html", "Idiomas y mapa", "#etape-6"],
  ["6", "tecnologia.html", "Tecnologías", "#etape-7"],
  ["7", "softskills.html", "Softskills + vídeo", "#etape-8"],
  ["8", "aficiones.html", "Aficiones", "#etape-9"],
];

let out = "";
out += `    <section id="sources-html-complets-1-a-8" class="mb-12 rounded-lg border-2 border-neutral-400 bg-neutral-50 p-4 text-sm" lang="es">
        <h2 class="text-xl font-bold text-[#58008b]">HTML completo de cada parte (1 a 8)</h2>
        <p class="mt-2 text-neutral-700">Código fuente actual de las <strong>ocho páginas del CV</strong> con Tailwind (CDN). Abre cada bloque para ver o copiar. Los archivos en tu carpeta son la referencia si los editas después.</p>
        <p class="mt-2 text-xs text-neutral-600">Repaso en francés : <a href="#etape-2" class="text-[#58008b] underline">Étapes 2–9</a> · <a href="#tous-fichiers-html-tailwind" class="text-[#58008b] underline">Section D</a></p>
`;

for (const [num, fn, title, href] of specs) {
  const text = fs.readFileSync(path.join(root, fn), "utf8");
  if (text.toLowerCase().includes("</textarea")) {
    throw new Error(`Cannot embed ${fn}`);
  }
  out += `        <details class="mt-4 rounded-lg border border-neutral-300 bg-white p-3">
            <summary class="cursor-pointer text-base font-semibold text-neutral-900">Parte ${num} — <code class="rounded bg-neutral-100 px-1 font-mono text-sm">${fn}</code> <span class="text-sm font-normal text-neutral-600">(${title})</span> · <a href="${href}" class="text-[#58008b] underline" onclick="event.stopPropagation()">repaso FR</a></summary>
            <p class="mt-2 text-xs text-neutral-600">Copia : clic en el cuadro, <kbd>Ctrl</kbd>+<kbd>A</kbd>, luego <kbd>Ctrl</kbd>+<kbd>C</kbd>.</p>
            <textarea readonly rows="18" class="mt-2 max-h-[70vh] w-full resize-y border border-neutral-300 bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-slate-100" aria-label="Código fuente completo de ${fn}">${text}</textarea>
        </details>
`;
}

out += "    </section>\n";

const repasoPath = path.join(root, "repaso-examen-fr.html");
const repaso = fs.readFileSync(repasoPath, "utf8");
const startMark = '<section id="sources-html-complets-1-a-8"';
const endMark = '\n    <!-- Synthèse -->\n';
const i0 = repaso.indexOf(startMark);
const i1 = repaso.indexOf(endMark);
if (i0 === -1 || i1 === -1 || i1 <= i0) {
  throw new Error("repaso-examen-fr.html: could not find sources section or <!-- Synthèse --> anchor");
}
const before = repaso.slice(0, i0);
const after = repaso.slice(i1);
const merged = before + out + after;
fs.writeFileSync(repasoPath, merged, "utf8");
console.log("Updated repaso-examen-fr.html (sources-html-complets 1–8), bytes", merged.length);
