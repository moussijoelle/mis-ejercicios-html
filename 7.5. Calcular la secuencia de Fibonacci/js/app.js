const formFibonacci = document.getElementById('formFibonacci');
const inputNumero = document.getElementById('numero');
const zonaResultado = document.getElementById('resultado');

function secuenciaFibonacci(cantidadTerminos) {
    if (cantidadTerminos <= 0) {
        return [];
    }

    if (cantidadTerminos === 1) {
        return [0];
    }

    const secuencia = [0, 1];

    while (secuencia.length < cantidadTerminos) {
        const ultimo = secuencia[secuencia.length - 1];
        const penultimo = secuencia[secuencia.length - 2];
        secuencia.push(ultimo + penultimo);
    }

    return secuencia;
}

formFibonacci.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formFibonacci.checkValidity()) {
        formFibonacci.reportValidity();
        return;
    }

    const cantidadTerminos = Number(inputNumero.value);
    const secuencia = secuenciaFibonacci(cantidadTerminos);
    const textoSecuencia = secuencia.join(', ');

    zonaResultado.innerHTML = `
        <p class="text-sm font-medium text-base-content/70">
            ${cantidadTerminos} término${cantidadTerminos === 1 ? '' : 's'}:
        </p>
        <p class="text-lg font-semibold leading-relaxed text-primary sm:text-xl">
            ${textoSecuencia}
        </p>`;
});
