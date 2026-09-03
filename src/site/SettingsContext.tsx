import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSiteSettings } from '../lib/queries';
import { useLocale } from '../lib/locale';
import { pickText } from '../lib/i18n';

const FALLBACK = {
  whatsapp: '573145284548',
  email: 'reservas@turismocolombia.fit',
  phone: '3145284548',
};

interface SettingsValue {
  loaded: boolean;
  raw: Record<string, Record<string, unknown>>;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  /** URL de WhatsApp con texto prellenado. */
  whatsappHref: (text?: string) => string;
  announcement: { enabled: boolean; text: string };
  social: Record<string, string>;
}

const SettingsContext = createContext<SettingsValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();
  const [raw, setRaw] = useState<Record<string, Record<string, unknown>>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSiteSettings()
      .then(setRaw)
      .finally(() => setLoaded(true));
  }, []);

  const value = useMemo<SettingsValue>(() => {
    const contact = (raw.contact ?? {}) as Record<string, unknown>;
    const ann = (raw.announcement_bar ?? {}) as Record<string, unknown>;
    const whatsappNumber = (contact.whatsapp_number as string) || FALLBACK.whatsapp;
    const defaultText = pickText(contact.whatsapp_default_text as never, locale) || 'Hola, quiero información';
    return {
      loaded,
      raw,
      whatsappNumber,
      contactEmail: (contact.email as string) || FALLBACK.email,
      contactPhone: (contact.phone as string) || FALLBACK.phone,
      whatsappHref: (text?: string) =>
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text || defaultText)}`,
      announcement: {
        enabled: ann.enabled !== false,
        text:
          pickText(ann.text as never, locale) ||
          'Reservás directo con anfitriones locales — sin comisiones',
      },
      social: (raw.social ?? {}) as Record<string, string>,
    };
  }, [raw, loaded, locale]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    return {
      loaded: false,
      raw: {},
      whatsappNumber: FALLBACK.whatsapp,
      contactEmail: FALLBACK.email,
      contactPhone: FALLBACK.phone,
      whatsappHref: (t?: string) =>
        `https://wa.me/${FALLBACK.whatsapp}?text=${encodeURIComponent(t || 'Hola')}`,
      announcement: { enabled: true, text: '' },
      social: {},
    };
  }
  return ctx;
}
