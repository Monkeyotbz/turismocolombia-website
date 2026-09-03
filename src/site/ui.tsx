import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export function Tricolor({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[3px] w-full ${className}`}>
      <div className="grow-[2] bg-oro" />
      <div className="grow bg-azul" />
      <div className="grow bg-carmin" />
    </div>
  );
}

export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        dark ? 'text-oro' : 'text-azul'
      }`}
    >
      {children}
    </p>
  );
}

type Variant = 'primary' | 'gold' | 'outline' | 'white';
type Size = 'md' | 'lg';

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-60';
const btnSize: Record<Size, string> = { md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-[15px]' };
const btnVariant: Record<Variant, string> = {
  primary: 'bg-azul text-white hover:bg-azul-hover',
  gold: 'bg-oro text-ink hover:brightness-95',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  white: 'bg-white text-ink hover:bg-cream',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className = '') {
  return `${btnBase} ${btnSize[size]} ${btnVariant[variant]} ${className}`;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  const isExternal = /^https?:|^mailto:|^tel:/.test(to);
  const cls = buttonClasses(variant, size, className);
  return isExternal ? (
    <a href={to} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

export function Stars({ rating, count }: { rating?: number | null; count?: number | null }) {
  if (rating == null) return null;
  return (
    <span className="inline-flex items-center gap-1 text-sm text-ink">
      <Star className="h-3.5 w-3.5 fill-oro text-oro" />
      <b>{rating.toFixed(rating % 1 === 0 ? 0 : 2)}</b>
      {count != null && <span className="text-muted">({count})</span>}
    </span>
  );
}

export function Money({ value, suffix }: { value?: number | null; suffix?: string }) {
  if (value == null) return <span className="font-semibold">Consultar</span>;
  return (
    <span>
      <b>${value.toLocaleString('es-CO')}</b>
      {suffix && <span className="text-muted"> {suffix}</span>}
    </span>
  );
}

export function Badge({
  children,
  tone = 'carmin',
}: {
  children: React.ReactNode;
  tone?: 'carmin' | 'azul';
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide text-white ${
        tone === 'carmin' ? 'bg-carmin' : 'bg-azul'
      }`}
    >
      {children}
    </span>
  );
}
