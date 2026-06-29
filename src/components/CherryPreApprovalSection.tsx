import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Clock, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import PhoneLink from '@/components/PhoneLink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PHONE_NUMBER_DISPLAY } from '@/constants/contact';
import { buildCherryApplyUrl } from '@/constants/cherry';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { useCherryWidgetRegistration } from '@/hooks/use-cherry-widget-registration';
import { cn } from '@/lib/utils';
import { trackFinancingEngagement } from '@/utils/vercelAnalytics';

/**
 * VERIFY-BEFORE-PUBLIC — regulated financing claims.
 *
 * Every figure below was stated by Dr. Churchill in the March 6 meeting as how
 * Cherry's program works, but specific lending terms (credit-score threshold,
 * 0% APR availability, term length, "won't affect your credit") must be
 * confirmed against Cherry's current program terms and approved by the practice
 * before this is published. They are isolated here so they are trivial to edit.
 */
const FINANCING_TERMS = {
  creditScore: '640+',
  maxTermMonths: 24,
  approvalMinutes: 2,
} as const;

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000] as const;
const DEFAULT_AMOUNT = 2500;
const PRIMARY_CTA_LABEL = "See if I'm pre-approved";

const benefits = [
  {
    Icon: ShieldCheck,
    title: 'A soft credit check only',
    description:
      "Checking your options won't affect your credit score. (A hard check only happens later if a payment is missed.)",
  },
  {
    Icon: Clock,
    title: `An answer in about ${FINANCING_TERMS.approvalMinutes} minutes`,
    description:
      'The application is short, and most people get an instant decision before they ever call us.',
  },
  {
    Icon: BadgeCheck,
    title: 'Built for a range of budgets',
    description: `Applicants with a ${FINANCING_TERMS.creditScore} credit score often qualify, and you choose the amount that fits your plan.`,
  },
  {
    Icon: Sparkles,
    title: 'Friendly monthly plans',
    description: `Qualified applicants may see 0% APR options with terms up to ${FINANCING_TERMS.maxTermMonths} months.`,
  },
] as const;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

interface CherryPreApprovalSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

