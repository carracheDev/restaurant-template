'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import type { Restaurant } from "@/types/restaurant";

export type HeroSectionProps = {
  restaurant: Restaurant;
};

function formatWhatsApp(phone: string) {
  return phone.replace(/\D/g, "");
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

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current" stroke="currentColor" strokeWidth="0.8">
      <path d="m12 2.8 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.2l6-.9L12 2.8Z" />
    </svg>
  );
}

export function HeroSection({ restaurant }: HeroSectionProps) {
  const [scrolled, setScrolled] = useState(false);
  const whatsappNumber = formatWhatsApp(restaurant.contact.whatsapp);
  const heroImage = restaurant.brand.heroImage ?? "/images/restaurant/hero.webp";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBackground = scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.08)";
  const navBorder = scrolled ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.28)";
  const navTextColor = scrolled ? "#1C1917" : "#FFFFFF";

  return (
    <header className="relative min-h-[100svh] overflow-hidden bg-[#fff] text-white">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${restaurant.brand.name} restaurant`}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(12,10,8,0.82) 0%, rgba(12,10,8,0.68) 30%, rgba(12,10,8,0.36) 62%, rgba(12,10,8,0.08) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.2),_transparent_30%)]" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col">
        <nav
          className="sticky top-0 z-20 mt-4 flex items-center justify-between gap-3 rounded-full border px-3 py-2.5 backdrop-blur-md transition-all duration-300 sm:mt-5 sm:px-4"
          style={{
            backgroundColor: navBackground,
            borderColor: navBorder,
            boxShadow: scrolled ? "0 10px 30px rgba(28,25,23,0.08)" : "none",
          }}
        >
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label={restaurant.brand.name}>
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/90">
              <Image
                src={restaurant.brand.logo}
                alt={`${restaurant.brand.name} logo`}
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="min-w-0 leading-none">
              <p
                className="text-[9px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: scrolled ? restaurant.theme.primary : "#F9C7A7" }}
              >
                Restaurant
              </p>
              <p
                className="truncate text-sm font-semibold sm:text-base"
                style={{ color: navTextColor }}
              >
                {restaurant.brand.name}
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-6 text-sm md:flex" style={{ color: navTextColor }}>
            <a href="#about" className="transition-opacity hover:opacity-80">
              Le restaurant
            </a>
            <a href="#menu" className="transition-opacity hover:opacity-80">
              Menu
            </a>
            <a href="#gallery" className="transition-opacity hover:opacity-80">
              Galerie
            </a>
            <a href="#contact" className="transition-opacity hover:opacity-80">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: restaurant.theme.primary }}
          >
            Réserver
          </a>
        </nav>

        <div className="flex flex-1 items-center pb-10 pt-10 sm:pb-14 md:pt-16">
          <div className="max-w-2xl">
            <Badge tone="accent" className="mb-5 border-white/25 bg-white/10 text-orange-100 backdrop-blur-sm">
              {restaurant.brand.tagline ?? "Cuisine du terroir, esprit moderne"}
            </Badge>

            <h1
              className="max-w-[500px] text-[clamp(2.2rem,4.4vw,4.6rem)] leading-[1.02] tracking-[-0.05em] text-white"
              style={{ fontFamily: "var(--font-display), Georgia, serif" }}
            >
              {restaurant.brand.slogan}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              {restaurant.brand.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white shadow-[0_20px_35px_rgba(249,115,22,0.35)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
                style={{ backgroundColor: restaurant.theme.primary }}
              >
                Commander sur WhatsApp
              </a>

              <a
                href="#menu"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/65 bg-white/0 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Découvrir le menu
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-3">
          <div className="flex justify-end">
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/20 bg-white/85 px-3 py-2 shadow-[0_15px_30px_rgba(12,10,8,0.18)] backdrop-blur-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-[#F97316]" style={{ backgroundColor: "rgba(249,115,22,0.12)" }}>
                <StarIcon />
              </div>
              <div className="leading-tight text-[#1C1917]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
                  Avis client
                </p>
                <p className="text-sm font-semibold">
                  {restaurant.testimonials[0]?.author ?? "Client satisfait"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6">
          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/15 bg-black/10 px-4 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#F9C7A7]">
                <LocationIcon />
              </span>
              <span>{restaurant.contact.address}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#F9C7A7]">
                <ClockIcon />
              </span>
              <span>Ouvert 7j/7 · 12h00 – 23h00</span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
