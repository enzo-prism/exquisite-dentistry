import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Languages, MapPin, MessageCircle, Phone, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from '@/constants/contact';
import { GOOGLE_MAPS_SHORT_URL, SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { cn } from '@/lib/utils';

type Language = 'en' | 'es';
type Topic = 'insurance' | 'services' | 'directions' | 'scheduling';

const COPY = {
  en: {
    trigger: 'Ask the Concierge',
    title: 'Website Concierge',
    description: 'Choose a topic for general practice information.',
    safety: 'This guide cannot give patient-specific or medical advice. Please do not share health, insurance ID, or other private information here.',
    topics: {
      insurance: {
        label: 'Insurance',
        answer: 'Exquisite Dentistry works with PPO dental benefits. Coverage varies by plan, so the team must verify your benefits before treatment.',
        link: '/insurance/',
        linkLabel: 'Review insurance information'
      },
      services: {
        label: 'Services',
        answer: 'Explore cosmetic and restorative care, including veneers, Invisalign, whitening, implants, crowns, cleanings, and emergency visits.',
        link: '/services/',
        linkLabel: 'Explore services'
      },
      directions: {
        label: 'Directions',
        answer: 'The office is at 6227 Wilshire Blvd, Los Angeles, CA 90048. Open the map for current directions.',
        link: GOOGLE_MAPS_SHORT_URL,
        linkLabel: 'Open directions'
      },
      scheduling: {
        label: 'Scheduling',
        answer: 'Use the consultation page to choose your next step, or call the office for help from a person.',
        link: SCHEDULE_CONSULTATION_PATH,
        linkLabel: 'Schedule a consultation'
      }
    },
    human: 'Prefer a person? The team can help with questions, benefits verification, and scheduling.',
    call: `Call ${PHONE_NUMBER_DISPLAY}`,
    schedule: 'Schedule Consultation'
  },
  es: {
    trigger: 'Pregunte al Concierge',
    title: 'Concierge del Sitio',
    description: 'Elija un tema para ver información general de la clínica.',
    safety: 'Esta guía no puede dar consejos médicos ni específicos para un paciente. No comparta información de salud, identificación del seguro ni otros datos privados aquí.',
    topics: {
      insurance: {
        label: 'Seguro dental',
        answer: 'Exquisite Dentistry trabaja con beneficios dentales PPO. La cobertura depende del plan, por lo que el equipo debe verificar sus beneficios antes del tratamiento.',
        link: '/insurance/',
        linkLabel: 'Ver información del seguro'
      },
      services: {
        label: 'Servicios',
        answer: 'Explore atención cosmética y restauradora, como carillas, Invisalign, blanqueamiento, implantes, coronas, limpiezas y visitas de emergencia.',
        link: '/services/',
        linkLabel: 'Explorar servicios'
      },
      directions: {
        label: 'Cómo llegar',
        answer: 'La clínica está en 6227 Wilshire Blvd, Los Angeles, CA 90048. Abra el mapa para ver indicaciones actuales.',
        link: GOOGLE_MAPS_SHORT_URL,
        linkLabel: 'Abrir indicaciones'
      },
      scheduling: {
        label: 'Citas',
        answer: 'Use la página de consultas para elegir el siguiente paso o llame a la clínica para recibir ayuda de una persona.',
        link: SCHEDULE_CONSULTATION_PATH,
        linkLabel: 'Programar una consulta'
      }
    },
    human: '¿Prefiere hablar con una persona? El equipo puede ayudar con preguntas, verificación de beneficios y citas.',
    call: `Llamar al ${PHONE_NUMBER_DISPLAY}`,
    schedule: 'Programar Consulta'
  }
} as const;

const isExternal = (href: string) => href.startsWith('http');

const WebsiteConcierge: React.FC = () => {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>('en');
  const [topic, setTopic] = useState<Topic>('insurance');
  const copy = COPY[language];
  const selected = copy.topics[topic];

  if (location.pathname === '/sitemap' || location.pathname.startsWith('/lp/')) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 left-4 z-40 gap-2 rounded-full bg-black px-4 text-white shadow-xl hover:bg-black/90 md:bottom-6 md:left-6"
          aria-label={copy.trigger}
        >
          <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
          <span className="hidden sm:inline">{copy.trigger}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl p-0">
        <div className="border-b border-black/10 bg-black p-6 pr-12 text-white">
          <DialogHeader>
            <div className="flex items-center gap-2 text-gold" aria-hidden="true">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">Exquisite Dentistry</span>
            </div>
            <DialogTitle className="mt-2 text-2xl text-white">{copy.title}</DialogTitle>
            <DialogDescription className="text-white/75">{copy.description}</DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Languages className="h-4 w-4 text-gold-dark" aria-hidden="true" />
              Language / Idioma
            </div>
            <div className="flex rounded-full border border-black/15 p-1" aria-label="Language selection">
              {(['en', 'es'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  aria-pressed={language === option}
                  className={cn(
                    'button-static rounded-full px-3 py-1.5 text-xs font-semibold transition',
                    language === option ? 'bg-black text-white' : 'text-black/65 hover:text-black'
                  )}
                >
                  {option === 'en' ? 'English' : 'Español'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2" aria-label="Concierge topics">
            {(Object.keys(copy.topics) as Topic[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTopic(option)}
                aria-pressed={topic === option}
                className={cn(
                  'button-static min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition',
                  topic === option
                    ? 'border-gold-dark bg-gold/15 text-black'
                    : 'border-black/10 bg-white text-black/70 hover:border-black/30'
                )}
              >
                {copy.topics[option].label}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-gold/25 bg-gold/10 p-4" role="status" aria-live="polite">
            <h3 className="font-semibold">{selected.label}</h3>
            <p className="mt-2 text-sm leading-6 text-black/75">{selected.answer}</p>
            {isExternal(selected.link) ? (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex font-semibold text-black underline underline-offset-4"
              >
                {selected.linkLabel}
              </a>
            ) : (
              <DialogClose asChild>
                <Link className="mt-3 inline-flex font-semibold text-black underline underline-offset-4" to={selected.link}>
                  {selected.linkLabel}
                </Link>
              </DialogClose>
            )}
          </div>

          <div className="flex gap-3 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>{copy.safety}</p>
          </div>

          <div>
            <p className="text-sm leading-6 text-black/70">{copy.human}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Button variant="outline" asChild>
                <a href={`tel:${PHONE_NUMBER_E164}`}>
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  {copy.call}
                </a>
              </Button>
              <DialogClose asChild>
                <Button className="bg-black text-white hover:bg-black/90" asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>
                    <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
                    {copy.schedule}
                  </Link>
                </Button>
              </DialogClose>
            </div>
            <a
              href={GOOGLE_MAPS_SHORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-sm font-semibold text-black/70 underline underline-offset-4"
            >
              <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
              6227 Wilshire Blvd, Los Angeles, CA 90048
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteConcierge;
