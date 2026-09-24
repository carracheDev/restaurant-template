'use client';

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

type ContactFormValues = {
  name: string;
  date: string;
  time: string;
  guests: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const defaultValues: ContactFormValues = {
  name: "",
  date: "",
  time: "",
  guests: "",
  message: "",
};

function formatWhatsAppNumber(value: string) {
  return value.replace(/\D/g, "");
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5.5 4.8c1.1-1.1 2.7-1.1 3.8 0l.7.7c.9.9.9 2.4 0 3.3l-.9 1c-.3.3-.4.8-.2 1.2l.6 1.4c.3.8 1 1.3 1.8 1.3h.2c1.2 0 2.3.5 3.1 1.3l1.7 1.7c1.1 1.1 1.1 2.8 0 3.9l-1.2 1.2c-.8.8-1.9 1.2-3 1.2h-.3c-4.1 0-8.1-1.4-11.2-4.5C1.8 16 1 12.7 1.2 9.3c.1-1.4.7-2.8 1.8-3.9l2.5-2.6Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M20.5 3.5A11.6 11.6 0 0 0 3.4 17.7L2 22l4.5-1.3a11.5 11.5 0 0 0 13.9-17.2ZM12 19.3c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-2.7.8 1-2.6-.3-.4A9.3 9.3 0 0 1 12 4.7a9.2 9.2 0 0 1 9.3 9.3c0 2.5-1 5-2.8 6.3A9.3 9.3 0 0 1 12 19.3Zm5.1-7.2c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1a7.7 7.7 0 0 1-2.2-1.3c-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.1-.7.1-.1.2-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4-.1-.6l-.1-.5c-.1-.1-.5-.1-1-.1s-.8.1-1.2.6c-.4.4-1.5 1.5-1.5 3.7s1.5 4.3 1.7 4.6c.2.3 3 4.6 7.2 6.3 1 .4 1.8.7 2.4 1l.7.2c.8.3 1.6.3 2.3.1.7-.1 2-.8 2.3-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 20 21 12 3 4v6l9 2-9 2v6Z" />
    </svg>
  );
}

