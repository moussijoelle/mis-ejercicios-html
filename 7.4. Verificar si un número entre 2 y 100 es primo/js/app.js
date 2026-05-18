const formPrimo = document.getElementById('formPrimo');
const inputNumero = document.getElementById('numero');
const zonaResultado = document.getElementById('resultado');

formPrimo.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formPrimo.checkValidity()) {
        formPrimo.reportValidity();
        return;
    }

    const numero = Number(inputNumero.value);
    let respuesta = '';
    let incrementar = 2;
    let salir = false;
    let primerDivisor = null;

    while (incrementar < numero && !salir) {
        if (numero % incrementar === 0) {
            respuesta = 'no primo';
            primerDivisor = incrementar;
            salir = true;
        }
        incrementar++;
    }

    if (incrementar === numero) {
        respuesta = 'primo';
    }

    if (respuesta === 'primo') {
        zonaResultado.innerHTML = `
            <p class="alert alert-success text-center text-sm">
                El número ${numero} es primo. No tiene divisores.
            </p>`;
    } else {
        zonaResultado.innerHTML = `
            <p class="alert alert-error text-center text-sm">
                El número ${numero} no es primo. Es divisible por ${primerDivisor}.
            </p>`;
    }
});
