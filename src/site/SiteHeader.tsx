import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLocale } from '../lib/locale';
import { LOCALES } from '../lib/i18n';
import { useAuth } from '../contexts/AuthContext';
import { useLeadDialog } from './LeadDialog';
import { Container, Button } from './ui';

const NAV = [
  { to: '/tours', es: 'Tours', en: 'Tours' },
  { to: '/hospedajes', es: 'Hospedajes', en: 'Stays' },
  { to: '/destinos', es: 'Destinos', en: 'Destinations' },
  { to: '/nosotros', es: 'Nosotros', en: 'About' },
];

export default function SiteHeader() {
  const { locale, setLocale } = useLocale();
  const { user, isStaff } = useAuth();
  const { open } = useLeadDialog();
  const [mobile, setMobile] = useState(false);
  const es = locale === 'es';

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-medium transition-colors ${
      isActive ? 'text-ink' : 'text-[#3A362E] hover:text-azul'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link to="/" aria-label="Turismo Colombia">
          <img
            src="/brand/logo-primary.png"
            alt="Turismo Colombia"
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls}>
              {es ? n.es : n.en}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 text-sm font-semibold text-muted sm:flex">
            {LOCALES.map((l, i) => (
              <span key={l} className="contents">
                {i > 0 && <span className="text-line">/</span>}
                <button
                  type="button"
                  onClick={() => setLocale(l)}
                  className={l === locale ? 'text-ink' : 'hover:text-azul'}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          {user ? (
            <Link
              to={isStaff ? '/admin' : '/perfil'}
              className="hidden text-sm font-semibold text-ink hover:text-azul sm:block"
            >
              {isStaff ? 'Panel' : es ? 'Mi cuenta' : 'Account'}
            </Link>
          ) : (
            <Link to="/login" className="hidden text-sm font-semibold text-ink hover:text-azul sm:block">
              {es ? 'Ingresar' : 'Sign in'}
            </Link>
          )}
          <Button onClick={() => open()} className="hidden sm:inline-flex">
            {es ? 'Reservar' : 'Book'}
          </Button>
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label="Menú"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {mobile && (
        <div className="border-t border-line bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setMobile(false)}
                className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-azul-tint"
              >
                {es ? n.es : n.en}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setMobile(false)}
              className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-azul-tint"
            >
              {es ? 'Ingresar' : 'Sign in'}
            </Link>
            <Button
              onClick={() => {
                setMobile(false);
                open();
              }}
              className="mt-2"
            >
              {es ? 'Reservar' : 'Book'}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
