require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint de prueba
app.get('/api/hello', (req, res) => {
  res.json({ message: '¡Backend funcionando!' });
});

// Endpoint para registrar usuarios
app.post('/api/signup', async (req, res) => {
  const { nombre, email, password, telefono, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios.' });
  }

  try {
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO usuarios (nombre, email, password, telefono, rol, fecha_registro) VALUES ($1, $2, $3, $4, $5, NOW())',
      [nombre, email, hashedPassword, telefono || null, rol || 'usuario']
    );

    // Genera un token de confirmación
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Enlace de confirmación (ajusta la URL a tu frontend)
    const confirmUrl = `http://localhost:5173/confirmar-correo?token=${token}`;

    // Envía el correo
    await transporter.sendMail({
      from: `"ColombiaTurismo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Confirma tu correo electrónico',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Confirma tu correo</title>
          </head>
          <body style="background: #f6f6f6; padding: 24px;">
            <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px; font-family: Arial, sans-serif;">
              <div style="text-align: center; margin-bottom: 24px;">
                <img 
                  src="https://turismocolombiafit.vercel.app/turismo%20colombia%20fit%20logo-02.png" 
                  alt="Turismocolombia" 
                  style="max-width: 180px; margin-bottom: 16px;" 
                />
              </div>
              <h2 style="color: #bd0000; text-align: center; margin-bottom: 12px;">¡Confirma tu correo!</h2>
              <p style="text-align: center; color: #333; font-size: 16px;">
                Confirma tu email para recibir un <b>10% de descuento</b> en tu primera reservación en <b>Turismocolombia</b>.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${confirmUrl}" style="background: #bd0000; color: #fff; padding: 14px 32px; border-radius: 8px; font-size: 18px; text-decoration: none; font-weight: bold;">
                  Confirmar mi email
                </a>
              </div>
              <p style="text-align: center; color: #888; font-size: 13px;">
                Si no creaste una cuenta, puedes ignorar este mensaje.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente. Revisa tu correo para confirmar tu cuenta.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

// Endpoint para confirmar correo
app.get('/api/confirmar-correo', async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    console.log('Email decodificado:', email);

    // Marca el usuario como confirmado
    const result = await pool.query('UPDATE usuarios SET confirmado = true WHERE email = $1', [email]);
    console.log('Filas afectadas:', result.rowCount);

    if (result.rowCount === 0) {
      return res.status(400).send('No se encontró el usuario para confirmar.');
    }

    res.send('¡Correo confirmado correctamente! Ya puedes iniciar sesión.');
  } catch (error) {
    res.status(400).send('Enlace inválido o expirado.');
  }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    if (!user.confirmado) {
      return res.status(403).json({ message: 'Debes confirmar tu correo electrónico antes de iniciar sesión.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Puedes generar un token JWT aquí si lo necesitas
    res.json({ user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
});

// Endpoint para obtener todas las propiedades
app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({ message: 'Error al obtener propiedades' });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Servidor backend escuchando en el puerto', process.env.PORT || 5000);
});