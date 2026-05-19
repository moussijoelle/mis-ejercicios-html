const planetas = [
  "Mercurio",
  "Venus",
  "Tierra",
  "Marte",
  "Júpiter",
  "Saturno",
  "Urano",
  "Neptuno",
  "Plutón",
];

for (const planeta of planetas) {
  console.log(planeta);
}

const lista = document.getElementById("lista-planetas");
if (lista) {
  for (const planeta of planetas) {
    const item = document.createElement("li");
    item.textContent = planeta;
    item.className =
      "rounded px-2 py-1 text-stone-800 odd:bg-stone-100/80 even:bg-amber-50/60";
    lista.appendChild(item);
  }
}