const CherryPreApprovalSection: React.FC<CherryPreApprovalSectionProps> = ({
  eyebrow = 'Get Pre-Approved',
  title = 'See what you could plan for — before your visit.',
  description = "Pick an amount and check your options with Cherry in about two minutes. It's a soft credit check, so it won't affect your credit score, and you'll get an answer right away.",
  className,
}) => {
  // Keep the floating Cherry estimator available on any page that shows this block.
  useCherryWidgetRegistration({ enabled: true });

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const hasTrackedViewRef = React.useRef(false);

  const [selectedPreset, setSelectedPreset] = React.useState<number | null>(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = React.useState('');

  const effectiveAmount = React.useMemo(() => {
    if (customAmount.trim() !== '') {
      const parsed = Number.parseInt(customAmount, 10);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
    }
    return selectedPreset ?? undefined;
  }, [customAmount, selectedPreset]);

  const inOfficeApplyUrl = React.useMemo(
    () => buildCherryApplyUrl({ source: 'in_office_qr' }),
    [],
  );

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasTrackedViewRef.current) return;

    const trackSectionView = () => {
      if (hasTrackedViewRef.current) return;
      hasTrackedViewRef.current = true;
      trackFinancingEngagement({
        action: 'section_viewed',
        source: 'cherry_pre_approval_section',
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      trackSectionView();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        trackSectionView();
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/[^\d]/g, '').slice(0, 6);
    setCustomAmount(digitsOnly);
    if (digitsOnly !== '') {
      setSelectedPreset(null);
    }
  };

  const openCherryApplication = () => {
    const applyUrl = buildCherryApplyUrl({ amount: effectiveAmount, source: 'website' });

    trackFinancingEngagement({
      action: 'cta_clicked',
      source: 'cherry_pre_approval_section',
      ctaText: PRIMARY_CTA_LABEL,
      destination: applyUrl,
      status: effectiveAmount ? `amount_${effectiveAmount}` : 'amount_unset',
    });

    if (typeof window !== 'undefined') {
      window.open(applyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section ref={sectionRef} className={cn('py-16 md:py-20', className)}>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-white via-stone-50 to-white shadow-[0_30px_90px_-50px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute left-[-8rem] top-[-8rem] h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute bottom-[-10rem] right-[-6rem] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative grid gap-8 p-8 md:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            {/* Left column: headline + amount entry */}
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                {eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>

              <div className="mt-8 rounded-[1.5rem] border border-gold/20 bg-white/85 p-6 shadow-[0_20px_48px_-36px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                <p
                  id="cherry-amount-label"
                  className="text-sm font-semibold text-foreground"
                >
                  How much would you like to plan for?
                </p>

                <div
                  className="mt-4 flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby="cherry-amount-label"
                >
                  {PRESET_AMOUNTS.map((amount) => {
                    const isSelected = customAmount.trim() === '' && selectedPreset === amount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handlePresetClick(amount)}
                        aria-pressed={isSelected}
                        className={cn(
                          'button-static rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                          isSelected
                            ? 'border-gold bg-gold text-white shadow-sm'
                            : 'border-gold/30 bg-white text-foreground hover:border-gold hover:bg-gold/5',
                        )}
                      >
                        {formatCurrency(amount)}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="cherry-custom-amount"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Or enter your own amount
                  </label>
                  <div className="relative mt-2 max-w-[16rem]">
                    <span
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base font-semibold text-muted-foreground"
                      aria-hidden="true"
                    >
                      $
                    </span>
                    <Input
                      id="cherry-custom-amount"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="3,000"
                      value={customAmount}
                      onChange={handleCustomChange}
                      aria-describedby="cherry-amount-help"
                      className="pl-7"
                    />
                  </div>
                  <p id="cherry-amount-help" className="mt-2 text-xs leading-5 text-muted-foreground">
                    Not sure yet? An estimate is fine — you can adjust it on the next step.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button size="lg" onClick={openCherryApplication}>
                    {PRIMARY_CTA_LABEL}
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to={SCHEDULE_CONSULTATION_PATH}>Talk to our team first</Link>
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  Opens Cherry&apos;s secure application in a new tab. Financing is provided by
                  Cherry, subject to approval and Cherry&apos;s terms.
                </p>
              </div>
            </div>

            {/* Right column: benefits + in-office QR */}
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {benefits.map(({ Icon, title: benefitTitle, description: benefitDescription }) => (
                  <div
                    key={benefitTitle}
                    className="rounded-[1.5rem] border border-border/80 bg-white/90 p-5 shadow-[0_20px_40px_-32px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{benefitTitle}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {benefitDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-gold/20 bg-gold/5 p-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl border border-gold/20 bg-white p-2.5 shadow-sm">
                    <QRCodeSVG
                      value={inOfficeApplyUrl}
                      size={104}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#171717"
                      role="img"
                      aria-label="QR code to open the Cherry financing application"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                      <QrCode size={14} aria-hidden="true" />
                      In our office
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      Scan to apply from your phone.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Point your camera at the code to start the same application on your own device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance / reassurance footer */}
          <div className="relative border-t border-border/70 bg-white/60 px-8 py-4 text-xs leading-5 text-muted-foreground md:px-10">
            Checking your options with Cherry is a soft credit inquiry and won&apos;t affect your
            credit score. Rates, available terms, and any 0% APR offer depend on your application
            and creditworthiness, and all financing decisions are made by Cherry. Prefer to talk it
            through? Call{' '}
            <PhoneLink
              phoneNumber={PHONE_NUMBER_DISPLAY}
              className="font-semibold text-secondary underline underline-offset-4 hover:no-underline"
            >
              {PHONE_NUMBER_DISPLAY}
            </PhoneLink>
            .
          </div>
        </div>
      </div>
    </section>
  );
};

export default CherryPreApprovalSection;
