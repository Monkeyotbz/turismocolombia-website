import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { SettingsProvider, useSettings } from './SettingsContext';
import { LeadDialogProvider } from './LeadDialog';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Tricolor } from './ui';

function Ribbon() {
  const { announcement, whatsappHref } = useSettings();
  if (!announcement.enabled) return null;
  return (
    <div className="bg-carmin px-4 py-2 text-center text-[13px] font-medium text-[#FBEEEA]">
      <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:underline">
        {announcement.text}
      </a>
    </div>
  );
}

function FloatingWhatsApp() {
  const { whatsappHref } = useSettings();
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-azul text-white shadow-xl transition hover:bg-azul-hover"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export default function SiteLayout() {
  return (
    <SettingsProvider>
      <LeadDialogProvider>
        <div className="flex min-h-screen flex-col">
          <div className="page-frame" aria-hidden="true" />
          <Tricolor />
          <Ribbon />
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <FloatingWhatsApp />
        </div>
      </LeadDialogProvider>
    </SettingsProvider>
  );
}
