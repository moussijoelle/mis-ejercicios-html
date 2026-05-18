const formTexto = document.getElementById('formTexto');
const inputTexto = document.getElementById('texto');
const zonaResultado = document.getElementById('resultado');

function stringAlReves(texto) {
    let invertido = '';

    for (let i = texto.length - 1; i >= 0; i--) {
        invertido += texto[i];
    }

    return invertido;
}

formTexto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formTexto.checkValidity()) {
        formTexto.reportValidity();
        return;
    }

    const textoOriginal = inputTexto.value;
    const textoInvertido = stringAlReves(textoOriginal);

    zonaResultado.innerHTML = `
        <p class="text-sm font-medium text-base-content/70">Original:</p>
        <p class="text-lg font-semibold text-base-content sm:text-xl">${textoOriginal}</p>
        <p class="mt-2 text-sm font-medium text-base-content/70">Al revés:</p>
        <p class="text-lg font-semibold text-primary sm:text-xl">${textoInvertido}</p>`;
});
