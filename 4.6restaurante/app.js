const boton = document.getElementById("validar");
const select = document.getElementById("operador");
const mensaje = document.getElementById("mensaje");
const plato = document.getElementById("operador").value;

const vegano = document.getElementById("vegano").checked;
const lactosa = document.getElementById("no-lactosa").checked;
const gluten = document.getElementById("celiaco").checked;

console.log(plato, vegano, lactosa, gluten);

boton.addEventListener("click", () => {
    const plato = select.value;
  
    const vegano = document.getElementById("vegano").checked;
    const lactosa = document.getElementById("no-lactosa").checked;
    const gluten = document.getElementById("celiaco").checked;
  
    let noPuede = false;
  
    if (plato === "carne" && vegano) noPuede = true;
    if (plato === "pasta" && gluten) noPuede = true;
    if (plato === "risotto" && lactosa) noPuede = true;
  
    if (noPuede) {
      mensaje.textContent = "Usted no puede comer este plato.";
    } else {
      mensaje.textContent = "Perfecto, pedido correcto";
    }
  });