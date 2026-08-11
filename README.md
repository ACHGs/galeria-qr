# Galería QR para GitHub Pages

Esta carpeta contiene una página web simple para mostrar fotos al escanear un código QR.

## Archivos

- `index.html`: estructura de la página.
- `style.css`: diseño visual.
- `script.js`: carga las fotos y permite abrirlas en grande.
- `fotos/`: carpeta donde van las imágenes.

## Cómo cambiar las fotos

1. Reemplaza las imágenes dentro de la carpeta `fotos`.
2. Puedes mantener los nombres:
   - `foto1.jpg`
   - `foto2.jpg`
   - `foto3.jpg`

Si quieres agregar más fotos, abre `script.js` y agrega otra entrada:

```js
{
  src: "fotos/foto4.jpg",
  titulo: "Foto 4"
}
```

