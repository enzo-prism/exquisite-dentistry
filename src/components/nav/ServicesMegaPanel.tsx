import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import OptimizedImage from '@/components/seo/OptimizedImage';
import PhoneLink from '@/components/PhoneLink';
import { cn } from '@/lib/utils';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { ALL_SERVICES_LINK, SERVICE_EXTRAS, SERVICE_GROUPS, matchesPath } from '@/constants/navigation';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

const DOCTOR_PHOTO = '/lovable-uploads/e2d3dd68-6f1f-4361-8749-59f510dfbc6c.png';

interface ServicesMegaPanelProps {
  pathname: string;
  onBookClick: (source: string, ctaText: string) => void;
}

const stagger = (index: number) => ({ '--i': index }) as React.CSSProperties;

/** Full-width services panel: three calm treatment groups and one way to begin. */
const ServicesMegaPanel: React.FC<ServicesMegaPanelProps> = ({ pathname, onBookClick }) => {
  let order = 0;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 xl:px-8">
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(15rem,18rem)] gap-x-6 py-8 xl:grid-cols-[repeat(3,minmax(0,1fr))_minmax(19rem,22rem)] xl:gap-x-10 xl:py-10 2xl:gap-x-14">
        {SERVICE_GROUPS.map((group) => (
          <div role="group" key={group.id} aria-labelledby={`nav-group-${group.id}`} className="min-w-0">
            <p
              id={`nav-group-${group.id}`}
              className="nav-panel-item flex items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne/85"
              style={stagger(order++)}
            >
              <span aria-hidden="true" className="h-px w-5 bg-champagne/50" />
              {group.title}
            </p>
            {group.summary ? (
              <p className="nav-panel-item mt-2 px-3 text-[13px] text-white/45" style={stagger(order++)}>
                {group.summary}
              </p>
            ) : null}
            <ul className="mt-4 space-y-0.5">
              {group.items.map((item) => {
                const current = matchesPath(pathname, item.to);
                return (
                  <li key={item.to} className="nav-panel-item" style={stagger(order++)}>
                    <NavLink
                      to={item.to}
                      className={cn(
                        'group block rounded-xl px-3 py-2.5 transition-colors duration-200 focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-champagne/70',
                        current ? 'bg-white/[0.06]' : 'hover:bg-white/[0.05] focus-visible:bg-white/[0.05]',
                      )}
                    >
                      <span
                        className={cn(
                          'flex items-center gap-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200',
                          current ? 'text-champagne' : 'text-white group-hover:text-champagne',
                        )}
                      >
                        {item.label}
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-80 group-focus-visible:translate-x-0 group-focus-visible:opacity-80 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 block text-[13px] leading-snug text-white/55 transition-colors duration-200 group-hover:text-white/75">
                          {item.description}
                        </span>
                      ) : null}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <aside
          aria-label="Book a consultation"
          className="nav-panel-item relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          style={stagger(4)}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <OptimizedImage
              src={DOCTOR_PHOTO}
              alt="Dr. Alexie Aguil at Exquisite Dentistry"
              className="h-full w-full object-cover object-[74%_center]"
              sizes="(min-width: 1280px) 352px, 288px"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,13,12,1)_0%,rgba(14,13,12,0.55)_38%,transparent_70%)]"
            />
          </div>
          <div className="relative -mt-8 flex flex-1 flex-col px-5 pb-5">
            <p className="flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-champagne/90">
              <span aria-hidden="true" className="h-px w-5 shrink-0 bg-champagne/50" />
              Not sure where to start?
            </p>
            <p className="mt-2.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-white">
              Talk it through with <span className="accent-serif text-champagne">Dr. Aguil</span>
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
              A consultation is the simplest first step. We will look at your goals and walk through your options
              together.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                to={SCHEDULE_CONSULTATION_PATH}
                onClick={() => onBookClick('desktop_nav_services_menu', 'Book a consultation')}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-gold px-4 text-[13px] font-semibold text-white transition-colors duration-200 focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-champagne/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Book a consultation
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
              <PhoneLink
                phoneNumber={PHONE_NUMBER_DISPLAY}
                analyticsSource="desktop_nav_services_menu"
                aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
                className="inline-flex h-10 items-center gap-1.5 rounded-full text-[13px] font-medium text-white/75 transition-colors duration-200 hover:text-white focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-champagne/70"
              >
                <Phone className="h-3.5 w-3.5 text-champagne/80" aria-hidden="true" />
                <span className="tabular-nums">{PHONE_NUMBER_DISPLAY}</span>
              </PhoneLink>
            </div>
          </div>
        </aside>
      </div>

      <div className="nav-panel-item flex items-center justify-between gap-6 border-t border-white/[0.07] py-4" style={stagger(order)}>
        <NavLink
          to={ALL_SERVICES_LINK.to}
          className="group inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:text-champagne focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-champagne/70"
        >
          <span className="link-sweep">View all services</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </NavLink>
        <ul className="flex flex-wrap items-center justify-end gap-x-1 text-[12.5px]">
          <li className="pr-2 text-white/40">Also</li>
          {SERVICE_EXTRAS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex min-h-10 items-center rounded-full px-2.5 font-medium transition-colors duration-200 focus-visible:!outline-none focus-visible:ring-1 focus-visible:ring-champagne/70',
                    isActive ? 'text-champagne' : 'text-white/65 hover:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServicesMegaPanel;
