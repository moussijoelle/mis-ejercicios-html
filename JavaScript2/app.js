const formularioNotas = document.getElementById("form-notas");
const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");
const resultado = document.getElementById("resultado");

formularioNotas.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const n1 = parseFloat(nota1.value);
  const n2 = parseFloat(nota2.value);
  const n3 = parseFloat(nota3.value);

  const promedio = (n1 + n2 + n3) / 3;

  resultado.textContent = `Promedio: ${promedio}`;
});