"use strict";

const inputNumero = document.getElementById("numero");
const resultado = document.getElementById("resultado");
const boton = document.getElementById("boton");

if (!inputNumero || !resultado || !boton) {
  throw new Error("Faltan elementos del HTML (numero, resultado o boton).");
}

const numeroSecreto = Math.floor(Math.random() * 499) + 1;

let intentos = 0;
let juegoTerminado = false;

function aplicarFondo(estado) {
  const colores = {
    frio: "#1d4ed8",
    tibio: "#facc15",
    caliente: "#dc2626",
    ganador: "#22c55e",
    error: "#64748b",
  };

  document.body.style.backgroundColor = colores[estado] ?? "#000000";
}

function revisar(event) {
  event.preventDefault();

  if (juegoTerminado) {
    return;
  }

  const valor = Number(inputNumero.value);

  if (!Number.isInteger(valor) || valor < 1 || valor > 499) {
    resultado.textContent = "Por favor indica un número entre 0 y 500";
    aplicarFondo("error");
    return;
  }

  intentos += 1;

  const distancia = Math.abs(valor - numeroSecreto);

  if (valor === numeroSecreto) {
    resultado.textContent = `¡Has acertado! El número era el ${numeroSecreto}.`;
    aplicarFondo("ganador");
    juegoTerminado = true;
    boton.style.display = "none";
    inputNumero.disabled = true;
    return;
  }

  let nivel;
  if (distancia >= 50) {
    nivel = "Frío, frío";
    aplicarFondo("frio");
  } else if (distancia >= 15) {
    nivel = "Tibio, tibio";
    aplicarFondo("tibio");
  } else {
    nivel = "Caliente, caliente";
    aplicarFondo("caliente");
  }

  const comparacion =
    valor > numeroSecreto
      ? "tu número es más grande que el mío"
      : "tu número es más pequeño que el mío";

  resultado.textContent = `${nivel}: ${comparacion}`;
}