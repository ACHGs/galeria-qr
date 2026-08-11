const fotos = [];

for (let i = 1; i <= 23; i++) {
  fotos.push({
    src: `fotos/f1 (${i}).jpeg`,
    titulo: `Foto ${i}`
  });
}

const galeria = document.getElementById("galeria");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagenModal");
const tituloModal = document.getElementById("tituloModal");
const cerrarModal = document.getElementById("cerrarModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let fotoActual = 0;
let inicioToqueX = 0;
let finToqueX = 0;

function cargarGaleria() {
  galeria.innerHTML = "";

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
}

function cerrarImagen() {
  modal.classList.remove("active");
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

cerrarModal.addEventListener("click", cerrarImagen);
nextBtn.addEventListener("click", siguienteFoto);
prevBtn.addEventListener("click", fotoAnterior);

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
  }

  if (evento.key === "ArrowLeft") {
    fotoAnterior();
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
}

cargarGaleria();
