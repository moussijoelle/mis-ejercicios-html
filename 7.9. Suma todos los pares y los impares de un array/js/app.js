const formNumeros = document.getElementById('formNumeros');
const inputNumeros = document.getElementById('numeros');
const resultado = document.getElementById('resultado');

formNumeros.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const numeros = inputNumeros.value
        .split(',')
        .map((valor) => Number(valor.trim()));

    if (numeros.some((numero) => Number.isNaN(numero))) {
        resultado.innerHTML = '<p class="text-error font-medium">Introduce solo números separados por comas.</p>';
        return;
    }

    let sumaPares = 0;
    let sumaImpares = 0;

    for (const numero of numeros) {
        if (numero % 2 === 0) {
            sumaPares += numero;
        } else {
            sumaImpares += numero;
        }
    }

    resultado.innerHTML = `
        <p class="text-base font-medium text-base-content/75">
            Suma de pares: <span class="text-primary">${sumaPares}</span>
        </p>
        <p class="text-base font-medium text-base-content/75">
            Suma de impares: <span class="text-primary">${sumaImpares}</span>
        </p>
    `;
});
