const TOTAL_MAXIMO_FOTOS = 100;

const posiblesExtensiones = ["jpeg", "jpg", "png", "webp"];

let fotos = [];
let fotoActual = 0;
let inicioToqueX = 0;
let finToqueX = 0;
let intervaloAutomatico = null;

const galeria = document.getElementById("galeria");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagenModal");
const tituloModal = document.getElementById("tituloModal");
const cerrarModal = document.getElementById("cerrarModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const musicaFondo = document.getElementById("musicaFondo");

/*
  Este código busca imágenes con nombres como:

  fotos/f1 (1).jpeg
  fotos/f1 (2).jpeg
  fotos/f1 (3).jpeg
  ...
  fotos/f1 (100).jpeg

  También prueba .jpg, .png y .webp.

  Si una foto no existe, simplemente la ignora.
*/

function probarImagen(ruta) {
  return new Promise((resolve) => {
    const imagen = new Image();

    imagen.onload = () => {
      resolve(ruta);
    };

    imagen.onerror = () => {
      resolve(null);
    };

    imagen.src = ruta;
  });
}

async function buscarFotos() {
  const fotosEncontradas = [];

  for (let i = 1; i <= TOTAL_MAXIMO_FOTOS; i++) {
    let rutaEncontrada = null;

    for (const extension of posiblesExtensiones) {
      const ruta = `fotos/f1 (${i}).${extension}`;
      rutaEncontrada = await probarImagen(ruta);

      if (rutaEncontrada) {
        break;
      }
    }

    if (rutaEncontrada) {
      fotosEncontradas.push({
        src: rutaEncontrada,
        titulo: `Foto ${fotosEncontradas.length + 1}`
      });
    }
  }

  fotos = fotosEncontradas;
  cargarGaleria();
}

function cargarGaleria() {
  galeria.innerHTML = "";

  if (fotos.length === 0) {
    galeria.innerHTML = "<p>No hay fotos disponibles.</p>";
    return;
  }

  fotos.forEach((foto, index) => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = foto.src;
    img.alt = foto.titulo;
    img.loading = "lazy";

    const titulo = document.createElement("p");
    titulo.textContent = foto.titulo;

    card.appendChild(img);
    card.appendChild(titulo);

    card.addEventListener("click", () => {
      abrirModal(index);
    });

    galeria.appendChild(card);
  });
}

function abrirModal(index) {
  fotoActual = index;
  actualizarModal();
  modal.classList.add("active");

  iniciarMusica();
  iniciarPaseAutomatico();
}

function cerrarImagen() {
  modal.classList.remove("active");
  detenerPaseAutomatico();
}

function actualizarModal() {
  imagenModal.src = fotos[fotoActual].src;
  imagenModal.alt = fotos[fotoActual].titulo;
  tituloModal.textContent = fotos[fotoActual].titulo;
}

function siguienteFoto() {
  fotoActual++;

  if (fotoActual >= fotos.length) {
    fotoActual = 0;
  }

  actualizarModal();
}

function fotoAnterior() {
  fotoActual--;

  if (fotoActual < 0) {
    fotoActual = fotos.length - 1;
  }

  actualizarModal();
}

function iniciarPaseAutomatico() {
  detenerPaseAutomatico();

  intervaloAutomatico = setInterval(() => {
    siguienteFoto();
  }, 3500);
}

function detenerPaseAutomatico() {
  if (intervaloAutomatico !== null) {
    clearInterval(intervaloAutomatico);
    intervaloAutomatico = null;
  }
}

function reiniciarPaseAutomatico() {
  iniciarPaseAutomatico();
}

function iniciarMusica() {
  if (!musicaFondo) {
    return;
  }

  musicaFondo.volume = 0.35;

  musicaFondo.play().catch(() => {
    console.log("El navegador bloqueó la música hasta que el usuario toque la página.");
  });
}

cerrarModal.addEventListener("click", cerrarImagen);

nextBtn.addEventListener("click", () => {
  siguienteFoto();
  reiniciarPaseAutomatico();
});

prevBtn.addEventListener("click", () => {
  fotoAnterior();
  reiniciarPaseAutomatico();
});

imagenModal.addEventListener("click", () => {
  siguienteFoto();
  reiniciarPaseAutomatico();
});

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    cerrarImagen();
  }
});

document.addEventListener("keydown", (evento) => {
  if (!modal.classList.contains("active")) {
    return;
  }

  if (evento.key === "Escape") {
    cerrarImagen();
  }

  if (evento.key === "ArrowRight") {
    siguienteFoto();
    reiniciarPaseAutomatico();
  }

  if (evento.key === "ArrowLeft") {
    fotoAnterior();
    reiniciarPaseAutomatico();
  }
});

modal.addEventListener("touchstart", (evento) => {
  inicioToqueX = evento.changedTouches[0].screenX;
});

modal.addEventListener("touchend", (evento) => {
  finToqueX = evento.changedTouches[0].screenX;
  manejarDeslizamiento();
});

function manejarDeslizamiento() {
  const diferencia = finToqueX - inicioToqueX;

  if (Math.abs(diferencia) < 50) {
    return;
  }

  if (diferencia < 0) {
    siguienteFoto();
  } else {
    fotoAnterior();
  }

  reiniciarPaseAutomatico();
}

buscarFotos();