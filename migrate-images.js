// Script para migrar imágenes locales a Supabase Storage
// Ejecutar con: node migrate-images.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Supabase (reemplaza con tus valores)
const SUPABASE_URL = 'https://ckgxwrhyjnadbdixzsmq.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZ3h3cmh5am5hZGJkaXh6c21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjQ1OTgwMywiZXhwIjoyMDgyMDM1ODAzfQ.wrFybbLZjGJgT1_-vmKayEp2wTJlIpU7TOwtPNBqm8o'; // Usa la service_role key para bypass RLS

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Mapeo de carpetas a nombres de propiedades
const PROPERTY_FOLDERS = {
  'JARDIN': 'Cabaña Las Águilas',
  'OPERA': 'Hotel Opera Medellín Centro Only Adults',
  'OPERA JACUZZI': 'Hotel Medellín Opera Habitación con Jacuzzi',
  'OPERA SEMI SUITE': 'Hotel Opera Medellín Habitación Semi Suite',
  'OPERA DOBLE CLASICA': 'Hotel Medellín Opera Habitación Doble Clásica',
  'penthousemed': 'Penthouse Panorama Medellín',
  'JERICO': 'Hospedaje Rural Jericó',
  'ELLAGUITO': 'Hospedaje Delux Cartagena',
  'CARABELAS': 'Hospedajes Penthouse Cartagena El Laguito',
  'TORRESDELLAGO': 'Hospedaje Cartagena Turismocolombia',
  'ORO': 'Hospedajes Cartagena Tours El Laguito',
  'NUEVO CONQUISTADOR': 'Hoteles Cartagena Bocagrande',
  'SAN JERONIMO': 'Alojamiento Rural San Jerónimo',
  'PITALITO': 'Turismo Rural, Rancho California',
  'PALMETTOS': 'Hospedaje Palmettos Cartagena' // Si existe
};

async function getPropertyIdByName(propertyName) {
  const { data, error } = await supabase
    .from('properties')
    .select('id')
    .eq('name', propertyName)
    .single();

  if (error) {
    console.error(`Error buscando propiedad "${propertyName}":`, error);
    return null;
  }
  return data?.id;
}

async function uploadImage(filePath, propertyId, displayOrder) {
  try {
    // Leer el archivo
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const fileExt = path.extname(fileName);
    
    // Generar nombre único para el storage
    const storageFileName = `${propertyId}/${Date.now()}-${displayOrder}${fileExt}`;

    console.log(`  📤 Subiendo: ${fileName}`);

    // Subir a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(storageFileName, fileBuffer, {
        contentType: `image/${fileExt.replace('.', '')}`,
        upsert: false
      });

    if (uploadError) {
      console.error(`  ❌ Error subiendo ${fileName}:`, uploadError.message);
      return null;
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(storageFileName);

    // Guardar en la base de datos
    const { data: imageData, error: dbError } = await supabase
      .from('property_images')
      .insert({
        property_id: propertyId,
        image_url: publicUrl,
        display_order: displayOrder
      })
      .select()
      .single();

    if (dbError) {
      console.error(`  ❌ Error guardando en DB:`, dbError.message);
      return null;
    }

    console.log(`  ✅ Subida exitosa: ${fileName}`);
    return imageData;

  } catch (error) {
    console.error(`  ❌ Error procesando imagen:`, error.message);
    return null;
  }
}

async function migratePropertyImages(folderName, propertyName) {
  console.log(`\n🏠 Procesando: ${propertyName}`);
  
  const propertyId = await getPropertyIdByName(propertyName);
  if (!propertyId) {
    console.log(`  ⚠️  Propiedad no encontrada en la base de datos, saltando...`);
    return;
  }

  const folderPath = path.join(__dirname, 'public', folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`  ⚠️  Carpeta no encontrada: ${folderPath}`);
    return;
  }

  // Leer archivos de la carpeta
  const files = fs.readdirSync(folderPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    })
    .sort(); // Ordenar alfabéticamente

  console.log(`  📁 Encontradas ${files.length} imágenes`);

  let successCount = 0;
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(folderPath, files[i]);
    const result = await uploadImage(filePath, propertyId, i);
    if (result) successCount++;
    
    // Pequeña pausa para no sobrecargar Supabase
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`  ✨ Completado: ${successCount}/${files.length} imágenes subidas`);
}

async function main() {
  console.log('🚀 Iniciando migración de imágenes a Supabase Storage\n');
  console.log('⚠️  IMPORTANTE: Asegúrate de haber configurado tu SUPABASE_URL y SUPABASE_SERVICE_KEY\n');

  for (const [folderName, propertyName] of Object.entries(PROPERTY_FOLDERS)) {
    await migratePropertyImages(folderName, propertyName);
  }

  console.log('\n✅ Migración completada!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Verifica en Supabase Storage que las imágenes se subieron correctamente');
  console.log('2. Revisa en la tabla property_images que los registros estén vinculados');
  console.log('3. Prueba la aplicación para ver las imágenes en AdminProperties');
}

main().catch(console.error);
