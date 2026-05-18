const formTexto = document.getElementById('formTexto');
const inputTexto = document.getElementById('texto');
const zonaResultado = document.getElementById('resultado');

function esLetra(caracter) {
    return (caracter >= 'a' && caracter <= 'z') || caracter === 'ñ';
}

function normalizarParaPalindromo(texto) {
    const sinAcentos = texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    const minusculas = sinAcentos.toLowerCase();
    let limpio = '';

    for (let i = 0; i < minusculas.length; i++) {
        const caracter = minusculas[i];
        if (esLetra(caracter)) {
            limpio += caracter;
        }
    }

    return limpio;
}

function stringAlReves(texto) {
    let invertido = '';

    for (let i = texto.length - 1; i >= 0; i--) {
        invertido += texto[i];
    }

    return invertido;
}

function esPalindromo(texto) {
    const normalizado = normalizarParaPalindromo(texto);
    return normalizado === stringAlReves(normalizado);
}

formTexto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formTexto.checkValidity()) {
        formTexto.reportValidity();
        return;
    }

    const frase = inputTexto.value;

    if (esPalindromo(frase)) {
        zonaResultado.innerHTML = `
            <p class="alert alert-success text-center text-sm">
                «${frase}» es un palíndromo.
            </p>`;
    } else {
        zonaResultado.innerHTML = `
            <p class="alert alert-error text-center text-sm">
                «${frase}» no es un palíndromo.
            </p>`;
    }
});
