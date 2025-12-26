import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Supabase
const SUPABASE_URL = 'https://ckgxwrhyjnadbdixzsmq.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZ3h3cmh5am5hZGJkaXh6c21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjQ1OTgwMywiZXhwIjoyMDgyMDM1ODAzfQ.wrFybbLZjGJgT1_-vmKayEp2wTJlIpU7TOwtPNBqm8o'; // Usa la service_role key para bypass RLS

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Mapeo de archivos de imagen a nombres de tours en la BD
const TOUR_IMAGE_MAPPING = {
  // CARTAGENA
  'ISLA CHOLON.png': 'ISLA CHOLON',
  'PLAYA BLANCA.png': 'PLAYA BLANCA',
  'BARU + ISLAS DEL ROSARIO.png': 'BARU + ISLAS DEL ROSARIO',
  'ISLA TIERRA BOMBA (FRENTE A LA CIUDAD).png': 'ISLA TIERRA BOMBA (Frente a la ciudad)',
  'PALMARITO BEACH (ISLA TIERRA BOMBA).png': 'PALMARITO BEACH (Isla Tierra Bomba)',
  'PLAYA BLANCA + PLANCTON.png': 'PLAYA BLANCA + PLANCTON',
  'PLAYA TRANQUILA.png': 'PLAYA TRANQUILA',
  'PLAYA BLANCA AVIARIO.png': 'PLAYA BLANCA + AVIARIO',
  'TOUR 4 ISLAS.png': 'TOUR 4 ISLAS',
  'ISLA BELA.png': 'ISLA BELA',
  'ISLA DEL SOL.png': 'ISLA DEL SOL',
  'ISLA DEL SOL 2.png': 'ISLA DEL SOL', // Segunda imagen del mismo tour
  'ISLA DEL ENCANTO.png': 'ISLA DEL ENCANTO',
  'CITY TOURS CHIVA.png': 'CITY TOURS CHIVA',
  'TOUR 5 ISLAS - VIP DEPORTIVO.png': 'TOUR 5 ISLAS - VIP DEPORTIVO',
  'BORA BORA BECH CLUB.png': 'BORA BORA BEACH CLUB',
  'BORA BORA V.I.P.png': 'BORA BORA V.I.P',
  'PAO PAO BEACH CLUB.png': 'PAO PAO BEACH CLUB',
  'LUXURY OPEN BAR.png': 'LUXURY OPEN BAR',
  'LUXURY CLASSIC.png': 'LUXURY CLASSIC',
  'SIBARITA MASTER CENA.png': 'SIBARITA MASTER CENA',
  'BAHIA RUMBERA (EN BOTE DEPORTIVO).png': 'BAHÍA RUMBERA (en bote deportivo)',
  
  // MEDELLÍN
  'TOUR MEDELLIN.png': 'Tour por la Ciudad de Medellín',
  'TOUR HACIENDA NAPOLES.png': 'Tour por la Hacienda Nápoles',
  'GUATAPE.png': 'Tour por Guatapé, Antioquia',
  
  // JARDÍN
  'TRAVESIA FILO DE ORO - CAMINATA.png': 'Travesía Filo de Oro | Caminata',
  'TRAVESIA FILO DE ORO - TRANSPORTE.png': 'Travesía Filo de Oro | Transporte',
  'TRAVESIA FILO DE ORO - CABALGATA.png': 'Travesía Filo de Oro | Cabalgata',
  'TRAVESIA FINCA CAFETERA - TRANSPORTE.png': 'Travesía Finca Cafetera | Transporte',
  'TRAVESIA FINCA CAFETERA - CABALGATA.png': 'Travesía Finca Cafetera | Cabalgata',
  'TRAVESIA SALTO DEL ANGEL.png': 'Travesía Salto del Ángel',
  'TRAVESIA CRISTO REY - CAMINATA.png': 'Travesía Cristo Rey | Caminata',
  'TRAVESIA CRISTO REY - TRANSPORTE.png': 'Travesía Cristo Rey | Transporte',
  'TRAVESIA CRISTO REY - CABALGATA.png': 'Travesía Cristo Rey | Cabalgata',
  'TRAVESIA DEL AMOR.png': 'Travesía del Amor',
  'TRAVESIA RESGUARDO INDIGENA.png': 'Travesía Resguardo Indígena',
  'TRAVESIA GALLITO DE ROCA.png': 'Travesía Gallito de Roca'
};

async function uploadTourImage(tourId, imagePath, displayOrder) {
  try {
    console.log(`Uploading image: ${imagePath}`);
    
    // Leer el archivo
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    const fileExt = path.extname(fileName);
    
    // Crear nombre único para el archivo
    const timestamp = Date.now();
    const storagePath = `${tourId}/${timestamp}-${displayOrder}${fileExt}`;
    
    // Subir a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tour-images')
      .upload(storagePath, fileBuffer, {
        contentType: `image/${fileExt.substring(1)}`,
        upsert: false
      });
    
    if (uploadError) {
      console.error(`Error uploading ${fileName}:`, uploadError);
      return false;
    }
    
    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('tour-images')
      .getPublicUrl(storagePath);
    
    const imageUrl = urlData.publicUrl;
    
    // Insertar registro en tour_images
    const { error: dbError } = await supabase
      .from('tour_images')
      .insert({
        tour_id: tourId,
        image_url: imageUrl,
        display_order: displayOrder
      });
    
    if (dbError) {
      console.error(`Error inserting DB record for ${fileName}:`, dbError);
      return false;
    }
    
    console.log(`✓ Successfully uploaded: ${fileName} -> ${imageUrl}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
    return false;
  }
}

async function migrateTourImages() {
  console.log('Starting tour images migration...\n');
  
  const toursFolder = path.join(__dirname, 'public', 'TOURS');
  
  // Verificar que existe la carpeta
  if (!fs.existsSync(toursFolder)) {
    console.error(`Tours folder not found: ${toursFolder}`);
    return;
  }
  
  // Obtener todos los tours de la BD
  const { data: tours, error: toursError } = await supabase
    .from('tours')
    .select('id, name');
  
  if (toursError) {
    console.error('Error fetching tours:', toursError);
    return;
  }
  
  console.log(`Found ${tours.length} tours in database\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  // Procesar cada imagen
  for (const [imageFile, tourName] of Object.entries(TOUR_IMAGE_MAPPING)) {
    const imagePath = path.join(toursFolder, imageFile);
    
    // Verificar que existe la imagen
    if (!fs.existsSync(imagePath)) {
      console.warn(`⚠ Image not found: ${imageFile}`);
      errorCount++;
      continue;
    }
    
    // Encontrar el tour correspondiente
    const tour = tours.find(t => t.name === tourName);
    
    if (!tour) {
      console.warn(`⚠ Tour not found in DB: ${tourName}`);
      errorCount++;
      continue;
    }
    
    // Verificar cuántas imágenes ya tiene este tour
    const { data: existingImages } = await supabase
      .from('tour_images')
      .select('display_order')
      .eq('tour_id', tour.id)
      .order('display_order', { ascending: false })
      .limit(1);
    
    const nextDisplayOrder = existingImages && existingImages.length > 0 
      ? existingImages[0].display_order + 1 
      : 0;
    
    // Subir imagen
    const success = await uploadTourImage(tour.id, imagePath, nextDisplayOrder);
    
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Pequeña pausa para no saturar la API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n=================================');
  console.log('Tour images migration completed!');
  console.log(`✓ Successful: ${successCount}`);
  console.log(`✗ Errors: ${errorCount}`);
  console.log('=================================');
}

// Ejecutar migración
migrateTourImages().catch(console.error);
