# 🔎 Análisis de la Landing Actual — turismocolombia.fit

> Documento base para el rediseño. Recopila todo lo que hoy existe (contenido, marca, arquitectura, conversión, deuda técnica) para partir de ahí hacia la nueva landing.
> Fecha del análisis: **2026-09-01**

---

## 0. Contexto: hay DOS sitios distintos

| | **Este repo** (`turismocolombia-website-main`) | **Sitio en producción** |
|---|---|---|
| URL | https://turismocolombia-website.vercel.app/ | https://turismocolombia.fit/ |
| Qué es | **MVP** hecho a medida (Vite + React + Supabase) | El sitio **que hoy usa el negocio** |
| Plataforma | Custom, deploy en Vercel | **GoDaddy / Website Builder tipo Wix** (CDN `img1.wsimg.com`, atribución `godaddy.com`) |
| Newsletter | No tiene | **Mailchimp** (`mailchi.mp`) con gancho *"¡Obtén un 10% de descuento!"* |
| Base de datos | Supabase — **ya no existe, hay que recrearla desde cero con nuevas condiciones** | N/A (todo es contenido del builder) |

➡️ **El objetivo del proyecto es que este repo (custom) evolucione hasta reemplazar el sitio de GoDaddy/Wix**, con una base de datos Supabase nueva y limpia (auth + catálogo) y el chat/reservas en el CRM propio por construir.

### Qué tiene hoy turismocolombia.fit (producción) que el MVP NO cubre

Menú real del sitio en vivo y sus rutas:
`Home (/)` · `Sobre Nosotros (/sobre-nosotros)` · `Tours (/tours)` · `Hospedajes (/hospedajes-1)` · `Destinos (/destinos)` · `Blog (/blog)` · `Oro Nacional (/oro-nacional)` · `Eventos (/eventos-1)` · `Propiedades a la venta (/propiedades-a-la-venta)` · `Reserva aquí` → WhatsApp.

Líneas de negocio visibles en producción:
1. **Tours y guianzas**
2. **Hospedajes**
3. **Destinos**
4. **Eventos** (sección propia, no solo un filtro)
5. **Oro Nacional / "Compra Oro"** — compra-venta de oro. **El MVP no lo tiene** (solo aparece como collage decorativo en `DestinosPage`)
6. **Propiedades a la venta** — inmobiliaria. **El MVP no lo tiene**
7. **Blog**
8. **Newsletter** con incentivo del 10% (Mailchimp). **El MVP no lo tiene**

Copy del hero en producción: *"¡Conoce junto a nosotros los mejores destinos de Colombia!"*
Oferta destacada actual: *"Ruta en Helicóptero Jardín"*.
Contacto en producción: WhatsApp **+57 314 528 4548**, tel `3145284548`, atención *"Cita previa"*. Mismo número que el MVP.
Sin chat widget, sin analítica detectada, con banner de cookies.

➡️ **La nueva landing debe contemplar Eventos, Oro Nacional y Propiedades a la venta como secciones/líneas reales**, y el newsletter con incentivo. Hay que conseguir el contenido actual de turismocolombia.fit (textos, fotos, oferta de helicóptero, artículos de blog) porque no está en este repo.

---

## 1. Estado técnico del proyecto

| Ítem | Estado |
|------|--------|
| Stack | Vite 5 + React 18 + TypeScript + Tailwind 3 + React Router 6 |
| Backend de datos | Supabase (`@supabase/supabase-js`) para auth, perfiles, propiedades, tours, chat, reservas |
| Backend legacy | Carpeta `backend/` — Express + Multer con imágenes subidas a disco (`backend/uploads/`). Aparentemente en desuso; el frontend ya no lo consume salvo compatibilidad histórica |
| `npm install` | ✅ OK (con 30 vulnerabilidades reportadas por npm audit: 1 crítica, 19 altas) |
| `npm run build` | ✅ Compila en ~25s. Bundle único de **1.76 MB** (477 KB gzip) — sin code splitting |
| Repo git | ❌ La carpeta descargada **no es un repo git** (`.git` ausente). Hay que `git init` y reconectar el remoto |
| `.env` | ❌ No existe. Solo `.env.example`. La app **no arranca en dev** sin `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` |
| Deploy | Configurado para Vercel (`vercel.json`, SPA rewrites a `index.html`) |
| Node | v24 local / npm 11 |

