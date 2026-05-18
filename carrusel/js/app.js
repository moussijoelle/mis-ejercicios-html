const mainCard = document.getElementById("main-card");
const pageHeader = document.getElementById("page-header");
const logoHeader = document.getElementById("logo-header");
const tituloPrincipal = document.getElementById("titulo-principal");
const carouselSlide = document.getElementById("carousel-slide");
const carouselFigure = document.getElementById("carousel-figure");
const carouselIntro = document.getElementById("carousel-intro");
const carouselImg = document.getElementById("carousel-img");
const introTitulo = document.getElementById("intro-titulo");
const introSubtitulo = document.getElementById("intro-subtitulo");
const introExtra = document.getElementById("intro-extra");
const introFuente = document.getElementById("intro-fuente");
const introHint = document.getElementById("intro-hint");
const animeInfo = document.getElementById("anime-info");
const animePuesto = document.getElementById("anime-puesto");
const animeNombre = document.getElementById("anime-nombre");
const animeDescripcion = document.getElementById("anime-descripcion");
const animeCaracteristicas = document.getElementById("anime-caracteristicas");
const themeToggle = document.getElementById("theme-toggle");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnFirst = document.getElementById("btn-first");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnLast = document.getElementById("btn-last");
const reloj = document.getElementById("reloj");

