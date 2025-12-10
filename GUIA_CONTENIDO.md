# 🏡 Sistema de Gestión de Contenido - Turismo Colombia

## Cómo Agregar Propiedades y Tours

**Solo necesitas editar UN archivo:** `src/data/showcases.ts`

### Estructura de Datos

Cada propiedad o tour sigue este formato:

```typescript
{
  id: 'identificador-unico',
  name: 'Nombre de la propiedad/tour',
  location: 'Ciudad o zona',
  description: 'Descripción detallada del alojamiento/experiencia',
  image: '/ruta/de/imagen.jpg',
  priceLabel: 'Desde $XXX / noche o persona',
  whatsapp: buildWhatsapp('Mensaje personalizado para WhatsApp'),
  booking: 'https://www.booking.com/...', // Opcional
  tags: ['Característica 1', 'Característica 2', 'Característica 3']
}
```

### Pasos para Agregar una Propiedad

1. **Abre el archivo** `src/data/showcases.ts`

2. **Agrega tu propiedad** en el array `quickProperties`:

```typescript
export const quickProperties: ShowcaseItem[] = [
  // Propiedades existentes...
  
  {
    id: 'santa-marta-villa',
    name: 'Villa Frente al Caribe - Santa Marta',
    location: 'Santa Marta, Magdalena',
    description: 'Villa de lujo con piscina privada, vista al mar y acceso directo a playa. Ideal para familia.',
    image: '/SantaMarta1.jpg',
    priceLabel: 'Desde $500.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar la villa en Santa Marta'),
    booking: 'https://www.booking.com/...',
    tags: ['8 huespedes', 'Piscina privada', 'Vista al mar', 'Chef disponible']
  }
];
```

### Pasos para Agregar un Tour

1. **Abre el archivo** `src/data/showcases.ts`

2. **Agrega tu tour** en el array `quickTours`:

```typescript
export const quickTours: ShowcaseItem[] = [
  // Tours existentes...
  
  {
    id: 'tayrona-3-days',
    name: 'Tayrona + Ciudad Perdida 3 días',
    location: 'Parque Tayrona, Santa Marta',
    description: 'Expedición de 3 días: Day 1 Tayrona, Day 2 senderismo Ciudad Perdida, Day 3 relax playas.',
    image: '/Tayrona.jpg',
    priceLabel: 'Desde $400.000 / persona',
    whatsapp: buildWhatsapp('Hola, quiero reservar el tour Tayrona 3 días'),
    booking: 'https://www.booking.com/...',
    tags: ['Transporte incluido', 'Guía experto', 'Almuerzo y cena', 'Camping']
  }
];
```

---

## Cómo Funcionan las Páginas

### 🏠 Página de Inicio (`/`)
- Muestra **hasta 6 propiedades** de `quickProperties`
- Muestra **hasta 4 tours** de `quickTours`
- Botones "Ver más" llevan a `/properties` y `/tours`

### 🏘️ Página de Propiedades (`/properties`)
- Lista **todas** las propiedades
- Cada tarjeta clickeable lleva a `/property/[id]`
- Filtro por tipo de alojamiento (opcional)

### ✈️ Página de Tours (`/tours`)
- Lista **todos** los tours
- Cada tarjeta clickeable lleva a `/tour/[id]`

### 📄 Página de Detalle de Propiedad (`/property/[id]`)
- Galería de imágenes con navegación
- Descripción completa
- Botones de WhatsApp y Booking
- Características en estilo premium

### 🎯 Página de Detalle de Tour (`/tour/[id]`)
- Galería de imágenes
- Información de duración y tamaño del grupo
- Descripción y qué está incluido
- Botones de reserva

---

## Campos Opcionales

| Campo | Requerido | Ejemplo |
|-------|-----------|---------|
| `id` | ✅ Sí | `'santa-marta-villa'` |
| `name` | ✅ Sí | `'Villa Frente al Caribe'` |
| `location` | ✅ Sí | `'Santa Marta, Magdalena'` |
| `description` | ✅ Sí | `'Villa de lujo con piscina...'` |
| `image` | ✅ Sí | `'/SantaMarta1.jpg'` |
| `priceLabel` | ✅ Sí | `'Desde $500.000 / noche'` |
| `whatsapp` | ✅ Sí | `buildWhatsapp('Hola, quiero...')` |
| `booking` | ❌ No | `'https://www.booking.com/...'` |
| `tags` | ❌ No | `['Piscina', 'WiFi', 'Desayuno']` |

---

## ⚠️ Importante

1. **Cada `id` debe ser único** - no puede repetirse
2. **Las imágenes deben estar en `public/`** - usa rutas relativas como `/nombre-imagen.jpg`
3. **`buildWhatsapp()` es la función** para generar links de WhatsApp automáticamente
4. Guarda y los cambios se actualizan automáticamente (HMR)

---

## Ejemplos de Mensajes WhatsApp

```typescript
// Propiedad
whatsapp: buildWhatsapp('Hola, quiero reservar la villa en Santa Marta del 15 al 20 de diciembre')

// Tour
whatsapp: buildWhatsapp('Hola, quiero agendar el tour Tayrona para 4 personas el próximo fin de semana')

// Genérico
whatsapp: buildWhatsapp('Hola, quiero más información sobre esta propiedad')
```

---

## Estructura de Carpetas de Imágenes

Coloca tus imágenes en:
```
public/
  ├── SantaMarta1.jpg
  ├── Tayrona.jpg
  ├── VistaAlMar.jpg
  └── ... (todas tus imágenes)
```

Luego referencia como: `image: '/SantaMarta1.jpg'`

---

## ¡Listo! 🎉

**Solo eso** - edita `src/data/showcases.ts` y tu sitio se actualiza automáticamente.
