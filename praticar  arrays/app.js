const citas = [
  { texto: "Lo único imposible es aquello que no intentas.", autor: "Anónimo" },
  { texto: "El que no arriesga, no gana.", autor: "Refrán" },
  { texto: "Poco a poco se va lejos.", autor: "Proverbio" },
];

let posicionAMostrar = 0;

const elementoCita = document.getElementById("citaActual");

function mostrarEnPosicion() {
  const item = citas[posicionAMostrar];
  elementoCita.innerHTML = `${item.texto}<br><em>${item.autor}</em>`;
}

function aumentar() {
  if (posicionAMostrar < citas.length - 1) {
    posicionAMostrar++;
    mostrarEnPosicion();
  }
}

function disminuir() {
  if (posicionAMostrar > 0) {
    posicionAMostrar--;
    mostrarEnPosicion();
  }
}

mostrarEnPosicion();