### ⚠️ Hallazgo de seguridad crítico
Los scripts de la raíz `find-tour-names.js`, `migrate-images.js` y `migrate-tour-images.js` tienen **hardcodeada la `service_role` key de Supabase** (acceso total, salta RLS) junto con la URL del proyecto `ckgxwrhyjnadbdixzsmq.supabase.co`.

- Esa clave está en el historial de git → **debe rotarse en el dashboard de Supabase cuanto antes**.
- Mover esos scripts a variables de entorno o eliminarlos.
- Añadir `.env`, `*.local` ya están en `.gitignore`; falta ignorar/limpiar estos scripts.

---

## 2. Arquitectura y rutas

`src/App.tsx` monta un router con **~40 rutas**. Providers anidados: `UserProvider` (legacy) → `AuthProvider` → `CartProvider`.

### Rutas públicas relevantes para la landing
| Ruta | Página | Notas |
|------|--------|-------|
| `/` | `HomePage` | La "landing" actual |
| `/properties` | `PropertiesPageDynamic` | Catálogo hospedajes (Supabase) |
| `/tours` | `ToursPageDynamic` | Catálogo tours (Supabase) con filtros por texto/ciudad/dificultad |
| `/property/:id` / `/tour/:id` | Detalle dinámico | Galería + CTA WhatsApp |
| `/nosotros` | `NosotrosPage` | Misión/visión + CEO + galería |
| `/destinations` | `DestinosPage` | 6 destinos + "Oro Nacional" + eventos (data hardcodeada en el archivo) |
| `/blog` | `BlogPage` | 8+ artículos hardcodeados, sin contenido real |

### Áreas que NO son landing (pero pesan en el bundle)
- **Auth**: `/login`, `/registro`, `/perfil`, `/dashboard`, confirmación de correo
- **Carrito / checkout / pagos**: `/cart`, `/checkout`, `/booking/:id`, `/payment/:id`, `/reserva`, `/pago` — múltiples versiones duplicadas (`CheckoutPage` vs `CheckoutPageNew`, `LoginPage` vs `LoginPageNew`, etc.)
- **Admin** (`/admin/*`): dashboard, CRUD de propiedades/tours/usuarios/reservas, **chats** (bandeja + vista + settings)
- Librerías pesadas solo usadas en admin/checkout: `echarts`, `recharts`, `react-big-calendar`, `jspdf`, `html2canvas`, `react-qr-code`, `@googlemaps/react-wrapper`, `nodemailer`, `next` (dependencia fantasma, no se usa)

---

## 3. Inventario de la landing actual (`/` → `HomePage`)

Orden de secciones tal como se renderiza hoy:

1. **Barra de anuncio (ribbon)** — fija arriba, roja: *"Vive Colombia: Tours, Hospedajes y Aventuras Inolvidables"*
2. **Navbar** — fija. Logo + links: Home · Hospedajes · Tours · Nosotros · Destinos · Blog. Botones Iniciar sesión / Registrarse. Carrito. Cambia a avatar + "Panel Admin" si el usuario es admin.
3. **Hero** (`HeroSection`) — fondo con imagen de Pexels (fija, `background-attachment: fixed`), overlay oscuro. Título: *"Encuentra tu próxima estancia"* / subtítulo *"Busca ofertas en hoteles, casas y mucho más en Colombia"*. **`SearchBar`** estilo Booking (destino, check-in, check-out, huéspedes). Altura 65vh.
4. **`PropertiesShowcaseDynamic`** — "Propiedades destacadas" → *"Encuentra alojamientos que enamoran"*. Trae de Supabase `properties` donde `featured=true AND active=true`, límite 6. Grid de `QuickCard`. CTA "Ver todas las propiedades".
5. **Bloque "¿Por qué elegir Colombiaturismo.fit?"** — 3 tarjetas: Mejor Precio Garantizado · Ofertas Exclusivas · Experiencia Local. Texto genérico tipo OTA.
6. **`ToursShowcaseDynamic`** — "Tours destacados" → *"Vive experiencias inolvidables"*. Supabase `tours` `featured=true`, límite 6. Grid de `QuickCard`.
7. **Grid de imágenes de valores** — 4 tarjetas con foto + overlay (Hospitalidad y Servicio · Autenticidad · Planes flexibles · Seguridad del Viajero) + mosaico de 5 fotos grandes de destinos. Puramente decorativo, sin CTA.
8. **`AboutCEOSection`** — foto (`/Ceo.png`) + carta en primera persona de **"Johan, CEO de turismocolombia.fit"**, tono paisa muy personal ("nació de un momento oscuro en mi vida…"). CTA rojo "Leer más" → `/blog`.
9. **Footer** — 4 columnas (Destinos / Compañía / Soporte con enlaces a rutas que **no existen**: `/careers`, `/press`, `/help`, `/faq`, `/terms`, `/privacy`, `/about`…). Selectores de idioma y moneda **no funcionales**. Créditos: *"© 2026 Gabriel Carvajal Colombiaturismo.fit"*.
10. **`WhatsAppButton`** flotante (abajo-derecha) — **NO abre WhatsApp**: abre el `ChatBot` interno.
11. **`WelcomeModal`** — aparece 1s después de cargar (una vez por sesión, `sessionStorage`). Empuja a "Reservar por WhatsApp".
12. **`ParrotOverlay`** — overlay animado de un loro (sprites en `public/sprites/`) sobre el `Background`.