export function ContactSection({ restaurant }: { restaurant: Restaurant }) {
  const [values, setValues] = useState<ContactFormValues>(defaultValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ContactFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Veuillez renseigner votre nom.";
    }

    if (!values.date) {
      nextErrors.date = "Veuillez choisir une date.";
    }

    if (!values.time) {
      nextErrors.time = "Veuillez choisir une heure.";
    }

    if (!values.guests.trim()) {
      nextErrors.guests = "Veuillez indiquer le nombre de personnes.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const whatsappNumber = formatWhatsAppNumber(restaurant.contact.whatsapp);
    const message = [
      "Bonjour Le Patio de Cotonou, je souhaite réserver une table.",
      `Nom : ${values.name.trim()}`,
      `Date : ${values.date}`,
      `Heure : ${values.time}`,
      `Nombre de personnes : ${values.guests}`,
      `Message : ${values.message.trim() || "Aucun message complémentaire."}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setValues(defaultValues);
    setErrors({});
  };

  const infoCards = [
    {
      label: "Adresse",
      value: restaurant.contact.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.contact.address}, ${restaurant.contact.city}, ${restaurant.contact.country}`)}`,
      icon: <LocationIcon />,
    },
    {
      label: "Horaires",
      value: restaurant.contact.hours?.[0] ?? "12:00 - 23:00",
      href: undefined,
      icon: <ClockIcon />,
    },
    {
      label: "Téléphone",
      value: restaurant.contact.phone,
      href: `tel:${restaurant.contact.phone.replace(/\s+/g, "")}`,
      icon: <PhoneIcon />,
    },
    {
      label: "WhatsApp",
      value: restaurant.contact.whatsapp,
      href: `https://wa.me/${formatWhatsAppNumber(restaurant.contact.whatsapp)}`,
      icon: <WhatsAppIcon />,
    },
    {
      label: "E-mail",
      value: restaurant.contact.email ?? "bonjour@lepatio-cotonou.bj",
      href: `mailto:${restaurant.contact.email ?? "bonjour@lepatio-cotonou.bj"}`,
      icon: <MailIcon />,
    },
  ];

  return (
    <section id="contact" className="bg-[#FFF7ED] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: restaurant.theme.primary }}
          >
            {restaurant.contactSection.label}
          </p>

          <h2
            className="text-3xl font-semibold tracking-[-0.04em] text-[#1C1917] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif", textWrap: "balance" }}
          >
            {restaurant.contactSection.title}
          </h2>

          <p className="mt-4 text-base leading-7 text-[#78716C] sm:text-lg">{restaurant.contactSection.intro}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <div className="space-y-4">
            {infoCards.map((item) => {
              const cardContent = (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FDE7D9] text-[#F97316]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">{item.label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-[#1C1917] sm:text-base">{item.value}</p>
                  </div>
                </>
              );

              if (!item.href) {
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-[1.5rem] border border-[#F5E7DA] bg-white p-4 shadow-[0_14px_28px_rgba(28,25,23,0.04)]"
                  >
                    {cardContent}
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-start gap-3 rounded-[1.5rem] border border-[#F5E7DA] bg-white p-4 shadow-[0_14px_28px_rgba(28,25,23,0.04)] transition-colors duration-200 hover:border-[#F9C7A7] hover:bg-[#fffaf5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/60"
                >
                  {cardContent}
                </a>
              );
            })}
          </div>

          <form id="contact-form" onSubmit={handleSubmit} noValidate className="rounded-[1.75rem] border border-[#F5E7DA] bg-white p-4 shadow-[0_18px_42px_rgba(28,25,23,0.05)] sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[#1C1917]">
                  Nom complet
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className="w-full rounded-2xl border border-[#E7DDD3] bg-[#FFFDFB] px-3.5 py-3 text-base text-[#1C1917] shadow-inner outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  placeholder="Votre nom"
                  required
                />
                {errors.name ? (
                  <p id="contact-name-error" className="mt-2 text-sm text-[#B91C1C]">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-date" className="mb-2 block text-sm font-medium text-[#1C1917]">
                  Date
                </label>
                <input
                  id="contact-date"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "contact-date-error" : undefined}
                  className="w-full rounded-2xl border border-[#E7DDD3] bg-[#FFFDFB] px-3.5 py-3 text-base text-[#1C1917] shadow-inner outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  required
                />
                {errors.date ? (
                  <p id="contact-date-error" className="mt-2 text-sm text-[#B91C1C]">{errors.date}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-time" className="mb-2 block text-sm font-medium text-[#1C1917]">
                  Heure
                </label>
                <input
                  id="contact-time"
                  name="time"
                  type="time"
                  value={values.time}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? "contact-time-error" : undefined}
                  className="w-full rounded-2xl border border-[#E7DDD3] bg-[#FFFDFB] px-3.5 py-3 text-base text-[#1C1917] shadow-inner outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  required
                />
                {errors.time ? (
                  <p id="contact-time-error" className="mt-2 text-sm text-[#B91C1C]">{errors.time}</p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-guests" className="mb-2 block text-sm font-medium text-[#1C1917]">
                  Nombre de personnes
                </label>
                <input
                  id="contact-guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="20"
                  placeholder="2"
                  value={values.guests}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={errors.guests ? "contact-guests-error" : undefined}
                  className="w-full rounded-2xl border border-[#E7DDD3] bg-[#FFFDFB] px-3.5 py-3 text-base text-[#1C1917] shadow-inner outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  required
                />
                {errors.guests ? (
                  <p id="contact-guests-error" className="mt-2 text-sm text-[#B91C1C]">{errors.guests}</p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[#1C1917]">
                  Message (optionnel)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-[#E7DDD3] bg-[#FFFDFB] px-3.5 py-3 text-base text-[#1C1917] shadow-inner outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  placeholder="Un emplacement particulier, une occasion spéciale ou une demande spécifique ?"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={
                  restaurant.contact.mapUrl ||
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.contact.address}, ${restaurant.contact.city}, ${restaurant.contact.country}`)}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#F5E7DA] bg-[#FFFDFB] px-5 py-3.5 text-sm font-semibold text-[#1C1917] transition-colors hover:border-[#F9C7A7] hover:bg-[#fffaf5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/60"
              >
                <LocationIcon />
                Voir la localisation
              </a>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(249,115,22,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
                style={{ backgroundColor: restaurant.theme.primary }}
              >
                <SendIcon />
                Envoyer la demande
              </button>
            </div>
          </form>
        </div>

        {restaurant.contact.mapEmbedUrl ? (
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#F5E7DA] bg-white shadow-[0_18px_42px_rgba(28,25,23,0.05)]">
            <iframe
              src={restaurant.contact.mapEmbedUrl}
              title={`${restaurant.brand.name} localisation`}
              loading="lazy"
              className="h-[300px] w-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
