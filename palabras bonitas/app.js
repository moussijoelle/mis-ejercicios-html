const inputPalabra = document.getElementById("palabra");
const btnEvaluar = document.getElementById("btnEvaluar");
const resultado = document.getElementById("resultado");

function alPulsarComprobar() {
  const textoDelCampo = inputPalabra.value;
  const palabraPreparada = textoDelCampo.trim();

  if (palabraPreparada.length === 0) {
    resultado.textContent =
      "No has escrito ninguna palabra. Escribe algo en el campo y vuelve a comprobar.";
    return;
  }

  const longitud = palabraPreparada.length;
  const primera = palabraPreparada[0].toUpperCase();
  const cumpleH9 = longitud === 9 && primera === "H";
  const cumpleP5 = longitud === 5 && primera === "P";

  if (cumpleH9 || cumpleP5) {
    const partes = [];
    if (cumpleH9) {
      partes.push("tiene 9 letras y empieza por H");
    }
    if (cumpleP5) {
      partes.push("tiene 5 letras y empieza por P");
    }
    const criterio = partes.join(" y, al mismo tiempo, ");
    resultado.textContent = `La palabra "${palabraPreparada}" es bonita según el criterio del ejercicio, porque ${criterio}.`;
  } else {
    resultado.textContent =
      `La palabra "${palabraPreparada}" no es bonita según el criterio del ejercicio: ` +
      `tiene ${longitud} letra${longitud === 1 ? "" : "s"} y su primera letra es "${primera}", ` +
      `y no cumple ninguna de las dos condiciones (9 letras y empezar por H, o 5 letras y empezar por P).`;
  }
}

btnEvaluar.addEventListener("click", alPulsarComprobar);
