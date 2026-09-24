import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";

import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

function HighlightIcon({ id }: { id: "leaf" | "chef" | "candle" }) {
  const baseClassName = "h-6 w-6 text-[#F97316]";

  const icons = {
    leaf: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClassName} fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M19 3c-2.7 0-5.3 1.1-7.1 3.1C9.8 8.3 8.5 10.9 8.4 14c0 0 3.6 1.2 6.6 0 2.8-1.2 4.8-4 4.8-8.1V3Z" />
        <path d="M8 16c1.4-3.5 4.2-5.2 8-6.2" />
        <path d="M5.5 18.5c2-4.1 5.1-6.1 9.9-6.8" />
      </svg>
    ),
    chef: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClassName} fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M6 18.5V10c0-1.6 1.3-3 3-3h6c1.7 0 3 1.4 3 3v8.5" />
        <path d="M9 7V5.7A2.7 2.7 0 0 1 11.7 3h.6A2.7 2.7 0 0 1 15 5.7V7" />
        <path d="M9.5 11.5h5" />
        <path d="M12 8.5v3" />
      </svg>
    ),
    candle: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClassName} fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M13.5 3.5c0 2.1-1.3 3.2-1.3 5.4s1.3 3.2 1.3 5.4a2.5 2.5 0 1 1-5 0c0-2.2 1.3-3.2 1.3-5.4S8.5 5.6 8.5 3.5h5Z" />
        <path d="M12 13.5V18m-5 2h10" />
        <path d="M9.5 12.5h5" />
      </svg>
    ),
  };

  return icons[id] ?? icons.leaf;
}

export function AboutSection({ restaurant }: { restaurant: Restaurant }) {
  const hasAboutImage = existsSync(join(process.cwd(), "public", "images", "restaurant", "about.jpg"));

  return (
    <section id="restaurant" className="bg-[#FFFFFF] py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: restaurant.theme.primary }}
            >
              {restaurant.about.label}
            </p>

            <h2
              className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#1C1917] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display), Georgia, serif", textWrap: "balance" }}
            >
              {restaurant.about.title}
            </h2>

            <div className="mt-5 space-y-4 text-base leading-7 text-[#57534E] sm:text-lg">
              {restaurant.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {restaurant.about.highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex items-center gap-2 rounded-full border border-[#F5E7DA] bg-[#FFF7ED] px-3 py-2.5 text-sm font-medium text-[#1C1917]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <HighlightIcon id={highlight.icon} />
                  </span>
                  {highlight.title}
                </div>
              ))}
            </div>

            {restaurant.about.stats.length > 0 ? (
              <div className="mt-8 grid gap-3 border-t border-[#F5E7DA] pt-5 sm:grid-cols-3">
                {restaurant.about.stats.map((stat) => (
                  <div key={stat.label} className="text-left">
                    <p className="text-2xl font-semibold text-[#1C1917]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#78716C]">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            {hasAboutImage ? (
              <div className="relative overflow-hidden rounded-[2rem] border border-[#F5E7DA] bg-[#F8F1E8] shadow-[0_24px_50px_rgba(28,25,23,0.06)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={restaurant.about.image}
                    alt="Intérieur chaleureux du restaurant Le Patio de Cotonou, tables élégantes et ambiance premium"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[#F5E7DA] bg-[#FFF7ED] shadow-[0_24px_50px_rgba(28,25,23,0.04)]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#F7D7B5] bg-white/80">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M6 18h12l-1.5-8.5A4.5 4.5 0 0 0 12 6a4.5 4.5 0 0 0-4.5 3.5L6 18Z" />
                    <path d="M9 18v2m6-2v2" />
                    <path d="M9.5 10.5h5" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
