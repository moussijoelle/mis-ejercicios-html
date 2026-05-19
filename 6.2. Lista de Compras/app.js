let carrito = [];

const inputProducto = document.getElementById("producto-input");
const inputPrecio = document.getElementById("precio-input");
const inputPosicion = document.getElementById("posicion-input");
const listaCompras = document.getElementById("lista-compras");
const numeroProductos = document.getElementById("num-prod");
const mensaje = document.getElementById("mensaje");

function formatearPrecio(valor) {
  return `€${Number(valor).toFixed(2)}`;
}

function render() {
  listaCompras.innerHTML = "";

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const linea = `${i}. ${item.producto.toUpperCase()}, ${formatearPrecio(item.precio)}`;
    listaCompras.insertAdjacentHTML("beforeend", `<li>${linea}</li>`);
  }

  numeroProductos.innerText = carrito.length;
}

function agregar() {
  const nombre = inputProducto.value.trim();
  const textoPrecio = inputPrecio.value.trim();
  const precio = Number.parseFloat(textoPrecio);

  if (!nombre) {
    mensaje.innerText = "Escribe un producto primero.";
    return;
  }

  if (textoPrecio === "" || !Number.isFinite(precio) || precio < 0) {
    mensaje.innerText = "Indica un precio válido (€).";
    return;
  }

  carrito.push({ producto: nombre, precio });
  inputProducto.value = "";
  inputPrecio.value = "";
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

function totalCompras() {
  if (carrito.length === 0) {
    mensaje.innerText = "El carrito está vacío.";
    return;
  }

  let total = 0;
  for (const item of carrito) {
    total += item.precio;
  }

  mensaje.innerText = `Total compras: ${formatearPrecio(total)}`;
  mensaje.style.color="red";
}

render();
