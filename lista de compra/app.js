let carrito = [];

const inputProducto = document.getElementById("producto-input");
const inputPosicion = document.getElementById("posicion-input");
const listaCompras = document.getElementById("lista-compras");
const numeroProductos = document.getElementById("num-prod");
const mensaje = document.getElementById("mensaje");

function render() {
  listaCompras.innerHTML = "";

  for (const producto of carrito) {
    listaCompras.insertAdjacentHTML("beforeend", `<li>${producto}</li>`);
  }

  numeroProductos.innerText = carrito.length;
}

function agregar() {
  const producto = inputProducto.value.trim();
  if (!producto) {
    mensaje.innerText = "Escribe un producto primero.";
    return;
  }

  carrito.push(producto);
  inputProducto.value = "";
  mensaje.innerText = "";
  render();
}

function eliminarPorPosicion() {
  const posicion = Number.parseInt(inputPosicion.value, 10);
  if (!Number.isInteger(posicion) || posicion < 0 || posicion >= carrito.length) {
    mensaje.innerText = "Posición inválida.";
    return;
  }

  carrito = [...carrito.slice(0, posicion), ...carrito.slice(posicion + 1)];
  mensaje.innerText = "";
  inputPosicion.value = "";
  render();
}

function vaciarCarrito() {
  carrito = [];
  mensaje.innerText = "";
  render();
}

render();