const misAnimes = [
  {
    Portada: {
      esIntro: true,
      nombre: "Mapa del top 20 de mis animes japoneses preferidos",
      descripcion: "Una exploración visual y técnica de las obras maestras que definen la cultura del entretenimiento nipón."
    }
  },
  {
    "Anime 1": {
      nombre: "City Hunter",
      estilo: "Acción / Comedia / Detective",
      episodios: 140,
      descripcion: "Acción, comedia y misterio con el legendario detective de Shinjuku.",
      imagen: "img/1.jpg"
    }
  },
  {
    "Anime 2": {
      nombre: "Space Adventure Cobra",
      estilo: "Ciencia Ficción / Aventura Space Opera",
      episodios: 31,
      descripcion: "Space opera con estilo único y uno de mis referentes de ciencia ficción.",
      imagen: "img/2.jpg"
    }
  },
  {
    "Anime 3": {
      nombre: "Dragon Ball Z",
      estilo: "Shonen / Acción / Artes Marciales",
      episodios: 291,
      descripcion: "El shonen que marcó generaciones y sigue siendo icono mundial.",
      imagen: "img/3.jpg"
    }
  },
  {
    "Anime 4": {
      nombre: "Lady Oscar (La Rosa de Versalles)",
      estilo: "Drama Histórico / Romance",
      episodios: 40,
      descripcion: "Drama histórico y romance que elevó el anime a arte narrativo.",
      imagen: "img/4.jpg"
    }
  },
  {
    "Anime 5": {
      nombre: "Galaxy Express 999",
      estilo: "Ciencia Ficción / Aventura Espacial",
      episodios: 113,
      descripcion: "Viaje espacial poético y referente del anime de ciencia ficción clásico.",
      imagen: "img/5.jpg"
    }
  },
  {
    "Anime 6": {
      nombre: "Detective Conan",
      estilo: "Misterio / Policial / Suspenso",
      episodios: "1100+ episodios",
      descripcion: "El misterio policial de largo recorrido que nunca deja de sorprender.",
      imagen: "img/6.jpg"
    }
  },
  {
    "Anime 7": {
      nombre: "Cowboy Bebop",
      estilo: "Ciencia Ficción / Neo-Noir / Espacial",
      episodios: 26,
      descripcion: "Jazz, espacio y neo-noir en una de las series más influyentes.",
      imagen: "img/7.jpg"
    }
  },
  {
    "Anime 8": {
      nombre: "My Hero Academia (Boku no Hero)",
      estilo: "Shonen / Superhéroes / Acción",
      episodios: "150+ episodios",
      descripcion: "Superhéroes modernos con corazón shonen y evolución constante.",
      imagen: "img/8.jpg"
    }
  },
  {
    "Anime 9": {
      nombre: "Naruto",
      estilo: "Shonen / Acción / Ninja",
      episodios: 220,
      descripcion: "La saga ninja que popularizó el shonen en occidente.",
      imagen: "img/9.jpg"
    }
  },
  {
    "Anime 10": {
      nombre: "Death Note",
      estilo: "Misterio / Thriller Psicológico",
      episodios: 37,
      descripcion: "Thriller psicológico magistral sobre poder, moral y genialidad.",
      imagen: "img/10.jpg"
    }
  },
  {
    "Anime 11": {
      nombre: "Ranma ½",
      estilo: "Comedia Romántica / Artes Marciales",
      episodios: 161,
      descripcion: "Comedia romántica y artes marciales en su máxima expresión Rumiko.",
      imagen: "img/11.jpg"
    }
  },
  {
    "Anime 12": {
      nombre: "Nadia: El Secreto del Agua Azul",
      estilo: "Aventura / Ciencia Ficción / Steampunk",
      episodios: 39,
      descripcion: "Aventura steampunk precursora del espíritu de exploración Ghibli.",
      imagen: "img/12.jpg"
    }
  },
  {
    "Anime 13": {
      nombre: "InuYasha",
      estilo: "Fantasía / Romance / Acción Histórica",
      episodios: 167,
      descripcion: "Fantasía histórica y romance épico en el Japón feudal.",
      imagen: "img/13.jpg"
    }
  },
  {
    "Anime 14": {
      nombre: "One Piece",
      estilo: "Shonen / Aventura / Piratas",
      episodios: "1100+ episodios",
      descripcion: "La gran odisea pirata que redefine la aventura shonen.",
      imagen: "img/14.jpg"
    }
  },
  {
    "Anime 15": {
      nombre: "Pokémon",
      estilo: "Aventura / Fantasía / Mascotas",
      episodios: "1200+ episodios",
      descripcion: "Franquicia global de aventura, amistad y coleccionismo.",
      imagen: "img/15.jpg"
    }
  },
  {
    "Anime 16": {
      nombre: "Juliette je t'aime (Maison Ikkoku)",
      estilo: "Comedia Romántica / Vida Diaria",
      episodios: 96,
      descripcion: "Comedia romántica de convivencia con encanto atemporal.",
      imagen: "img/16.jpg"
    }
  },
  {
    "Anime 17": {
      nombre: "Princesa Sarah",
      estilo: "Drama / Histórico / Clásico",
      episodios: 46,
      descripcion: "Drama clásico que enseñó resiliencia a varias generaciones.",
      imagen: "img/17.jpg"
    }
  },
  {
    "Anime 18": {
      nombre: "Toro Toro",
      estilo: "Fantasía / Familiar / Studio Ghibli",
      episodios: "Película clásica",
      descripcion: "Joyas de Studio Ghibli que cierran el mapa con calidez familiar.",
      imagen: "img/18.jpeg"
    }
  },
  {
    "Anime 19": {
      nombre: "Saint Seiya (Los Caballeros del Zodíaco)",
      estilo: "Shonen / Acción / Mitología",
      episodios: 114,
      descripcion: "Mitología, armaduras sagradas y batallas épicas del recuerdo.",
      imagen: "img/19.jpg"
    }
  },
  {
    "Anime 20": {
      nombre: "Cardcaptor Sakura",
      estilo: "Mahō Shōjo / Fantasía / Romance",
      episodios: 70,
      descripcion: "Mahō shōjo refinado con magia, ternura y diseño impecable.",
      imagen: "img/20.jpg"
    }
  },
  {
    Info: {
      esInfo: true,
      nombre: "Modo día y noche",
      descripcion:
        "Puedes ver esta página en tema claro u oscuro. Haz clic en el icono del sol (arriba a la derecha) para el modo día y en la luna para el modo noche.",
      parrafoAnime:
        "El anime japonés es uno de los fenómenos culturales más influyentes de las últimas décadas: series, películas y estudios han exportado narrativas, estética y valores a todo el mundo. Hoy impulsa la industria del entretenimiento, el merchandising, el turismo en Japón y comunidades globales de fans, y sigue renovando géneros desde el shōnen hasta el seinen.",
      fuente: {
        url: "https://es.wikipedia.org/wiki/Anime",
        texto: "Wikipedia — Anime"
      }
    }
  }
];

let indexActual = 0;
let intervalo = null;
let intervaloReloj = null;
let sentidoAutoplay = 1;
let carruselIniciado = false;

const CLAVE_TEMA = "tema-anime-carrusel";

