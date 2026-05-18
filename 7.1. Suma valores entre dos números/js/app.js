const inputIni = document.getElementById("ini");
const inputFin = document.getElementById("fin");
const btnCalcular = document.getElementById("btnCalcular");
const salida = document.getElementById("resultado");

function calcular() {
    let inicio = parseInt(inputIni.value, 10);
    let fin = parseInt(inputFin.value, 10);


    if (Number.isNaN(inicio) || Number.isNaN(fin)) {
        salida.textContent = "Escribe dos números enteros válidos.";
        return;
      }

      if (inicio > fin) {
        const temporal = inicio;
        inicio = fin;
        fin = temporal;
      }


      let suma = 0;

      for (let i = inicio; i <= fin; i++) {
        suma += i;
      }
    
      salida.textContent = suma;



  }


  btnCalcular.addEventListener("click", calcular);

  





