function tirarDado() {
    const numeroRandom = Math.ceil(Math.random() * 6);
    const rutaImagen = "img/dado" + numeroRandom + ".png";
    document.getElementById("imagenDado").src = rutaImagen;

}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLanzarDado").addEventListener("click", tirarDado);
});
