const tareasPendientes = [];

const entradaNuevaTarea = document.getElementById("texto-nueva-tarea");
const listaTareasDom = document.getElementById("lista-tareas");
const zonaMensaje = document.getElementById("mensaje");

const botonAnadir = document.getElementById("btn-anadir");
const botonMostrar = document.getElementById("btn-mostrar");
const botonEliminar = document.getElementById("btn-eliminar");
const botonSalir = document.getElementById("btn-salir");

const modalEliminar = document.getElementById("modal-eliminar");
const inputModalEliminarNumero = document.getElementById("modal-eliminar-numero");
const botonModalEliminarCancelar = document.getElementById("modal-eliminar-cancelar");
const botonModalEliminarAceptar = document.getElementById("modal-eliminar-aceptar");

const panelListaTareas = document.getElementById("panel-lista-tareas");

const botonesMenu = [botonAnadir, botonMostrar, botonEliminar, botonSalir];

function setMensaje(texto) {
  zonaMensaje.textContent = texto || "\u00a0";
  if (texto !== "Gracias") {
    zonaMensaje.style.color = "";
  }
}

function actualizarListado() {
  listaTareasDom.innerHTML = "";
  tareasPendientes.forEach(function (tituloTarea) {
    const item = document.createElement("li");
    item.textContent = tituloTarea;
    listaTareasDom.appendChild(item);
  });
}

function anadirTarea() {
  const textoNormalizado = entradaNuevaTarea.value.trim();
  if (!textoNormalizado) {
    setMensaje("Escribe una tarea antes de añadir.");
    return;
  }

  tareasPendientes.push(textoNormalizado);
  entradaNuevaTarea.value = "";
  setMensaje("");
  actualizarListado();
  if (panelListaTareas) panelListaTareas.open = true;
}

function mostrarTodasLasTareas() {
  actualizarListado();
  if (panelListaTareas) panelListaTareas.open = true;
  if (tareasPendientes.length === 0) {
    setMensaje("No hay tareas.");
    return;
  }
  setMensaje("");
}

function abrirModalEliminar() {
  if (!modalEliminar || !inputModalEliminarNumero) return;
  inputModalEliminarNumero.value = "";
  modalEliminar.classList.add("is-open");
  inputModalEliminarNumero.focus();
}

function cerrarModalEliminar() {
  if (!modalEliminar || !inputModalEliminarNumero) return;
  modalEliminar.classList.remove("is-open");
  inputModalEliminarNumero.value = "";
}

function confirmarEliminarDesdeModal() {
  const texto = inputModalEliminarNumero.value.trim();
  const numeroLista = Number.parseInt(texto, 10);
  const indiceEnArray = numeroLista - 1;

  if (!Number.isFinite(numeroLista) || numeroLista < 1 || indiceEnArray >= tareasPendientes.length) {
    setMensaje("Número no válido.");
    return;
  }

  tareasPendientes.splice(indiceEnArray, 1);
  setMensaje("");
  actualizarListado();
  if (panelListaTareas) panelListaTareas.open = true;
  cerrarModalEliminar();
}

function eliminarTarea() {
  if (tareasPendientes.length === 0) {
    setMensaje("No hay nada que eliminar.");
    return;
  }
  abrirModalEliminar();
}

function deshabilitarMenu() {
  cerrarModalEliminar();
  botonesMenu.forEach(function (boton) {
    if (boton) boton.disabled = true;
  });
  if (entradaNuevaTarea) entradaNuevaTarea.disabled = true;
  if (inputModalEliminarNumero) inputModalEliminarNumero.disabled = true;
  if (botonModalEliminarCancelar) botonModalEliminarCancelar.disabled = true;
  if (botonModalEliminarAceptar) botonModalEliminarAceptar.disabled = true;
  if (panelListaTareas) {
    panelListaTareas.open = false;
    panelListaTareas.inert = true;
  }
}

function salirDeLaAplicacion() {
  setMensaje("Gracias");
  zonaMensaje.style.color = "white";
  zonaMensaje.style.fontSize = "2rem";
  zonaMensaje.style.fontWeight = "700";
  deshabilitarMenu();
}

botonAnadir.addEventListener("click", anadirTarea);
botonMostrar.addEventListener("click", mostrarTodasLasTareas);
botonEliminar.addEventListener("click", eliminarTarea);
botonSalir.addEventListener("click", salirDeLaAplicacion);

if (panelListaTareas) {
  panelListaTareas.addEventListener("toggle", function () {
    if (!panelListaTareas.open) return;
    mostrarTodasLasTareas();
  });
}

entradaNuevaTarea.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    anadirTarea();
  }
});

if (botonModalEliminarCancelar) {
  botonModalEliminarCancelar.addEventListener("click", cerrarModalEliminar);
}

if (botonModalEliminarAceptar) {
  botonModalEliminarAceptar.addEventListener("click", confirmarEliminarDesdeModal);
}

if (inputModalEliminarNumero) {
  inputModalEliminarNumero.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      evento.preventDefault();
      confirmarEliminarDesdeModal();
    }
    if (evento.key === "Escape") {
      evento.preventDefault();
      cerrarModalEliminar();
    }
  });
}

document.addEventListener("keydown", function (evento) {
  if (evento.key !== "Escape") return;
  if (!modalEliminar || !modalEliminar.classList.contains("is-open")) return;
  const activo = document.activeElement;
  if (activo === inputModalEliminarNumero) return;
  cerrarModalEliminar();
});
