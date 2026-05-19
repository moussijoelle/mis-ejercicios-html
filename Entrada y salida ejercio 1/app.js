//paso 1.Mapear los objectos (elementos) del Html
//controles de formulario (value)
const Num_A =document.getElementById("numeroa");
const Num_B =document.getElementById("numerob");
//parrafos (innerHTML)
const suma =document.getElementById("suma");
const resta =document.getElementById("resta");
const multiplicacion =document.getElementById("multiplicacion");
const division =document.getElementById("division");

function calcular(){
    let res_suma = parseInt(Num_A.value) + parseInt(Num_B.value);
    suma.innerHTML = `la suma de ${Num_A.value} + ${Num_B.value} es ${res_suma}`;

    let res_resta = parseInt(Num_A.value) - parseInt(Num_B.value);
    resta.innerHTML = `la resta de ${Num_A.value} - ${Num_B.value} es ${res_resta}`;

    let res_multiplicacion = parseInt(Num_A.value) * parseInt(Num_B.value);
    multiplicacion.innerHTML = `la multiplicacion de ${Num_A.value} * ${Num_B.value} es ${res_multiplicacion}`;
    
    let res_division = parseInt(Num_A.value) / parseInt(Num_B.value);
    division.innerHTML = `la division de ${Num_A.value} / ${Num_B.value} es ${res_division}`;
}


