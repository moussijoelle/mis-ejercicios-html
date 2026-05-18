const meses = [
  { numeroMes: 1, mesLetra: "enero", numeroDias: 31 },
  { numeroMes: 2, mesLetra: "febrero", numeroDias: 28 },
  { numeroMes: 3, mesLetra: "marzo", numeroDias: 31 },
  { numeroMes: 4, mesLetra: "abril", numeroDias: 30 },
  { numeroMes: 5, mesLetra: "mayo", numeroDias: 31 },
  { numeroMes: 6, mesLetra: "junio", numeroDias: 30 },
  { numeroMes: 7, mesLetra: "julio", numeroDias: 31 },
  { numeroMes: 8, mesLetra: "agosto", numeroDias: 31 },
  { numeroMes: 9, mesLetra: "septiembre", numeroDias: 30 },
  { numeroMes: 10, mesLetra: "octubre", numeroDias: 31 },
  { numeroMes: 11, mesLetra: "noviembre", numeroDias: 30 },
  { numeroMes: 12, mesLetra: "diciembre", numeroDias: 31 },
];


const inputNumeroMes = document.getElementById("numeroMes");
const botonMostrar = document.getElementById("btnMostrar");
const parrafoMensaje = document.getElementById("mensaje");

function mostrarNombreDelMes() {
  const texto = inputNumeroMes.value.trim();
  const mesNumero = Number(texto);

  if (texto === "" || !Number.isInteger(mesNumero)) {
    parrafoMensaje.textContent = "Escribe un número entero entre 1 y 12.";
    return;
  }

  if (mesNumero < 1 || mesNumero > 12) {
    parrafoMensaje.textContent = "El mes debe estar entre 1 y 12.";
    return;
  }

  const indice = meses.findIndex((mes) => mes.numeroMes === mesNumero);

  if (indice === -1) {
    parrafoMensaje.textContent = "No se encontró el mes indicado.";
    return;
  }

  const mesElegido = meses[indice];
  parrafoMensaje.textContent = `El mes ${mesNumero} se corresponde con ${mesElegido.mesLetra} y tiene ${mesElegido.numeroDias} días.`;

}

botonMostrar.addEventListener("click", mostrarNombreDelMes);
inputNumeroMes.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    mostrarNombreDelMes();
  }
});
