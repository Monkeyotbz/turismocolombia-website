import { useLocale } from '../../lib/locale';
import { useSettings } from '../SettingsContext';
import { Container, Eyebrow, buttonClasses } from '../ui';
import { Users, Wallet, MessageCircle } from 'lucide-react';

export default function AboutPage() {
  const { locale } = useLocale();
  const { whatsappHref } = useSettings();
  const es = locale === 'es';

  return (
    <div>
      <Container className="grid items-center gap-12 pt-10 lg:grid-cols-[1fr_420px]">
        <div>
          <Eyebrow>{es ? 'Nuestra historia' : 'Our story'}</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl leading-[1.06] text-ink sm:text-5xl">
            {es
              ? 'Turismo Colombia nació de un momento oscuro. Hoy hace que miles se enamoren de este país.'
              : 'Turismo Colombia was born from a dark moment. Today it makes thousands fall for this country.'}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#3A362E]">
            {es
              ? 'No somos una agencia más. Somos una marca colombiana que trabaja con anfitriones, guías y familias de cada región para que reserves directo con ellos.'
              : 'We are not just another agency. We are a Colombian brand working with hosts, guides and families across every region so you book directly with them.'}
          </p>
        </div>
        <img
          src="/Ceo.png"
          alt={es ? 'Johan Pulgarín, fundador de Turismo Colombia' : 'Johan Pulgarín, founder of Turismo Colombia'}
          className="aspect-[4/5] w-full rounded-card bg-[#E6DFD0] object-cover"
        />
      </Container>

      {/* Historia */}
      <Container className="max-w-3xl py-12">
        <p className="text-[18px] leading-[1.75] text-[#2C2820]">
          {es
            ? 'Hace más de 17 años empecé a meterle el alma al turismo en Colombia. Esta no es solo una empresa: es una marca que nació en un momento bien oscuro de mi vida, cuando estuve privado de la libertad. De esos bajonazos también salen cosas grandes, y así fue como me inventé esto, como una herramienta de superación personal para salir adelante y ayudar a otros a cumplir sus sueños.'
            : 'Over 17 years ago I started pouring my soul into travel in Colombia. This is not just a company: it is a brand born from a very dark moment in my life, when I was deprived of my freedom. Great things can come from those lows, and that is how I invented this — a tool for personal growth, to move forward and help others fulfill their dreams.'}
        </p>
        <p className="my-7 border-l-[3px] border-azul pl-5 font-serif text-3xl leading-tight text-azul">
          {es
            ? '“No vendemos paquetes ni destinos. Hacemos que la gente se enamore de esta tierra, como yo me volví a enamorar de la vida.”'
            : '“We don’t sell packages or destinations. We make people fall in love with this land, like I fell back in love with life.”'}
        </p>
        <p className="text-[18px] leading-[1.75] text-[#2C2820]">
          {es
            ? 'La técnica es sencilla: gente de la región, cupos pequeños, atención de verdad y un precio justo porque no hay intermediarios cobrando comisión en el medio. Estoy acá para ayudarte a cumplir tus sueños en Colombia.'
            : 'The method is simple: local people, small groups, real attention and a fair price because there are no middlemen taking a cut. I am here to help you fulfill your dreams in Colombia.'}
        </p>
        <p className="mt-5 text-[18px] text-[#2C2820]">
          — {es ? 'Johan Pulgarín, fundador y CEO de Turismo Colombia' : 'Johan Pulgarín, founder and CEO of Turismo Colombia'}
        </p>
      </Container>

      {/* Cómo trabajamos */}
      <Container className="py-8">
        <h2 className="mb-6 font-serif text-3xl text-ink">{es ? 'Cómo trabajamos' : 'How we work'}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Pillar
            icon={<Users className="h-6 w-6 text-azul" />}
            title={es ? 'Anfitriones locales' : 'Local hosts'}
            body={es ? 'Guías, caficultores y familias de cada zona. La experiencia la arma quien vive ahí.' : 'Guides, coffee growers and families in each area. The experience is built by those who live there.'}
          />
          <Pillar
            icon={<Wallet className="h-6 w-6 text-azul" />}
            title={es ? 'Reserva directa, sin comisiones' : 'Book direct, no fees'}
            body={es ? 'Igualamos o mejoramos el precio de las OTAs. Lo que pagás llega a quien te atiende.' : 'We match or beat OTA prices. What you pay goes to who serves you.'}
          />
          <Pillar
            icon={<MessageCircle className="h-6 w-6 text-azul" />}
            title={es ? 'Asesoría real por WhatsApp' : 'Real advice on WhatsApp'}
            body={es ? 'Escribís, te responde una persona de la región y te arma el plan a tu medida.' : 'You write, a person from the region replies and tailors the plan for you.'}
          />
        </div>
      </Container>

      {/* Cifras */}
      <div className="my-14 bg-azul-deep py-12">
        <Container className="grid grid-cols-2 gap-6 text-center text-[#FCFAF4] sm:grid-cols-4">
          {[
            ['17', es ? 'años operando' : 'years operating'],
            ['7', es ? 'regiones' : 'regions'],
            ['80+', es ? 'anfitriones aliados' : 'partner hosts'],
            ['12.000+', es ? 'viajeros [a confirmar]' : 'travelers [tbc]'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif text-4xl">{n}</div>
              <div className="mt-1 text-[13px] text-[#C9C6B9]">{l}</div>
            </div>
          ))}
        </Container>
      </div>

      {/* Misión / Visión */}
      <Container className="grid gap-7 py-6 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-7">
          <Eyebrow>{es ? 'Misión' : 'Mission'}</Eyebrow>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3A362E]">
            {es
              ? 'Acompañar a viajeros a descubrir Colombia de forma auténtica, sostenible y segura, promoviendo el turismo responsable y el amor por nuestra tierra.'
              : 'Guide travelers to discover Colombia authentically, sustainably and safely, promoting responsible tourism and love for our land.'}
          </p>
        </div>
        <div className="rounded-card border border-line bg-white p-7">
          <Eyebrow>{es ? 'Visión' : 'Vision'}</Eyebrow>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3A362E]">
            {es
              ? 'Ser la plataforma líder de turismo local en Colombia, reconocida por su impacto positivo en las comunidades.'
              : 'To be the leading local-tourism platform in Colombia, known for its positive impact on communities.'}
          </p>
        </div>
      </Container>

      {/* CTA */}
      <Container className="py-12">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[22px] bg-azul px-8 py-11 sm:px-14 md:flex-row md:items-center">
          <div>
            <div className="font-serif text-3xl leading-tight text-[#FCFAF4]">
              {es ? 'Reservá directo. Apoyás el emprendimiento colombiano.' : 'Book direct. Support Colombian entrepreneurship.'}
            </div>
          </div>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('white', 'lg', 'shrink-0')}
          >
            WhatsApp
          </a>
        </div>
      </Container>
    </div>
  );
}

function Pillar({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-card border border-line bg-white p-6">
      {icon}
      <div className="mt-3.5 font-semibold text-[17px] text-ink">{title}</div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