---

## 4. Sistema de datos: inconsistencia clave

Hay **dos fuentes de datos de catálogo que no coinciden**:

| Fuente | Qué es | Quién la usa hoy |
|--------|--------|------------------|
| `src/data/showcases.ts` | **Estático en código**: 14 propiedades + ~42 tours con textos, precios, tags, links de Airbnb/Booking y mensajes de WhatsApp ya redactados | `BlogPage` (import suelto). **NO** lo usan Home, /properties ni /tours |
| Supabase (`properties`, `property_images`, `tours`, `tour_images`) | Tablas dinámicas con `featured`, `active`, `amenities/includes`, `difficulty` | Home, `/properties`, `/tours`, detalles |

➡️ **La Home hoy depende 100% de que Supabase tenga filas con `featured=true`.** Sin credenciales o sin datos sembrados, las secciones de propiedades y tours salen vacías ("No hay … destacados disponibles").

➡️ `showcases.ts` es el activo de contenido más rico y curado que existe: úsalo como fuente de verdad para migrar/sembrar o como fallback.

### Esquema Supabase inferido (por los `select`)
- `properties`: id, name, description, location, city, price_per_night, featured, active, amenities[], created_at → `property_images(image_url, display_order)`
- `tours`: id, name, description, location, city, price, duration, difficulty, featured, active, includes[], created_at → `tour_images(image_url, display_order)`
- `users`: id, email, full_name, phone, document_type, document_number, country, city, avatar_url, **role** (`'admin'`)
- `chat_conversations`: id, user_id, status (`active` / `escalated_to_admin`), bot_stage, collected_data (jsonb), created_at
- `chat_messages`: id, conversation_id, sender_type (`user`/`bot`/`admin`), sender_id, message, metadata, created_at

No hay migraciones SQL en el repo — el esquema vive solo en el proyecto Supabase.

---

## 5. Catálogo de contenido real disponible

### Hospedajes (`showcases.ts`, 14)
Jardín (Cabaña Las Águilas) · Medellín Centro "Opera" (5 variantes: estándar, jacuzzi, semi suite, doble clásica) · Penthouse El Poblado · Jericó rural · Cartagena (Torres del Lago, Penthouse El Laguito, Nuevo Conquistador, Tres Carabelas/El Laguito, Palmettos/Bocagrande) · San Jerónimo rural · Timaná-Huila (Rancho California).
Precios: $120.000–$520.000/noche. Varios con link real de Booking.com o Airbnb.

### Tours (`showcases.ts`, ~42) por zona
- **Cartagena (~24)**: islas y beach clubs (Cholón, Playa Blanca, Barú + Rosario, Tierra Bomba, Palmarito, Isla del Sol, Isla Bela, Isla Encanto, 4 Islas, 5 Islas VIP, Bora Bora, Pao Pao, Luxury Open Bar/Classic), City Tour Chiva, Sibarita Master Cena, Bahía Rumbera. **Nota: varias descripciones están corruptas/con OCR sucio** — necesitan reescritura.
- **Medellín (~9)**: Comuna 13 / Graffiti, City Tour, Centro Histórico + Botero, Parque Arví, Gastronómico, Tour Histórico Pablo Escobar, Parque Explora, Hacienda Nápoles, Guatapé.
- **Jardín (~13)**: Travesías Filo de Oro / Finca Cafetera / Cristo Rey (variantes caminata/transporte/cabalgata), Salto del Ángel, Travesía del Amor, Resguardo Indígena, Gallito de Roca, Tour de café.

