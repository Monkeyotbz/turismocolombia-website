# 🚀 Sistema de Contenido - Referencia Rápida

## ¿Dónde están mis datos?

**Archivo único de edición:** `src/data/showcases.ts`

```typescript
export const quickProperties: ShowcaseItem[] = [
  {
    id: 'identificador-único',
    name: 'Nombre de la propiedad',
    location: 'Ciudad, Departamento',
    description: 'Descripción detallada...',
    image: '/NombreImagen.jpg',
    priceLabel: 'Desde $XXX / noche',
    whatsapp: buildWhatsapp('Mensaje personalizado'),
    booking: 'https://...',  // Opcional
    tags: ['Característica 1', 'Característica 2']
  }
];

export const quickTours: ShowcaseItem[] = [
  // Mismo formato que propiedades
];
```

---

## 📍 Dónde Aparecen mis Datos

| Página | Ruta | Fuente | Cantidad |
|--------|------|--------|----------|
| Homepage - Propiedades | `/` | `quickProperties` | 6 primeras |
| Homepage - Tours | `/` | `quickTours` | 4 primeras |
| Todas las Propiedades | `/properties` | `quickProperties` | Todas |
| Todos los Tours | `/tours` | `quickTours` | Todos |
| Detalle Propiedad | `/property/:id` | `quickProperties` (por ID) | 1 completa |
| Detalle Tour | `/tour/:id` | `quickTours` (por ID) | 1 completa |

---

## 🎨 Componentes Relacionados

**Donde se usan tus datos:**
- `src/components/PropertiesShowcase.tsx` - Muestra propiedades en homepage
- `src/components/ToursShowcase.tsx` - Muestra tours en homepage
- `src/components/QuickCard.tsx` - Tarjeta reutilizable para propiedad/tour
- `src/components/PropertyDetail.tsx` - Detalle expandido de propiedad
- `src/components/TourDetail.tsx` - Detalle expandido de tour

---

## 🔗 Flujo de Navegación

```
Homepage (/)
├─ [Propiedades Inicio] → Ver más → TodasLasPropiedades (/properties)
│   └─ Click tarjeta → Detalle (/property/:id)
│
└─ [Tours Inicio] → Ver más → TodosLosTours (/tours)
    └─ Click tarjeta → Detalle (/tour/:id)
```

---

## 💡 Tips

1. **IDs únicos** - Cada propiedad/tour debe tener `id` diferente
2. **Imágenes** - Guarda en `public/` y referencia como `/nombreImagen.jpg`
3. **WhatsApp** - Usa `buildWhatsapp('Tu mensaje')` para generar links automáticamente
4. **Cambios** - Guarda el archivo y los cambios aparecen inmediatamente (HMR)
5. **Tags** - Aparecen como características en tarjetas y detalle

---

## 📋 Template para Copiar-Pegar

### Propiedad

```typescript
{
  id: 'slug-corto-ciudad',
  name: 'Nombre Descriptivo',
  location: 'Ciudad, Departamento',
  description: 'Descripción de 1-2 líneas que venda la experiencia.',
  image: '/Imagen.jpg',
  priceLabel: 'Desde $XXX.000 / noche',
  whatsapp: buildWhatsapp('Hola, quiero reservar [nombre] para [fechas]'),
  booking: 'https://booking.com/...',
  tags: ['Característica 1', 'Característica 2', 'Característica 3']
}
```

### Tour

```typescript
{
  id: 'tour-slug-ciudad',
  name: 'Nombre del Tour',
  location: 'Salida desde Ciudad o Destino',
  description: 'Qué incluye y por qué es especial.',
  image: '/TourImage.jpg',
  priceLabel: 'Desde $XX.000 / persona',
  whatsapp: buildWhatsapp('Hola, quiero agendar el tour [nombre] para [fecha]'),
  booking: 'https://booking.com/...',
  tags: ['Transporte', 'Guía', 'Almuerzo', 'Actividad 1']
}
```

---

## ❌ Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Tarjeta no clickeable | Falta `id` | Agrega `id: 'algo-unico'` |
| Imagen no aparece | Ruta incorrecta | Usa `/NombreExacto.jpg` desde `public/` |
| WhatsApp no funciona | URL mal formada | Usa `buildWhatsapp('texto')` |
| Duplicado en homepage | `id` repetido | Verifica que cada `id` sea único |

---

**Preguntas frecuentes:** Ver `GUIA_CONTENIDO.md` para más detalles.
