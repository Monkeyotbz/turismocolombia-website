import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useLocale } from '../../lib/locale';
import {
  getFeaturedTours,
  getFeaturedAccommodations,
  getFeaturedDestinations,
  getFeaturedTestimonials,
  type TourWithMedia,
  type StayWithMedia,
  type DestinationWithMedia,
} from '../../lib/queries';
import type { Row } from '../../lib/supabase';
import { heroSlidesSorted } from '../../data/heroSlides';
import { useLeadDialog } from '../LeadDialog';
import { Container, Button, Eyebrow } from '../ui';
import { Rail, ExperienceCard, StayCard, DestinationTile } from '../cards';
import NewsletterBand from '../NewsletterBand';

const CATEGORIES = [
  { es: 'Islas y playas', en: 'Islands & beaches' },
  { es: 'Café de origen', en: 'Origin coffee' },
  { es: 'Ciudad y cultura', en: 'City & culture' },
  { es: 'Aventura y naturaleza', en: 'Adventure & nature' },
  { es: 'Gastronomía', en: 'Food' },
  { es: 'Pueblos patrimonio', en: 'Heritage towns' },
];

export default function HomePage() {
  const { locale, t } = useLocale();
  const { open } = useLeadDialog();
  const es = locale === 'es';
  const [tours, setTours] = useState<TourWithMedia[]>([]);
  const [stays, setStays] = useState<StayWithMedia[]>([]);
  const [dests, setDests] = useState<DestinationWithMedia[]>([]);
  const [testis, setTestis] = useState<Row<'testimonials'>[]>([]);

  useEffect(() => {
    getFeaturedTours(8).then(setTours);
    getFeaturedAccommodations(4).then(setStays);
    getFeaturedDestinations(6).then(setDests);
    getFeaturedTestimonials(3).then(setTestis);
  }, []);

  const slide = heroSlidesSorted()[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[560px] overflow-hidden bg-azul-deep sm:h-[620px]">
        {slide && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: 'scale(1.28)', transformOrigin: 'left top' }}
            autoPlay
            muted
            loop
            playsInline
            poster={`/slides/${slide.file}.jpg`}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = 0.55;
            }}
          >
            <source src={`/slides/${slide.file}.webm`} type="video/webm" />
            <source src={`/slides/${slide.file}.mp4`} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/70" />
        <Container className="relative flex h-full flex-col justify-center">
          <div className="max-w-2xl">
            <Eyebrow dark>{es ? 'Colombia, de la mano de quien la vive' : 'Colombia, guided by locals'}</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-[#FCFAF4] sm:text-6xl">
              {es ? 'Viví la Colombia que no sale en los folletos' : "Experience the Colombia guidebooks miss"}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#E9E4D8]">
              {es
                ? 'Tours, hospedajes y experiencias con anfitriones locales. Vos elegís, un asesor de la región te arma el plan.'
                : 'Tours, stays and experiences with local hosts. You choose, a regional advisor builds the plan.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => open()}>
                {es ? 'Armar mi viaje' : 'Plan my trip'}
              </Button>
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
                {es ? 'Ver experiencias' : 'Browse experiences'}
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-[#E4DFD2]">
              <span>{es ? '17 años operando en Colombia' : '17 years operating in Colombia'}</span>
              <span className="opacity-50">·</span>
              <span>{es ? 'Reserva directa, sin comisiones' : 'Book direct, no fees'}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Categorías */}
      <Container className="flex flex-wrap gap-3 pt-8">
        <span className="rounded-full border border-azul px-4 py-2 text-sm font-semibold text-azul">
          {es ? 'Todo' : 'All'}
        </span>
        {CATEGORIES.map((c) => (
          <Link
            key={c.es}
            to="/tours"
            className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-[#3A362E] hover:border-azul"
          >
            {es ? c.es : c.en}
          </Link>
        ))}
      </Container>

      {/* Experiencias */}
      <Rail
        eyebrow={es ? 'Originales Turismo Colombia' : 'Turismo Colombia Originals'}
        title={es ? 'Experiencias que solo conseguís acá' : 'Experiences you only get here'}
        subtitle={
          es
            ? 'Diseñadas y guiadas por gente de la región. Cupos reducidos.'
            : 'Designed and led by locals. Small groups.'
        }
        href="/tours"
        linkLabel={es ? 'Ver todos los tours' : 'All tours'}
      >
        {tours.length ? (
          tours.slice(0, 4).map((tr) => <ExperienceCard key={tr.id} tour={tr} />)
        ) : (
          <EmptyHint text={es ? 'Pronto vas a ver experiencias acá.' : 'Experiences coming soon.'} />
        )}
      </Rail>

      {/* Hospedajes */}
      <Rail
        eyebrow={es ? 'Hospedajes' : 'Stays'}
        title={es ? 'Dónde quedarte' : 'Where to stay'}
        href="/hospedajes"
        linkLabel={es ? 'Ver todos' : 'View all'}
        tint
      >
        {stays.length ? (
          stays.map((s) => <StayCard key={s.id} stay={s} />)
        ) : (
          <EmptyHint text={es ? 'Pronto vas a ver hospedajes acá.' : 'Stays coming soon.'} />
        )}
      </Rail>

      {/* Destinos */}
      {dests.length > 0 && (
        <Container className="py-12">
          <h2 className="mb-6 font-serif text-3xl text-ink sm:text-4xl">
            {es ? 'Explorá Colombia' : 'Explore Colombia'}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dests.map((d) => (
              <DestinationTile key={d.id} dest={d} />
            ))}
          </div>
        </Container>
      )}

      {/* Historia CEO */}
      <section className="my-14 bg-azul-tint py-16">
        <Container className="grid items-center gap-12 lg:grid-cols-[420px_1fr]">
          <div className="aspect-[4/5] overflow-hidden rounded-card bg-[#E6DFD0]" />
          <div>
            <Eyebrow>{es ? 'Nuestra historia' : 'Our story'}</Eyebrow>
            <p className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-[38px]">
              {es
                ? '“No vendemos paquetes. Hacemos que te enamores de esta tierra.”'
                : '“We don’t sell packages. We make you fall in love with this land.”'}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#3A362E]">
              {es
                ? 'Turismo Colombia nació de un momento difícil y se volvió una herramienta para salir adelante y ayudar a otros. Trabajamos con anfitriones, guías y familias de cada región.'
                : 'Turismo Colombia was born from a hard time and became a way forward — for us and others. We work with hosts, guides and families across every region.'}
            </p>
            <Link
              to="/nosotros"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-azul hover:text-azul-hover"
            >
              {es ? 'Conocé a Johan y al equipo' : 'Meet Johan and the team'} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Testimonios */}
      {testis.length > 0 && (
        <Container className="py-4">
          <h2 className="mb-6 font-serif text-3xl text-ink sm:text-4xl">
            {es ? 'Lo que cuentan los viajeros' : 'What travelers say'}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testis.map((tt) => (
              <div key={tt.id} className="rounded-card border border-line bg-white p-6">
                <p className="text-[15px] leading-relaxed text-[#2C2820]">“{t(tt.quote)}”</p>
                <div className="mt-3 text-[13px] text-muted">
                  {[tt.author_name, tt.author_location].filter(Boolean).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}

      <NewsletterBand />
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="col-span-full rounded-card border border-dashed border-line py-12 text-center text-sm text-muted">
      {text}
    </div>
  );
}
