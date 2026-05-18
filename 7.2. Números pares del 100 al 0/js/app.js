const resultado = document.getElementById("resultado");

for (let i = 100; i >= 0; i--) {
  if (i % 2 === 0) {
    resultado.innerHTML += `<span class="block rounded-md bg-base-200 px-1 py-2 text-center text-sm font-medium tabular-nums">${i}</span>`;
  }
}
