const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const internet = document.getElementById("internet");
const luz = document.getElementById("luz");
const agua = document.getElementById("agua");
const gas = document.getElementById("gas");
const alquiler = document.getElementById("alquiler");
const totalGastos = document.getElementById("totalGastos");

console.log(internet.value);

function calcular() {
  const total =
    Number(internet.value) +
    Number(luz.value) +
    Number(agua.value) +
    Number(gas.value) +
    Number(alquiler.value);

  totalGastos.textContent = `Total: ${total} €`;
}
