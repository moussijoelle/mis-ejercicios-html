//paso 1.Mapear los objectos (elementos) del Html
//controles de formulario (value)
const Alto =document.getElementById("alto");
const Ancho =document.getElementById("ancho");
const Manos =document.getElementById("manos");
//parrafo (innerHTML)
const salida =document.getElementById("salida");

const COBERTURA = 12;

function calcular() {
  let alto_num = parseFloat(Alto.value);
  let ancho_num = parseFloat(Ancho.value);
  let manos_num = parseInt(Manos.value, 10);

  if (isNaN(alto_num) || isNaN(ancho_num) || isNaN(manos_num)) {
    salida.innerHTML = "Rellena los tres campos con números.";
    return;
  }

  if (alto_num <= 0 || ancho_num <= 0 || manos_num < 1) {
    salida.innerHTML = "Alto y ancho > 0, manos al menos 1.";
    return;
  }

  let metros_cuadrados = alto_num * ancho_num;
  let litros = (metros_cuadrados * manos_num) / COBERTURA;

  salida.innerHTML = `Litros de pintura (aprox.): ${litros.toFixed(2)}`;
}