### Destinos (`DestinosPage.tsx`, hardcodeado)
Cartagena · Medellín · Jericó · Islas del Rosario · Jardín · San Andrés. Más secciones "Oro Nacional" (café, esmeraldas, biodiversidad, música) y "Eventos" (Feria de las Flores, Carnaval de Barranquilla, Festival Vallenato, Festival de Cine de Cartagena).

### Blog (`BlogPage.tsx`, hardcodeado)
8+ títulos con `summary`, **sin cuerpo de artículo**. Categorías: Destinos, Consejos, Gastronomía.

### Assets (`public/`)
~200 archivos sueltos + 19 subcarpetas por propiedad/tema (`OPERA/`, `CARABELAS/`, `JARDIN/`, `TOURS/`, `backgrounds/`, `penthousemed/`, `sprites/`, `ORO/`…). Nomenclatura muy inconsistente (`IMG-20231225-WA0149.jpg`, `1000235963 (1).jpg`, con espacios y duplicados `(1)`). Logos: `turismo colombia fit logo-02.png` (52 KB) y `turismo colombia fit logo 2.png` (312 KB). Fotos de CEO: `Ceo.png`, `Gabriel.jpg`.

---

## 6. Marca e identidad visual

| Elemento | Valor actual | Problema |
|----------|--------------|----------|
| Nombre | Aparece como "turismocolombia.fit", "Colombiaturismo.fit", "TurismoColombia.Fit", "Turismo Colombia" | **Sin consistencia**. Definir uno canónico |
| Color de marca Tailwind | `primary` = `#00B67A` (verde) | **No se usa casi**. La UI real es azul (`blue-600`) + rojo (`#ff0000`, `red-600`/`red-700`) + acentos amarillo/naranja |
| Tipografías | `Inter` (sans) + `Poppins` (heading) configuradas en Tailwind | **No se cargan**: `index.html` tiene `<link rel="preconnect">` a Google Fonts pero **falta el `<link href>` real de las fuentes** (y hay un `<link rel="stylesheet">` mal apuntando a un PNG) |
| Logo | 2 versiones PNG con nombres con espacios | Optimizar, versión SVG, nombres sin espacios |
| Favicon | `index.html` apunta a `./public/turismo colombia fit logo 2.png` (ruta mal formada para producción) | Corregir |
| Voz de marca | Cercana, paisa, personal, emprendimiento colombiano ("apoya el emprendimiento colombiano", carta del CEO) | Es un **diferenciador fuerte** — conservarlo |
| CEO mostrado | "Johan" en la landing / "Gabriel Carvajal" en el footer / `Gabriel.jpg` + `Ceo.png` | Aclarar quién es la cara pública |
| Contacto | WhatsApp **573145284548** en todos lados (hardcodeado en ~10 archivos). Datos bancarios Bancolombia de ejemplo en `ChatBot` | Centralizar en un config único |
| Idiomas | Selector ES/EN/FR/DE en footer, `<html lang="en">` | Todo el contenido es ES; el selector no hace nada |

---

## 7. Conversión: cómo se captan leads HOY

