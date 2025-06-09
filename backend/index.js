const express = require('express');
const cors = require('cors');
const propertiesRoutes = require('./routes/properties');

const app = express();
app.use(express.json());

// Configura CORS para todos tus frontends
app.use(cors({
  origin: [
    'http://localhost:5174',
    'http://localhost:5173'
    // agrega más si tienes más apps
  ]
}));

// Carpeta para archivos estáticos (imágenes)
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/properties', propertiesRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});