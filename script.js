// Cambia aquí los nombres si reemplazas o agregas fotos.
// Las fotos deben estar dentro de la carpeta "fotos".
const fotos = [
  {
    src: "fotos/foto1.jpg",
    titulo: "Foto 1"
  },
  {
    src: "fotos/foto2.jpg",
    titulo: "Foto 2"
  },
  {
    src: "fotos/foto3.jpg",
    titulo: "Foto 3"
  }
];

const galeria = document.getElementById("galeria");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagenModal");
const cerrarModal = document.getElementById("cerrarModal");

fotos.forEach((foto) => {
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
    imagenModal.src = foto.src;
    imagenModal.alt = foto.titulo;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });

  galeria.appendChild(card);
});

function cerrarImagen() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  imagenModal.src = "";
}

cerrarModal.addEventListener("click", cerrarImagen);

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    cerrarImagen();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    cerrarImagen();
  }
});
