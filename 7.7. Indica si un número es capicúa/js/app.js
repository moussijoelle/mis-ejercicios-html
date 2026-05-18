const formCapicua = document.getElementById('formCapicua');
const inputNumero = document.getElementById('numero');
const zonaResultado = document.getElementById('resultado');

function numeroAlReves(cadenaDigitos) {
    let invertido = '';

    for (let i = cadenaDigitos.length - 1; i >= 0; i--) {
        invertido += cadenaDigitos[i];
    }

    return invertido;
}

function esCapicua(numero) {
    const cadena = String(numero);
    return cadena === numeroAlReves(cadena);
}

formCapicua.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formCapicua.checkValidity()) {
        formCapicua.reportValidity();
        return;
    }

    const numero = Number(inputNumero.value);

    if (esCapicua(numero)) {
        zonaResultado.innerHTML = `
            <p class="alert alert-success text-center text-sm">
                El número ${numero} es capicúa. Se lee igual de izquierda a derecha y de derecha a izquierda.
            </p>`;
    } else {
        zonaResultado.innerHTML = `
            <p class="alert alert-error text-center text-sm">
                El número ${numero} no es capicúa.
            </p>`;
    }
});
