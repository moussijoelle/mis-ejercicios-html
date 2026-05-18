const formDni = document.getElementById('formDni');
const inputDni = document.getElementById('dni');
const resultado = document.getElementById('resultado');

const LETRAS_CONTROL = 'TRWAGMYFPDXBNJZSQVHLCKE';

function obtenerNumeroBase(dni) {
    const valor = dni.trim().toUpperCase();
    const primeraLetra = valor.charAt(0);

    if (primeraLetra === 'X' || primeraLetra === 'Y' || primeraLetra === 'Z') {
        const sustitucion = { X: '0', Y: '1', Z: '2' };
        return Number(sustitucion[primeraLetra] + valor.slice(1, 8));
    }

    return Number(valor.slice(0, 8));
}

function calcularLetraControl(dni) {
    const numero = obtenerNumeroBase(dni);
    return LETRAS_CONTROL.charAt(numero % 23);
}

function esLetraCorrecta(dni) {
    const valor = dni.trim().toUpperCase();
    const letraIntroducida = valor.slice(-1);
    const letraCalculada = calcularLetraControl(valor);

    return letraIntroducida === letraCalculada;
}

function esFormatoValido(dni) {
    const valor = dni.trim().toUpperCase();
    return /^\d{8}[A-Z]$/.test(valor) || /^[XYZ]\d{7}[A-Z]$/.test(valor);
}

formDni.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const dni = inputDni.value.trim().toUpperCase();

    if (!esFormatoValido(dni)) {
        resultado.innerHTML = `
            <p class="alert alert-error w-full px-3 py-3 text-center text-xs sm:text-sm">
                Formato no válido. Usa 8 dígitos + letra (DNI) o X/Y/Z + 7 dígitos + letra (NIE).
            </p>`;
        return;
    }

    const letraCorrecta = calcularLetraControl(dni);

    if (esLetraCorrecta(dni)) {
        resultado.innerHTML = `
            <p class="alert alert-success w-full px-3 py-3 text-center text-xs sm:text-sm">
                La letra <span class="font-semibold">${dni.slice(-1)}</span> es correcta para <span class="font-semibold">${dni}</span>.
            </p>`;
        return;
    }

    resultado.innerHTML = `
        <p class="alert alert-warning w-full px-3 py-3 text-center text-xs sm:text-sm">
            La letra no es correcta. Para <span class="font-semibold">${dni.slice(0, -1)}</span> debería ser <span class="font-semibold">${letraCorrecta}</span>.
        </p>`;
});
