const mesesDelAno = [
  null,
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const inputNumeroMes = document.getElementById("numeroMes");
const botonMostrar = document.getElementById("btnMostrar");
const parrafoMensaje = document.getElementById("mensaje");

function mostrarNombreDelMes() {
  const texto = inputNumeroMes.value.trim();
  const numeroMes = Number(texto);

  if (texto === "" || !Number.isInteger(numeroMes)) {
    parrafoMensaje.textContent = "Escribe un número entero entre 1 y 12.";
    return;
  }

  if (numeroMes < 1 || numeroMes > 12) {
    parrafoMensaje.textContent = "El mes debe estar entre 1 y 12.";
    return;
  }

  const nombreMes = mesesDelAno[numeroMes];
  parrafoMensaje.textContent = `El mes ${numeroMes} se corresponde con ${nombreMes}.`;
}

botonMostrar.addEventListener("click", mostrarNombreDelMes);
inputNumeroMes.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    mostrarNombreDelMes();
  }
});
