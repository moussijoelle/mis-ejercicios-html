function factorial(n) {
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

const inputNumero = document.getElementById("numero");
const btnCalcular = document.getElementById("btnCalcular");
const aviso = document.getElementById("aviso");
const resultado = document.getElementById("resultado");

function limpiarAviso() {
  aviso.className = "hidden";
  aviso.textContent = "";
}

function mostrarAvisoNegativo(original, corregido) {
  aviso.className = "alert alert-warning shadow-lg";
  aviso.textContent = `Número negativo (${original}). Se usa Math.abs → ${corregido}`;
}

btnCalcular.addEventListener("click", () => {
  limpiarAviso();

  let n = Number.parseInt(inputNumero.value, 10);

  if (inputNumero.value === "" || Number.isNaN(n)) {
    resultado.innerHTML =
      '<p class="text-center font-semibold text-error">Introduce un número entero válido.</p>';
    return;
  }

  if (n < 0) {
    const original = n;
    n = Math.abs(n);
    mostrarAvisoNegativo(original, n);
  }

  const valorFactorial = factorial(n);
  resultado.innerHTML = `<p class="text-center text-2xl font-bold">El factorial de <span class="text-secondary">${n}</span> es <span class="text-primary">${valorFactorial}</span></p>`;
});
