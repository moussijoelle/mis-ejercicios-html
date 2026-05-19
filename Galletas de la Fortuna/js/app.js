const imagenGalleta = document.getElementById("galleta");
const textoMensaje = document.getElementById("mensaje");
const botonMensaje = document.getElementById("boton-mensaje");

const mensajes = [
  "Hoy es un buen día para empezar algo.",
  "La paciencia es tu mejor aliada.",
  "Una pequeña acción vale más que mil intenciones.",
  "Confía en el proceso: vas bien.",
  "Tu esfuerzo tendrá recompensa.",
  "Haz una pausa: claridad antes que prisa.",
];

const NUM_MENSAJES = mensajes.length;

function numeroAleatorio(maximoExclusivo) {
  return Math.floor(Math.random() * maximoExclusivo);
}

function mostrarMensaje() {
  const indice = numeroAleatorio(NUM_MENSAJES);
  const mensaje = mensajes[indice];

  textoMensaje.textContent = mensaje;
  imagenGalleta.src = "img/galletas2.png";
  botonMensaje.disabled = true;

  console.log(mensaje);
}

function recargar() {
  location.reload();
}
