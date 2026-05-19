const inputDividendo = document.getElementById("dividendo");
const inputDivisor = document.getElementById("divisor");
const botonProbarAhora = document.getElementById("btnProbarAhora");
const resultado = document.getElementById("resultado");

botonProbarAhora.addEventListener("click", () => {
    const dividendo = Number(inputDividendo.value);
    const divisor = Number(inputDivisor.value);
  
    if (!Number.isInteger(dividendo) || !Number.isInteger(divisor)) {
        resultado.textContent = "Error: escribe dos números enteros.";
        return;
      }



    if (divisor < 2 || divisor > 7) {
        resultado.textContent = "Error: el divisor debe estar entre 2 y 7.";
        return;
      }

      if (dividendo % divisor === 0) {
        resultado.textContent = `${dividendo} es múltiplo de ${divisor}.`;
      } else {
        resultado.textContent = `${dividendo} no es múltiplo de ${divisor}.`;
      }


  });