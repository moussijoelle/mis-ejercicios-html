const Num_C = document.getElementById("numeroEntero");
const doble = document.getElementById("doble");
const triple = document.getElementById("triple");
const botonDobleTriple = document.getElementById("botonDobleTriple");

function calcularDobleTriple() {
    let res_doble = parseInt(Num_C.value) * 2;
    let res_triple = parseInt(Num_C.value) * 3;
    doble.innerHTML = `el doble de ${Num_C.value} es ${res_doble}`;
    triple.innerHTML = `el triple de ${Num_C.value} es ${res_triple}`;
}

botonDobleTriple.addEventListener("click", calcularDobleTriple);