| Mecanismo | Detalle | Estado |
|-----------|---------|--------|
| **WhatsApp directo** | `wa.me/573145284548` con mensaje pre-redactado por ítem (`buildWhatsapp()`), presente en cada `QuickCard`, detalle, navbar móvil, WelcomeModal, DestinosPage | ✅ Funciona, es el canal principal real |
| **WelcomeModal** | Pop-up a 1s → "Reservar por WhatsApp" | ✅ Funciona (algo intrusivo) |
| **Botón flotante** | Icono de chat → abre `ChatBot`, **no** WhatsApp (nombre `WhatsAppButton` engañoso) | ⚠️ Requiere login para funcionar |
| **ChatBot** (`ChatBot.tsx`) | Bot de reglas por etapas (`greeting → confirming_payment → collecting_payment_info → ready_to_escalate`), guarda en Supabase `chat_conversations`/`chat_messages`, realtime, "escala a asesor" abriendo WhatsApp con un resumen | ⚠️ **Solo si hay `user` logueado** (`if (!user) return`). Sin sesión no hace nada. Datos bancarios de ejemplo |
| **SearchBar del hero** | Envía a `/properties?destination=&checkIn=&checkOut=&guests=` | ⚠️ `PropertiesPageDynamic` **no lee esos query params** para filtrar → la búsqueda es decorativa |
| **Formulario de lead / newsletter** | — | ❌ **No existe** ningún formulario propio de captura (nombre, email, teléfono, fechas, interés) |
| **Analítica / píxel / tag manager** | — | ❌ No hay GA4, Meta Pixel, ni tracking de conversiones |
| **Reservas** | Flujo `/checkout*`, `/booking`, `/payment`, carrito — atado a Supabase + auth. Múltiples versiones. | ⚠️ Complejo, sin pasarela real integrada (Mercado Pago "próximamente" en `.env.example`) |

➡️ Para la nueva landing con **CRM propio (por construir)**: el punto de integración natural es un **formulario de lead/reserva** que hoy no existe, más los clics de WhatsApp como eventos. El `ChatBot` y el flujo de reservas de Supabase son los candidatos a migrar al CRM.

---

## 8. SEO / metadata / rendimiento

- `index.html`: `<title>TurismoColombia.Fit</title>`, `lang="en"`, **sin** `<meta name="description">`, sin Open Graph, sin Twitter Card, sin favicon válido, sin `canonical`, sin JSON-LD.
- SPA sin SSR/prerender → primer render depende de JS; mal para SEO de una landing.
- Bundle 1.76 MB sin split; imágenes sin optimizar (varias `.png` de fotos, `.jpg` de MB), sin `loading="lazy"` explícito ni `srcset`.
- `background-attachment: fixed` en el hero → jank en móvil.
- No hay `sitemap.xml` ni `robots.txt`.

---

## 9. Deuda técnica y bugs concretos

1. **Duplicación de páginas**: `LoginPage`/`LoginPageNew`, `SignupPage`/`SignupPageNew`, `ProfilePage`/`ProfilePageNew`, `CheckoutPage`/`CheckoutPageNew`, `PropertiesPage`/`PropertiesPageDynamic`, `ToursPage`/`ToursPageDynamic`, `PropertiesShowcase`/`PropertiesShowcaseDynamic`, dos `UserContext` (`context/` y `components/`). El `ESTRUCTURA_PROYECTO.md` describe una versión "limpia" que ya no coincide con el código.
2. **`showcases.ts` huérfano** respecto a la Home (ver §4).
3. **SearchBar sin efecto real** (ver §7).
4. **`ChatBot` inaccesible sin login** (ver §7).
5. **Footer con ~12 enlaces rotos** a rutas inexistentes.
6. **Fuentes no cargan**; `<link rel="stylesheet">` apuntando a un PNG en `index.html`.
7. **`NosotrosPage.tsx`** empieza con comentarios `//` sueltos antes de imports y no importa `React` (compila por el JSX runtime, pero es frágil).
8. **`next` en dependencies** sin usarse → +peso de instalación.
9. **30 vulnerabilidades npm** (1 crítica).
10. **`WhatsAppButton`** mal nombrado (abre chat, no WhatsApp).
11. **`AboutCEOSection`** usa `src="../Ceo.png"` (ruta relativa) en vez de `/Ceo.png`.
12. Textos de tours con **OCR corrupto** en `showcases.ts` (Cartagena sobre todo).
13. Sin manejo de estado de error/empty consistente; `loading` sin `finally` en algún caso.
14. `service_role` key filtrada (ver §1).

---

## 10. Lo que hay que decidir para la nueva landing

