const numerosEnLetras = [
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
  ];
  
const formulario = document.getElementById("formulario-numero");
const inputNumero = document.getElementById("numero");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    resultado.textContent = ""; 
  
  const numero = Number(inputNumero.value);

  if (!Number.isInteger(numero) || numero < 0 || numero > 10) {
    resultado.textContent = "Introduce un número entero entre 0 y 10.";
    return;
  }

  resultado.textContent = `En letras: ${numerosEnLetras[numero]}`;
});