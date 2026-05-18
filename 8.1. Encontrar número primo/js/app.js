const formPrimoArray = document.getElementById('formPrimoArray');
const inputLista = document.getElementById('listaNumeros');
const resultado = document.getElementById('resultado');

function esPrimo(num) {
    if (num <= 1) {
        return false;
    }

    for (let divisor = 2; divisor < num; divisor++) {
        if (num % divisor === 0) {
            return false;
        }
    }

    return true;
}

function encontrarPrimerPrimo(numeros) {
    let indice = 0;
    let primerPrimo = null;

    do {
        if (esPrimo(numeros[indice])) {
            primerPrimo = numeros[indice];
        }
        indice++;
    } while (primerPrimo === null && indice < numeros.length);

    return primerPrimo;
}

formPrimoArray.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const numeros = inputLista.value
        .split(',')
        .map((valor) => Number(valor.trim()));

    if (numeros.length === 0 || numeros.some((numero) => Number.isNaN(numero))) {
        resultado.innerHTML = '<p class="w-full max-w-full px-2 text-center text-xs font-medium break-words text-error sm:text-sm">Introduce solo números separados por comas.</p>';
        return;
    }

    const primerPrimo = encontrarPrimerPrimo(numeros);

    if (primerPrimo === null) {
        resultado.innerHTML = `
            <p class="alert alert-warning w-full max-w-full px-3 py-3 text-center text-xs break-words sm:px-4 sm:text-sm">
                No hay ningún número primo en la lista.
            </p>`;
        return;
    }

    resultado.innerHTML = `
        <p class="alert alert-success w-full max-w-full px-3 py-3 text-center text-xs break-words sm:px-4 sm:text-sm">
            El primer número primo es <span class="font-semibold">${primerPrimo}</span>.
        </p>`;
});
