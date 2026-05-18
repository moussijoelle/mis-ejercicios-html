function tirarDado() {
    const numeroRandom = Math.floor(Math.random() * 6) + 1;
    const rutaImagen = "img/dado" + numeroRandom + ".png";
    document.getElementById("imagenDado").src = rutaImagen;

}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLanzarDado").addEventListener("click", tirarDado);
});