const CLASES_CARD_NORMAL = ["p-4", "sm:p-5"];
const CLASES_CARD_COMPACTA = ["p-3"];
const CLASES_HEADER_NORMAL = ["mb-2", "pb-2"];
const CLASES_HEADER_COMPACTO = ["mb-1", "pb-1"];
const CLASES_LOGO_NORMAL = ["h-16", "w-16", "md:h-20", "md:w-20", "lg:h-24", "lg:w-24"];
const CLASES_LOGO_COMPACTO = ["h-11", "w-11", "md:h-12", "md:w-12"];
const CLASES_TITULO_NORMAL = ["text-2xl", "md:text-3xl", "tracking-wide"];
const CLASES_TITULO_COMPACTO = ["text-base", "leading-tight"];
const CLASES_FIGURE_PADDING_NORMAL = ["px-2"];
const CLASES_FIGURE_PADDING_COMPACTO = ["px-1"];
const CLASES_IMG_ANIME = ["max-h-[50vh]", "md:max-h-[min(62vh,560px)]"];

function alternarGrupo(elemento, activar, clasesOn, clasesOff) {
  if (activar) {
    clasesOff.forEach((clase) => elemento.classList.remove(clase));
    clasesOn.forEach((clase) => elemento.classList.add(clase));
  } else {
    clasesOn.forEach((clase) => elemento.classList.remove(clase));
    clasesOff.forEach((clase) => elemento.classList.add(clase));
  }
}

function aplicarEstiloIntro() {
  alternarGrupo(mainCard, true, CLASES_CARD_NORMAL, CLASES_CARD_COMPACTA);
  alternarGrupo(pageHeader, true, CLASES_HEADER_NORMAL, CLASES_HEADER_COMPACTO);
  alternarGrupo(logoHeader, true, CLASES_LOGO_NORMAL, CLASES_LOGO_COMPACTO);
  alternarGrupo(tituloPrincipal, true, CLASES_TITULO_NORMAL, CLASES_TITULO_COMPACTO);
  alternarGrupo(carouselFigure, true, CLASES_FIGURE_PADDING_NORMAL, CLASES_FIGURE_PADDING_COMPACTO);
  alternarGrupo(carouselImg, false, CLASES_IMG_ANIME, []);
}

function aplicarEstiloAnime() {
  alternarGrupo(mainCard, true, CLASES_CARD_COMPACTA, CLASES_CARD_NORMAL);
  alternarGrupo(pageHeader, true, CLASES_HEADER_COMPACTO, CLASES_HEADER_NORMAL);
  alternarGrupo(logoHeader, true, CLASES_LOGO_COMPACTO, CLASES_LOGO_NORMAL);
  alternarGrupo(tituloPrincipal, true, CLASES_TITULO_COMPACTO, CLASES_TITULO_NORMAL);
  alternarGrupo(carouselFigure, true, CLASES_FIGURE_PADDING_COMPACTO, CLASES_FIGURE_PADDING_NORMAL);
  alternarGrupo(carouselImg, true, CLASES_IMG_ANIME, []);
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  themeToggle.checked = tema === "night";
  localStorage.setItem(CLAVE_TEMA, tema);
}

function restaurarTema() {
  const guardado = localStorage.getItem(CLAVE_TEMA);
  aplicarTema(guardado === "night" ? "night" : "light");
}

function irA(indice) {
  const total = misAnimes.length;
  indexActual = ((indice % total) + total) % total;
  actualizarPantalla();
}

function ultimoIndice() {
  return misAnimes.length - 1;
}

function obtenerSlide(indice = indexActual) {
  const entrada = misAnimes[indice];
  const identificador = Object.keys(entrada)[0];
  const datos = entrada[identificador];

  if (datos.esIntro) {
    return {
      esIntro: true,
      nombre: datos.nombre,
      descripcion: datos.descripcion,
    };
  }

  if (datos.esInfo) {
    return {
      esInfo: true,
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      parrafoAnime: datos.parrafoAnime,
      fuente: datos.fuente,
    };
  }

  return {
    array: identificador,
    nombre: datos.nombre,
    estilo: datos.estilo,
    episodios: datos.episodios,
    descripcion: datos.descripcion,
    imagen: datos.imagen,
  };
}

function mostrarEnlaceFuente(fuente) {
  introFuente.replaceChildren();
  if (!fuente) {
    introFuente.classList.add("hidden");
    return;
  }
  const enlace = document.createElement("a");
  enlace.href = fuente.url;
  enlace.textContent = fuente.texto;
  enlace.target = "_blank";
  enlace.rel = "noopener noreferrer";
  enlace.className = "link link-hover text-sm underline";
  introFuente.appendChild(enlace);
  introFuente.classList.remove("hidden");
}

function lineasCaracteristicas(slide) {
  const episodios =
    typeof slide.episodios === "number"
      ? `${slide.episodios} episodios`
      : slide.episodios;

  return [`Estilo: ${slide.estilo}`, `Episodios: ${episodios}`];
}

