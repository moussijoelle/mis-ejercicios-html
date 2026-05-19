const inputprimero = document.getElementById("primero-numero-entero");
const inputsegundo = document.getElementById("segundo-numero-entero");
const btnMayor = document.getElementById("btnMayor");
const resultado = document.getElementById("resultado");
function calcularMayor() {
    const a = parseInt(inputprimero.value, 10);
   const b = parseInt(inputsegundo.value, 10);

   if (Number.isNaN(a) || Number.isNaN(b)) {
    resultado.textContent = "Escribe dos numeros enteros validos";
    return;
}

    resultado.textContent = "El mayor es " + Math.max(a, b) + ".";
  
}
btnMayor.addEventListener("click", calcularMayor);
