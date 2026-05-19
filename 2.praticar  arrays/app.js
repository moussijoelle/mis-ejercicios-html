const citas = [
  { texto: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.", autor: "John Lennon" },
  { texto: "Sé el cambio que quieres ver en el mundo.", autor: "Mahatma Gandhi" },
  { texto: "No cuentes los días, haz que los días cuenten.", autor: "Muhammad Ali" },
  { texto: "La imaginación es más importante que el conocimiento.", autor: "Albert Einstein" },
  { texto: "El que lee mucho y anda mucho, ve mucho y sabe mucho.", autor: "Miguel de Cervantes" },
  { texto: "La única manera de hacer un gran trabajo es amar lo que haces.", autor: "Steve Jobs" },
  { texto: "No es la especie más fuerte la que sobrevive, sino la que mejor se adapta al cambio.", autor: "Charles Darwin" },
  { texto: "Conocerse a sí mismo es el principio de toda sabiduría.", autor: "Aristóteles" },
  { texto: "La felicidad no es algo hecho. Proviene de tus propias acciones.", autor: "Dalai Lama" },
  { texto: "El futuro pertenece a quienes creen en la belleza de sus sueños.", autor: "Eleanor Roosevelt" },
];

let posicionAMostrar = 0;

const elementoCita = document.getElementById("citaActual");

function mostrarEnPosicion() {
  const item = citas[posicionAMostrar];
  elementoCita.innerHTML = `${item.texto}<br><em>${item.autor}</em>`;
}

function aumentar() {
  if (posicionAMostrar < citas.length - 1) {
    posicionAMostrar++;
    mostrarEnPosicion();
  }
}

function disminuir() {
  if (posicionAMostrar > 0) {
    posicionAMostrar--;
    mostrarEnPosicion();
  }
}

mostrarEnPosicion();

const animales = [
  { emoji: "🐶", nombre: "Perro" },
  { emoji: "🐱", nombre: "Gato" },
  { emoji: "🦁", nombre: "León" },
  { emoji: "🐘", nombre: "Elefante" },
  { emoji: "🦋", nombre: "Mariposa" },
  { emoji: "🐰", nombre: "Conejo" },
  { emoji: "🐢", nombre: "Tortuga" },
  { emoji: "🐧", nombre: "Pingüino" },
  { emoji: "🦉", nombre: "Búho" },
  { emoji: "🐴", nombre: "Caballo" },
];
let posicionAnimal = 0;
const elementoAnimal = document.getElementById("animalActual");

function mostrarAnimal() {
  const a = animales[posicionAnimal];
  elementoAnimal.innerHTML = `<span class="text-4xl">${a.emoji}</span><br>${a.nombre}`;
}

function aumentarAnimal() {
  if (posicionAnimal < animales.length - 1) {
    posicionAnimal++;
    mostrarAnimal();
  }
}

function disminuirAnimal() {
  if (posicionAnimal > 0) {
    posicionAnimal--;
    mostrarAnimal();
  }
}

mostrarAnimal();

const flores = [
  { emoji: "🌹", nombre: "Rosa" },
  { emoji: "🌻", nombre: "Girasol" },
  { emoji: "🌷", nombre: "Tulipán" },
  { emoji: "🌸", nombre: "Cerezo" },
  { emoji: "🌺", nombre: "Hibisco" },
  { emoji: "🌼", nombre: "Margarita" },
  { emoji: "🪷", nombre: "Loto" },
  { emoji: "🥀", nombre: "Clavel" },
  { emoji: "💐", nombre: "Ramo" },
  { emoji: "🌿", nombre: "Lavanda" },
];
let posicionFlor = 0;
const elementoFlor = document.getElementById("florActual");

function mostrarFlor() {
  const f = flores[posicionFlor];
  elementoFlor.innerHTML = `<span class="text-4xl">${f.emoji}</span><br>${f.nombre}`;
}

function aumentarFlor() {
  if (posicionFlor < flores.length - 1) {
    posicionFlor++;
    mostrarFlor();
  }
}

function disminuirFlor() {
  if (posicionFlor > 0) {
    posicionFlor--;
    mostrarFlor();
  }
}

mostrarFlor();
