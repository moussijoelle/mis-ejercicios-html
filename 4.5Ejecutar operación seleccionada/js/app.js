const numero1Input = document.getElementById("numero1");
const numero2Input = document.getElementById("numero2");
const operadorSelect = document.getElementById("operador");
const calcularButton = document.getElementById("calcular");
const resultadoElemento = document.getElementById("resultado");

if (
  !numero1Input ||
  !numero2Input ||
  !operadorSelect ||
  !calcularButton ||
  !resultadoElemento
) {
  alert("Falta un elemento en el HTML. Revisa los id o el script.");
} else {
  calcularButton.addEventListener("click", () => {
    const numero1 = Number(numero1Input.value);
    const numero2 = Number(numero2Input.value);
    const operador = operadorSelect.value;

    if (numero1Input.value.trim() === "" || numero2Input.value.trim() === "") {
      alert("Escribe los dos números.");
      return;
    }

    if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {
      alert("Escribe números válidos.");
      return;
    }

    let resultado;

    switch (operador) {
      case "+":
        resultado = numero1 + numero2;
        break;
      case "-":
        resultado = numero1 - numero2;
        break;
      case "*":
        resultado = numero1 * numero2;
        break;
      case "/":
        if (numero2 === 0) {
          alert("No se puede dividir entre 0.");
          return;
        }
        resultado = numero1 / numero2;
        break;
      default:
        alert("Operador no válido.");
        return;
    }

    resultadoElemento.textContent = `Resultado: ${resultado}`;
  });
}