| Decisión | Opciones | Nota |
|----------|----------|------|
| **Nombre/dominio canónico** | `turismocolombia.fit` (dominio) — ¿marca "Turismo Colombia"? | Unificar en todo el sitio |
| **Alcance de la nueva landing** | ¿Solo `/` rediseñada? ¿O nueva IA completa (home + catálogo + destino + nosotros)? | El usuario pidió "captar leads y reservas" |
| **Rol de Supabase** | ✅ Confirmado: se mantiene para **auth + catálogo**; chat y reservas → **CRM propio** | Definir contrato de datos con el CRM |
| **CRM propio** | Por construir. ¿Stack? ¿API REST/webhooks? ¿Dónde vive (mismo repo, servicio aparte)? | Diseñar el endpoint de ingreso de leads primero |
| **Fuente de catálogo** | ¿Migrar `showcases.ts` → Supabase (seed) y usar solo Supabase? ¿O `showcases.ts` como fallback? | Recomendado: seed a Supabase + script idempotente |
| **Identidad visual** | ¿Se mantiene azul/rojo o se rediseña la paleta? ¿Verde `#00B67A` era la intención? | Definir design tokens |
| **Reservas** | ¿La landing hace pre-reserva (lead cualificado) y el cierre es por asesor/CRM? ¿O checkout real con pasarela (Mercado Pago / Wompi / PayU)? | Impacta mucho el alcance |
| **Idiomas** | ¿ES only por ahora? ¿i18n a futuro? | Quitar selector falso mientras tanto |
| **Limpieza** | ¿Podamos admin/checkout legacy del bundle de la landing (lazy-load / repo aparte)? | Mejora peso y foco |

---

## 11. Recomendación de estructura para la nueva landing (borrador)

Enfocada a conversión (lead + reserva), conservando la voz de marca colombiana:

1. **Header** minimal: logo, navegación corta (Hospedajes · Tours · Destinos · Nosotros), botón WhatsApp visible, CTA "Reservar".
2. **Hero** con propuesta de valor real y específica (no "Encuentra tu próxima estancia" genérico) + **formulario corto de lead** (destino/interés, fechas aprox., nº personas, nombre, WhatsApp) → envía al **CRM**. Foto propia, no Pexels.
3. **Prueba social / confianza**: reseñas, nº de viajeros, "reserva directa sin comisiones", logos Booking/Airbnb donde aplique, sellos.
4. **Catálogo destacado**: hospedajes + tours top (de Supabase), tarjetas con CTA doble: "Reservar" (→ formulario/CRM) y "WhatsApp".
5. **Cómo funciona** en 3 pasos (elige → te asesora un local → confirmas por WhatsApp/CRM).
6. **Destinos** (Cartagena, Medellín, Jardín, Jericó, Rosario…) como puertas de entrada.
7. **Historia del CEO / marca** (el activo diferencial ya escrito) — versión corta con enlace a Nosotros.
8. **FAQ** (pagos, cancelación, qué incluye) — resuelve objeciones antes del lead.
9. **CTA final** + footer real (enlaces que existan, contacto, redes reales, legales mínimos: términos, privacidad).
10. **Instrumentación**: GA4 + Meta Pixel + eventos (lead enviado, clic WhatsApp, ver detalle) desde el día 1.

### Puntos de integración con el CRM (por construir)
- `POST /leads` — payload: `{ nombre, whatsapp, email?, interes (hospedaje|tour|destino|general), item_id?, fechas?, personas?, origen (utm...), mensaje? }`
- Webhook/entrada para conversaciones de chat (reemplazo de `chat_conversations`/`chat_messages`).
- Estado de reserva consultable (reemplazo del flujo `/checkout*` + `/booking`).
- Mientras el CRM no exista: guardar leads en una tabla `leads` de Supabase y/o enviar a WhatsApp, para no perder el contacto.

---

## 12. Primeros pasos sugeridos (no ejecutados aún)

1. **Rotar la `service_role` key** de Supabase y sacar las claves de los scripts `.js` de la raíz.
2. `git init` + reconectar remoto + primer commit del estado actual.
3. Crear `.env` con las credenciales reales de Supabase (o pedirlas) para poder correr `npm run dev`.
4. Sembrar Supabase con el contenido de `showcases.ts` (script idempotente) **o** decidir la fuente única.
5. Definir el nombre canónico, los design tokens y cargar bien las fuentes.
6. Diseñar el contrato `POST /leads` del CRM y montar un fallback (tabla `leads` en Supabase).
7. Maquetar la nueva `/` según §11 en una rama/ruta nueva sin romper la actual.

---

*Generado como insumo para el rediseño. Cualquier dato del esquema Supabase está inferido del código, no verificado contra la base real.*