function mostrarMarcoTexto() {
  aplicarEstiloIntro();
  carouselIntro.classList.remove("hidden");
  carouselIntro.classList.add("flex");
  carouselImg.classList.add("hidden");
  carouselImg.removeAttribute("src");
  animeInfo.classList.add("hidden");
}

function actualizarPantalla() {
  const slide = obtenerSlide();

  if (slide.esIntro) {
    mostrarMarcoTexto();
    carouselIntro.classList.remove("slide-info");
    introTitulo.textContent = slide.nombre;
    introTitulo.classList.add("sr-only");
    introSubtitulo.textContent = slide.descripcion;
    introExtra.textContent = "";
    introExtra.classList.add("hidden");
    mostrarEnlaceFuente(null);
    introHint.classList.remove("hidden");
    return;
  }

  if (slide.esInfo) {
    mostrarMarcoTexto();
    carouselIntro.classList.add("slide-info");
    introTitulo.textContent = slide.nombre;
    introTitulo.classList.remove("sr-only");
    introSubtitulo.textContent = slide.descripcion;
    introExtra.textContent = slide.parrafoAnime;
    introExtra.classList.remove("hidden");
    mostrarEnlaceFuente(slide.fuente);
    introHint.classList.add("hidden");
    return;
  }

  aplicarEstiloAnime();
  introTitulo.classList.add("sr-only");
  carouselIntro.classList.remove("slide-info");
  carouselIntro.classList.add("hidden");
  carouselIntro.classList.remove("flex");
  carouselImg.classList.remove("hidden");
  animeInfo.classList.remove("hidden");

  carouselImg.src = slide.imagen;
  carouselImg.alt = `Portada de ${slide.nombre}`;
  animePuesto.textContent = slide.array;
  animeNombre.textContent = slide.nombre;
  animeDescripcion.textContent = slide.descripcion;
  animeDescripcion.classList.remove("hidden");

  animeCaracteristicas.replaceChildren();
  lineasCaracteristicas(slide).forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    animeCaracteristicas.appendChild(li);
  });
}

function siguiente() {
  irA(indexActual + 1);
}

function anterior() {
  irA(indexActual - 1);
}

function tickAutoplay() {
  const ultimo = ultimoIndice();

  if (indexActual === ultimo && sentidoAutoplay === 1) {
    sentidoAutoplay = -1;
  } else if (indexActual === 0 && sentidoAutoplay === -1) {
    sentidoAutoplay = 1;
  }

  irA(indexActual + sentidoAutoplay);
}

function detenerAutoplay() {
  if (intervalo !== null) {
    clearInterval(intervalo);
    intervalo = null;
  }
  btnPlayPause.textContent = "▶";
  btnPlayPause.className = "btn btn-circle btn-success btn-sm text-white shrink-0";
  btnPlayPause.setAttribute("aria-label", "Iniciar reproducción automática");
}

function iniciarAutoplay() {
  sentidoAutoplay = 1;
  intervalo = setInterval(tickAutoplay, 3000);
  btnPlayPause.textContent = "⏸";
  btnPlayPause.className = "btn btn-circle btn-error btn-sm text-white shrink-0";
  btnPlayPause.setAttribute("aria-label", "Pausar reproducción automática");
}

function actualizarReloj() {
  if (!reloj) return;

  const ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();
  let segundos = ahora.getSeconds();

  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  reloj.textContent = `${horas}:${minutos}:${segundos}`;
}

function iniciarReloj() {
  if (!reloj || intervaloReloj !== null) return;

  actualizarReloj();
  intervaloReloj = setInterval(actualizarReloj, 1000);
}

function iniciarCarrusel() {
  if (carruselIniciado || !btnNext) return;
  carruselIniciado = true;

  btnNext.addEventListener("click", siguiente);
  btnPrev.addEventListener("click", anterior);
  btnFirst.addEventListener("click", () => irA(0));
  btnLast.addEventListener("click", () => irA(ultimoIndice()));

  btnPlayPause.addEventListener("click", () => {
    if (intervalo === null) {
      iniciarAutoplay();
    } else {
      detenerAutoplay();
    }
  });

  themeToggle.addEventListener("change", () => {
    aplicarTema(themeToggle.checked ? "night" : "light");
  });

  restaurarTema();
  actualizarPantalla();
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarReloj();
  if (mainCard) iniciarCarrusel();
});
