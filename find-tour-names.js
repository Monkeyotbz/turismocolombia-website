import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ckgxwrhyjnadbdixzsmq.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZ3h3cmh5am5hZGJkaXh6c21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjQ1OTgwMywiZXhwIjoyMDgyMDM1ODAzfQ.wrFybbLZjGJgT1_-vmKayEp2wTJlIpU7TOwtPNBqm8o';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function findTours() {
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, name, city')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== TODOS LOS TOURS EN LA BASE DE DATOS ===\n');
  tours.forEach((tour, index) => {
    console.log(`${index + 1}. "${tour.name}" (${tour.city})`);
  });
  console.log(`\nTotal: ${tours.length} tours\n`);
  
  // Buscar tours específicos que no se encontraron
  const searchTerms = [
    'CHOLON', 'PLAYA BLANCA', 'BARU', 'TIERRA BOMBA', 
    'PALMARITO', 'PLANCTON', 'TRANQUILA', 'AVIARIO',
    '4 ISLAS', 'BELA', 'BORA', 'GUATAPE'
  ];
  
  console.log('\n=== TOURS QUE COINCIDEN CON LOS NO ENCONTRADOS ===\n');
  searchTerms.forEach(term => {
    const matches = tours.filter(t => t.name.toUpperCase().includes(term));
    if (matches.length > 0) {
      console.log(`\nBúsqueda: "${term}"`);
      matches.forEach(m => console.log(`  → "${m.name}"`));
    }
  });
}

findTours();
