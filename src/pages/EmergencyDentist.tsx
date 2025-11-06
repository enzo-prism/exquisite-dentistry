import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import VideoHero from '@/components/VideoHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AlarmClock, ShieldCheck, PhoneCall, HeartPulse, Compass } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import FAQStructuredData from '@/components/seo/FAQStructuredData';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';
import { getCanonicalUrl } from '@/utils/schemaValidation';

const EmergencyDentist = () => {
  const rapidResponse = [
    {
      icon: <AlarmClock className="h-8 w-8 text-secondary" />,
      title: "Same-Day Relief",
      description: "Priority scheduling, virtual triage, and extended hours ensure you are seen when emergencies strike."
    },
    {
      icon: <PhoneCall className="h-8 w-8 text-secondary" />,
      title: "Direct Communication",
      description: "Reach our on-call team via phone, text, or video consults to receive immediate guidance before you arrive."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
      title: "Comprehensive Solutions",
      description: "We stabilize pain, repair fractures, treat infections, and coordinate specialists when complex care is required."
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-secondary" />,
      title: "Comfort-First Approach",
      description: "Sedation options, comforting amenities, and compassionate clinicians help you feel calm in stressful moments."
    }
  ];

  const emergencyTypes = [
    {
      heading: "Tooth or Veneer Fractures",
      details: "We provide bonding, temporary crowns, or fast-track veneer replacement to restore your smile before events or filming schedules."
    },
    {
      heading: "Severe Toothaches",
      details: "Diagnosis with digital imaging pinpoints infection sources. Root canal therapy, medicated rinses, and antibiotics offer immediate relief."
    },
    {
      heading: "Knocked-Out Teeth",
      details: "We reimplant teeth whenever possible or place same-day implants and provisionals to maintain esthetics and function."
    },
    {
      heading: "Gum & Soft Tissue Injuries",
      details: "Laser therapy, suturing, and medicated dressings stop bleeding and protect healing tissue."
    }
  ];

  const faqs = [
    {
      question: "Do you accept walk-in emergencies?",
      answer: "Yes. Call ahead so we can prepare, but if you arrive during office hours we prioritize emergencies immediately. After hours, our on-call team will guide you to the fastest available solution."
    },
    {
      question: "Can you help if I am visiting Los Angeles?",
      answer: "Absolutely. We frequently treat travelers, performers, and conference attendees. We coordinate with your home dentist after care so continuity is seamless."
    },
    {
      question: "What should I do before my appointment?",
      answer: "Keep knocked-out teeth moist in milk or a saliva container, take over-the-counter pain relief as advised, and avoid extremely hot or cold foods. Our team will give you detailed instructions during your call."
    }
  ];

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': ['MedicalBusiness', 'Dentist'],
          name: 'Emergency Dentist Los Angeles',
          description: 'Emergency dental services in Los Angeles offering same-day care for toothaches, fractures, infections, and dental trauma.',
          url: getCanonicalUrl('/emergency-dentist'),
          areaServed: ['Los Angeles', 'Beverly Hills', 'West Hollywood'],
          openingHours: 'Mo,Tu,We,Th 08:00-19:00 Sa 08:00-14:00'
        }]}
      />

      <PageSEO
        title="Emergency Dentist Los Angeles | Same-Day Dental Care"
        description="Emergency dentist in Los Angeles providing same-day appointments, after-hours guidance, and concierge treatment for urgent dental needs."
        keywords="emergency dentist Los Angeles, same-day dental care LA, urgent dentist, after-hours dentist LA"
        path="/emergency-dentist"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      <WebPageStructuredData
        title="Emergency Dentist in Los Angeles"
        description="Contact Exquisite Dentistry for emergency dental care in Los Angeles. Same-day relief for toothaches, broken teeth, infections, and trauma."
        url="https://exquisitedentistryla.com/emergency-dentist"
        breadcrumbs={[
          { name: 'Services', url: 'https://exquisitedentistryla.com/services/' },
          { name: 'Emergency Dentist', url: 'https://exquisitedentistryla.com/emergency-dentist/' }
        ]}
      />

      <ServiceStructuredData
        serviceName="Emergency Dental Care"
        description="Rapid-response dental services including pain relief, fracture repair, infection control, and trauma management."
        url="/emergency-dentist"
        priceRange="$$-$$$"
      />

      <FAQStructuredData faqs={faqs} about="Emergency Dentist Los Angeles" />

      <div className="min-h-screen bg-background">
        <VideoHero
          title="Emergency Dentist Los Angeles"
          subtitle="Immediate, compassionate care when dental emergencies disrupt your day."
          primaryCta={{
            text: "Call for Immediate Help",
            href: "tel:+13232722388"
          }}
          secondaryCta={{
            text: "Message Our Team",
            href: "/contact"
          }}
          height="medium"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="uppercase tracking-[0.3em] text-secondary font-semibold">Urgent Dental Care</span>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
                Rapid Relief for Los Angeles Smiles
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Dental emergencies can strike at the worst times—a board presentation, a flight out of LAX, or a weekend getaway in Malibu.
                Exquisite Dentistry provides same-day treatment, virtual triage, and extended availability to safeguard your smile and comfort.
                From severe toothaches to cracked veneers, our team resolves pain, restores appearance, and coordinates follow-up so you can get back to what matters.
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Our Wilshire Boulevard location is centrally positioned for quick arrivals from Beverly Hills, West Hollywood, Miracle Mile, and DTLA.
                We are equipped with digital imaging, in-house milling for temporary restorations, and sedation dentistry options to transform stressful situations into calm, controlled visits.
                Visitors from out of town receive concierge support with hotels, transportation, and communication with home dentists.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {rapidResponse.map((item) => (
                <Card key={item.title} className="border border-border/60 bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  What to Expect During Your Emergency Visit
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Call us the moment discomfort begins. Our care team provides immediate instructions and reserves the next available appointment—often within hours.
                  Upon arrival, we prioritize pain relief using gentle anesthesia techniques, warm blankets, and calming aromatherapy.
                  Digital X-rays and intraoral cameras allow us to diagnose quickly while showing you exactly what we see.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Once the source is identified, we stabilize the area with medication, bonding, sutures, or provisional restorations.
                  If root canal therapy or implant placement is necessary, we coordinate with our in-house specialists or trusted partners the same day.
                  Before you leave, we map next steps, review costs transparently, and arrange virtual check-ins to monitor healing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <a href="tel:+13232722388">
                      Speak to Our Emergency Team
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">
                      Request Follow-Up Care
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-muted/40 border border-border/60 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Common Emergencies We Treat</h3>
                <div className="space-y-6">
                  {emergencyTypes.map((type) => (
                    <div key={type.heading} className="p-4 bg-white rounded-xl shadow-sm border border-border/40">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{type.heading}</h4>
                      <p className="text-muted-foreground leading-relaxed">{type.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/15">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Serving Local Residents and Visitors Alike
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Los Angeles residents rely on us for fast solutions before high-stakes meetings, red carpet events, and studio tapings.
                Travelers and production crews appreciate our proximity to The Grove, Beverly Hills hotels, and major freeways.
                We provide supporting documents for insurance claims, connect with your home dentist, and even coordinate last-minute cosmetic repairs before photoshoots.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Prevention is also part of our mission.
                Following emergency care, we schedule comprehensive exams and personalized wellness plans to reduce future risks.
                Many patients join our VIP membership for priority scheduling, quarterly cleanings, and whitening touch-ups that keep emergencies at bay.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Need follow-up cosmetic care after trauma? We seamlessly transition into <Link to="/cosmetic-dentistry" className="text-secondary underline-offset-4 hover:underline">cosmetic dentistry</Link>,
                <Link to="/veneers" className="text-secondary underline-offset-4 hover:underline">veneers</Link>, or <Link to="/dental-implants" className="text-secondary underline-offset-4 hover:underline">implant therapy</Link> to restore long-term confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-white to-secondary/10 border border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Emergency Visit Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Emergency examinations begin at $150 and include diagnostic imaging and same-day stabilization.
                    Pain management, medication, or temporary restorations are provided immediately, with transparent pricing for definitive treatment before any procedure.
                  </p>
                  <p>
                    We accept major PPO insurance plans, flexible spending accounts, cash, and credit cards.
                    For extensive emergency treatment, financing options and payment plans are available to remove barriers to care.
                  </p>
                  <p>
                    After-hours care is available for established patients and travelers with urgent needs—call or text to connect with our on-call team.
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-border/60 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Emergency Readiness Checklist</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Store our number <a className="text-secondary underline-offset-4 hover:underline" href="tel:+13232722388">(323) 272-2388</a> in your phone under “Emergency Dentist LA.”</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Keep a small dental travel kit with floss, pain relievers, and a clean container in your bag or car.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Wear custom athletic mouthguards during workouts, cycling, or filming action scenes to prevent trauma.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Schedule regular checkups—most emergencies stem from untreated decay or cracked restorations.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-secondary mt-1" />
                      <span>Communicate jaw pain or bite changes early; proactive care prevents late-night flare-ups.</span>
                    </li>
                  </ul>
                </div>

                <ServiceRecommendation
                  currentService="Emergency Dentist"
                  context="complement"
                  recommendations={[
                    {
                      title: "Dental Implants",
                      href: "/dental-implants",
                      description: "Replace teeth lost to trauma with permanent solutions.",
                      popularity: 47
                    },
                    {
                      title: "Cosmetic Dentistry",
                      href: "/cosmetic-dentistry",
                      description: "Restore aesthetics after emergency repairs and long-term healing.",
                      popularity: 58
                    },
                    {
                      title: "FAQs",
                      href: "/faqs",
                      description: "Review preventive tips and solutions for common oral health questions.",
                      popularity: 62
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Emergency Dentistry FAQs
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="border border-border/60 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                We Are Here When You Need Us Most
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Dental emergencies do not wait, and neither should you. Call or message us now for concierge-level emergency care in the heart of Los Angeles.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a href="tel:+13232722388">
                    Call (323) 272-2388
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Request Emergency Follow-Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <InternalLinkingWidget
              context="general"
              variant="expanded"
              title="Plan your next steps after emergency care"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default EmergencyDentist;
