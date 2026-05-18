const formulario = document.getElementById("formulario-nivel");
const campoNombre = document.getElementById("nombre");
const campoAños = document.getElementById("años");
const parrafoResultado = document.getElementById("resultado");

function nivelSegunAños(años) {
  if (años < 2) {
    return "Nivel principiante";
  }
  if (años <= 4) {
    return "Nivel intermedio";
  }
  if (años <= 7) {
    return "Nivel avanzado";
  }
  if (años <= 10) {
    return "Nivel experto";
  }
  return "Nivel Gurú";
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const años = Number(String(campoAños.value).replace(",", "."));

  if (!nombre) {
    parrafoResultado.textContent = "Escribe tu nombre.";
    return;
  }

  if (campoAños.value === "" || Number.isNaN(años) || años < 0) {
    parrafoResultado.textContent = "Escribe un número válido de años (0 o más).";
    return;
  }

  const nivel = nivelSegunAños(años);
  parrafoResultado.textContent = `${nombre}, tu nivel de experiencia es: ${nivel}.`;
});
