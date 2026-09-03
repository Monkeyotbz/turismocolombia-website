# Branding — Turismo Colombia

Assets recuperados del sitio en producción (turismocolombia.fit / GoDaddy Website Builder,
CDN `img1.wsimg.com`, cuenta `47a42bda-3a93-45dc-b444-03691df6f62e`) + los que ya venían en el repo.

## Archivos

| Archivo | Qué es | Uso |
|---|---|---|
| `logo-primary.png` | Lockup horizontal: monograma **TC** (T amarilla + C azul con **guacamaya roja** dentro) + "TURISMO / COLOMBIA.FIT". 1797×658, PNG transparente | Header, footer, admin, documentos |
| `emblem.png` | Sello circular: **guacamaya volando** con alas amarillas y cola azul+roja (bandera), "TurismoColombia.Fit" en circular, 5 estrellas. 2000×2000, PNG transparente | Favicon, sello/marca de agua, splash, redes |
| `favicon-32/48/192/512.png`, `apple-touch-icon.png` | Generados del `emblem.png` (recorte cuadrado). | `index.html` |

## Mascota

La **guacamaya (macaw) en colores de la bandera** (amarillo / azul / rojo) es el elemento central de la marca.
El repo tiene sprites de un loro en `public/sprites/` (el viejo `ParrotOverlay`) — se puede retomar.

## Paleta (muestreada del logo)

| Color | Hex real (logo) | Token UI (versión "domada") |
|---|---|---|
| Azul Colombia | `#0040D0` | `azul` = `#0A3FD1` (énfasis), `azul-deep` = `#0C2260` |
| Amarillo | `~#F2E200` | `oro` = `#E0A32E` (UI) · `oro-bright` = `#F2C400` (logo) |
| Rojo | `~#E01010` | `carmin` = `#B23A2E` (UI) · `carmin-bright` = `#E11B1B` (logo) |
| Gris texto | `#606060` | `muted` |
| Negro sello | `#000` | `ink` = `#1C1A17` |

`theme-color` del sitio: `#0A3FD1`. (En GoDaddy estaba `#f72828`.)

## SEO actual del sitio en producción (para referencia)

- Title: *"Turismo en Colombia | Tours, Hospedajes y Experiencias Únicas"*
- Description: *"Descubre Colombia con tours auténticos, naturaleza, cultura y experiencias guiadas. Reserva fácil y vive aventuras inolvidables en destinos únicos."*
- Frase Twitter: *"¡Conoce junto a nosotros los mejores destinos de Colombia!"*

## Falta traer del panel de GoDaddy (no se puede scrapear)

1. **Logo vectorial (SVG / AI / EPS)** — wsimg solo sirve PNG rasterizado. El SVG permite escalar sin pérdida y recolorear.
2. **Valores de marca exactos** definidos por el diseñador (hex precisos, tipografía de marca si hay).
3. Versiones alternas del logo si existen (monocromo, blanco, solo-monograma).
