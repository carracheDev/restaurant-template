'use client';

import Image from "next/image";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

export type MenuSectionProps = {
  restaurant: Restaurant;
};

function PlateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-[#F97316]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M4 12h16" />
      <path d="M12 4v16" />
      <path d="M7 16c1.5 1.8 3 2.7 5 2.7s3.5-.9 5-2.7" />
    </svg>
  );
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value)} FCFA`;
}

export function MenuSection({ restaurant }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(restaurant.menu[0]?.id ?? "");

  const visibleCategory = useMemo(() => {
    return restaurant.menu.find((category) => category.id === selectedCategory) ?? restaurant.menu[0];
  }, [restaurant.menu, selectedCategory]);

  const whatsappHref = `https://wa.me/${restaurant.contact.whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="menu" className="bg-[#FFF7ED] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: restaurant.theme.primary }}
          >
            {restaurant.menuSection?.eyebrow ?? "Menu"}
          </p>

          <h2
            className="text-3xl font-semibold tracking-[-0.04em] text-[#1C1917] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {restaurant.menuSection?.title ?? "Notre carte"}
          </h2>

          <p className="mt-4 text-base leading-7 text-[#78716C] sm:text-lg">
            {restaurant.menuSection?.intro ?? "Des saveurs authentiques et une cuisine généreuse, préparée avec soin."}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-2">
          <div className="flex min-w-max justify-center gap-3">
            {restaurant.menu.map((category) => {
              const isActive = category.id === visibleCategory?.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full border px-4 py-2.5 text-sm font-medium transition-colors sm:px-5"
                  style={{
                    backgroundColor: isActive ? restaurant.theme.primary : "rgba(255,255,255,0.8)",
                    borderColor: isActive ? restaurant.theme.primary : "rgba(249,115,22,0.18)",
                    color: isActive ? "#FFFFFF" : "#1C1917",
                    boxShadow: isActive ? "0 12px 24px rgba(249, 115, 22, 0.18)" : "none",
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {visibleCategory ? (
          <div className="mt-10">
            <div className="mb-6 text-left">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#78716C]">
                {visibleCategory.name}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleCategory.dishes.map((dish) => {
                const hasImage = Boolean(dish.image);

                return (
                  <article
                    key={dish.id}
                    className="overflow-hidden rounded-[1.5rem] border border-[#F5E7DA] bg-[#FFFFFF] shadow-[0_18px_35px_rgba(28,25,23,0.04)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F3ED]">
                      {hasImage ? (
                        <Image
                          src={dish.image as string}
                          alt={dish.alt ?? dish.name}
                          width={1200}
                          height={900}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#F8F1E8]">
                          <PlateIcon />
                        </div>
                      )}

                      {dish.badge ? (
                        <span
                          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white"
                          style={{ backgroundColor: restaurant.theme.primary }}
                        >
                          {dish.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold text-[#1C1917]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                          {dish.name}
                        </h3>
                        <span className="whitespace-nowrap text-base font-semibold text-[#F97316]">
                          {formatPrice(dish.price)}
                        </span>
                      </div>

                      <p className="text-sm leading-6 text-[#78716C]">{dish.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex justify-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_30px_rgba(249,115,22,0.20)] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: restaurant.theme.primary }}
          >
            Commander sur WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
