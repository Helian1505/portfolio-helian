# Portafolio — Helian Fierro

Landing page de portafolio. Next.js 16 (App Router) · Tailwind CSS 4 · Motion · 100% estático.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verifica que compile antes de hacer push
```

## Agregar, quitar o editar proyectos

Todo el contenido vive en **dos archivos**. No hay que tocar componentes.

| Quiero… | Archivo | Qué hago |
|---|---|---|
| Agregar un proyecto | `content/projects.ts` | Copio un objeto del array `projects`, cambio los campos y pongo su captura en `public/projects/` |
| Ocultar uno sin borrarlo | `content/projects.ts` | `hidden: true` |
| Cambiar el orden | `content/projects.ts` | Cambio `order` (menor = primero) |
| Cambiar el destacado | `content/projects.ts` | `featured: true` en el que quiero arriba (se usa el primero que lo tenga) |
| Cambiar titular, bio, stack, contacto | `content/profile.ts` | Edito el texto |
| Cambiar la foto | `public/helian.jpg` | Reemplazo el archivo (proporción 4:5) |

Cada proyecto genera su página en `/projects/<slug>` automáticamente, se suma a los filtros y al sitemap.
Si el número de proyectos es impar, el primero se muestra ancho para que la grilla nunca quede con un hueco.

Campos opcionales útiles: `architecture` (dibuja el diagrama de flujo), `links.live` (botón de demo), `image`.

## Desplegar en Vercel (una sola vez)

1. Crea un repo vacío en GitHub, por ejemplo `portfolio`.
2. Desde esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Portfolio v1"
   git branch -M main
   git remote add origin https://github.com/Helian1505/portfolio.git
   git push -u origin main
   ```
3. En vercel.com → **Add New… → Project** → importa el repo → **Deploy**. No requiere configuración.
4. (Opcional) En *Settings → Environment Variables* agrega `NEXT_PUBLIC_SITE_URL` con tu dominio final para que el sitemap y las previews de LinkedIn usen la URL correcta.

Desde ahí, cada `git push` a `main` redespliega solo.

## Decisiones de diseño

- **Visual:** tokens de Linear (lienzo `#08090a`, bordes hairline, un único acento lima para la acción principal) con estructura de Apple (hero centrado, el proyecto insignia como "render de producto" a todo ancho).
- **Movimiento** (skill `apple-design`): springs críticamente amortiguados por defecto, feedback al presionar (no al soltar), animaciones interrumpibles, solo `transform`/`opacity`.
- **Accesibilidad:** respeta `prefers-reduced-motion`, `prefers-reduced-transparency` y `prefers-contrast`; skip link; foco visible; filtros con `aria-pressed` y anuncio del resultado; el contenido sigue visible sin JavaScript.
- **Fuentes auto-hospedadas** en `app/fonts/` (Inter y JetBrains Mono variables): el build no depende de Google Fonts.
