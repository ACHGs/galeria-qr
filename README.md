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

## Cómo subirlo a GitHub Pages

1. Entra a GitHub.
2. Crea un repositorio nuevo llamado, por ejemplo, `galeria-qr`.
3. Déjalo público.
4. Sube todos estos archivos al repositorio.
5. Entra a `Settings`.
6. Entra a `Pages`.
7. En `Source`, elige `Deploy from a branch`.
8. En `Branch`, elige `main` y carpeta `/root`.
9. Guarda.

Después de unos minutos tendrás un link parecido a:

```text
https://TU_USUARIO.github.io/galeria-qr/
```

Ese link es el que debes usar para crear el código QR.
