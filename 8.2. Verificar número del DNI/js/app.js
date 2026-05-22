const formDni = document.getElementById('formDni');
const inputDni = document.getElementById('dni');
const resultado = document.getElementById('resultado');

const LETRAS_CONTROL = 'TRWAGMYFPDXBNJZSQVHLCKE';

function normalizarTexto(texto) {
    return texto.trim().toUpperCase();
}

function validarFormato(documento) {
    return /^\d{8}[A-Z]$/.test(documento) || /^[XYZ]\d{7}[A-Z]$/.test(documento);
}

function obtenerNumeroBase(documento) {
    const primeraLetra = documento.charAt(0);

    if (primeraLetra === 'X' || primeraLetra === 'Y' || primeraLetra === 'Z') {
        const sustitucion = { X: '0', Y: '1', Z: '2' };
        return Number(sustitucion[primeraLetra] + documento.slice(1, 8));
    }

    return Number(documento.slice(0, 8));
}

function calcularLetraControl(numeroBase) {
    return LETRAS_CONTROL.charAt(numeroBase % 23);
}

function esLetraCorrecta(texto) {
    const documento = normalizarTexto(texto);

    if (!validarFormato(documento)) {
        return false;
    }

    const letraUsuario = documento.slice(-1);
    const letraCalculada = calcularLetraControl(obtenerNumeroBase(documento));

    return letraUsuario === letraCalculada;
}

function esFormatoValido(documento) {
    return validarFormato(documento);
}

formDni.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const dni = normalizarTexto(inputDni.value);

    if (!validarFormato(dni)) {
        resultado.innerHTML = `
            <p class="alert alert-error w-full px-3 py-3 text-center text-xs sm:text-sm">
                Formato no válido. Usa 8 dígitos + letra (DNI) o X/Y/Z + 7 dígitos + letra (NIE).
            </p>`;
        return;
    }

    const letraCorrecta = calcularLetraControl(obtenerNumeroBase(dni));

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
