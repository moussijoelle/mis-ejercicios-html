const nombres = {
  1: "piedra",
  2: "papel",
  3: "tijera",
};

function esValido(valor) {
  const n = Number(valor);
  return Number.isInteger(n) && (n === 1 || n === 2 || n === 3);
}

function ganaUsuario(usuario, maquina) {
  return (
    (usuario === 1 && maquina === 3) ||
    (usuario === 2 && maquina === 1) ||
    (usuario === 3 && maquina === 2)
  );
}

function textoResultado(maquina, usuario) {
  const yo = nombres[maquina];
  const tu = nombres[usuario];
  if (maquina === usuario) {
    return { esHtml: false, texto: `«Yo ${yo} y tú ${tu}. ¡Empate!»` };
  }
  if (ganaUsuario(usuario, maquina)) {
    return {
      esHtml: true,
      texto: `«Yo ${yo} y tú ${tu}. <strong style="color:#b91c1c;">¡Has ganado!</strong>»`,
    };
  }
  return { esHtml: false, texto: `«Yo ${yo} y tú ${tu}. ¡He ganado!»` };
}

const inputEleccion = document.getElementById("eleccion");
const salida = document.getElementById("mensaje");
const btnJugar = document.getElementById("btn-jugar");

btnJugar.addEventListener("click", () => {
  const valor = inputEleccion.value;

  if (!esValido(valor)) {
    salida.textContent = "«Entiendo que no quieres jugar. Adiós»";
    return;
  }

  const usuario = Number(valor);
  const maquina = Math.floor(Math.random() * 3) + 1;
  const resultado = textoResultado(maquina, usuario);
  if (resultado.esHtml) {
    salida.innerHTML = resultado.texto;
  } else {
    salida.textContent = resultado.texto;
  }
});
