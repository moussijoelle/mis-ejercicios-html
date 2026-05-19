const vistaTest = document.getElementById('vista-test');
const vistaResultados = document.getElementById('vista-resultados');
const btnAccion = document.getElementById('btn-accion');

const vacaValue = document.getElementById('vaca-value');
const tigreValue = document.getElementById('tigre-value');
const ovejaValue = document.getElementById('oveja-value');
const caballoValue = document.getElementById('caballo-value');
const monoValue = document.getElementById('mono-value');

const perroValue = document.getElementById('perro-value');
const gatoValue = document.getElementById('gato-value');
const rataValue = document.getElementById('rata-value');
const cafeValue = document.getElementById('cafe-value');
const marValue = document.getElementById('mar-value');

const amarilloValue = document.getElementById('amarillo-value');
const naranjaValue = document.getElementById('naranja-value');
const blancoValue = document.getElementById('blanco-value');
const rojoValue = document.getElementById('rojo-value');
const verdeValue = document.getElementById('verde-value');

const prioridades = [
   { input: vacaValue, titulo: 'Tu Carrera' },
   { input: tigreValue, titulo: 'El Orgullo' },
   { input: ovejaValue, titulo: 'El Amor' },
   { input: caballoValue, titulo: 'La familia' },
   { input: monoValue, titulo: 'El Dinero' },
];

const vida = [
   { input: perroValue, titulo: 'Yo Soy...' },
   { input: gatoValue, titulo: 'Mi Pareja,' },
   { input: rataValue, titulo: 'Lo que más odio:' },
   { input: cafeValue, titulo: 'Para mi el sexo es' },
   { input: marValue, titulo: 'Y la vida...' },
];

const gente = [
   { input: amarilloValue, titulo: 'Nunca te olvidará' },
   { input: naranjaValue, titulo: 'Puede ser tu gran amigo/a' },
   { input: blancoValue, titulo: 'Tu Alma Gemela:' },
   { input: rojoValue, titulo: 'Realmente amas a...' },
   { input: verdeValue, titulo: 'Siempre estará en tu memoria' },
];

function valor(input) {
   return input ? String(input.value).trim() : '';
}

function filaResultado(titulo, contenido) {
   const texto = contenido === '' ? '—' : contenido;
   return `<p class="flex flex-row items-baseline gap-4"><span class="inline-block shrink-0 pl-4 font-medium text-gray-800">${titulo}</span><span class="min-w-0 flex-1 text-pink-800 font-serif">${texto}</span></p>`;
}

function seccionResultado(tituloBloque, filasHtml) {
   return `<p class="font-semibold text-gray-800">${tituloBloque}</p><blockquote class="w-2/3 ml-8">${filasHtml}</blockquote>`;
}

function calcular() {
   if (!vistaTest.classList.contains('hidden')) {
      const htmlPrioridades = prioridades.map((r) => filaResultado(r.titulo, valor(r.input))).join('');
      const htmlVida = vida.map((r) => filaResultado(r.titulo, valor(r.input))).join('');
      const htmlGente = gente.map((r) => filaResultado(r.titulo, valor(r.input))).join('');

      vistaResultados.innerHTML =
         `<div class="space-y-4">` +
         seccionResultado('Tu orden de prioridades:', htmlPrioridades) +
         seccionResultado('Como ves la vida:', htmlVida) +
         seccionResultado('Tu gente:', htmlGente) +
         `</div>`;

      vistaTest.classList.add('hidden');
      vistaResultados.classList.remove('hidden');
      btnAccion.textContent = 'volver';
      return;
   }

   vistaTest.classList.remove('hidden');
   vistaResultados.classList.add('hidden');
   vistaResultados.innerHTML = '';
   btnAccion.textContent = 'resultados';
}
