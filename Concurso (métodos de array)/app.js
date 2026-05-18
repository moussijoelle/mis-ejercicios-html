const participantesIniciales = ["Ana", "Oswaldo", "Raúl", "Celia", "María", "Antonio"];

const clasificacionInicialEl = document.getElementById("clasificacionInicial");
const salidaEl = document.getElementById("salida");
const btnConcursar = document.getElementById("btnConcursar");

function textoLista(nombres) {
  return nombres.join(", ");
}

function aplicarHechosDelConcurso(ranking) {
  const clasificaciones = [...ranking];

  const indiceCelia = clasificaciones.indexOf("Celia");
  clasificaciones.splice(indiceCelia, 1);
  const indiceRaulTrasQuitarCelia = clasificaciones.indexOf("Raúl");
  clasificaciones.splice(indiceRaulTrasQuitarCelia, 0, "Celia");

  const indiceAntonio = clasificaciones.indexOf("Antonio");
  if (indiceAntonio !== -1) {
    clasificaciones.splice(indiceAntonio, 1);
  }

  clasificaciones.splice(1, 0, "Roberto", "Amaya");
  clasificaciones.unshift("Marta");

  return clasificaciones;
}

clasificacionInicialEl.textContent = textoLista(participantesIniciales);

btnConcursar.addEventListener("click", () => {
  const clasificaciones = aplicarHechosDelConcurso(participantesIniciales);
  salidaEl.innerHTML = `
    <h2 class="mb-2 text-xl font-bold text-amber-900/90 sm:text-2xl">clasificación actualizada</h2>
    <p class="font-medium text-blue-700">${textoLista(clasificaciones)}</p>
  `;
});
