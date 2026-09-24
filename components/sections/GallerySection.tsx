'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

const palettePlaceholder = "linear-gradient(135deg, #F8F1E8 0%, #FFF7ED 100%)";

export function GallerySection({ restaurant }: { restaurant: Restaurant }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const images = restaurant.gallery.images ?? [];
  const activeItem = selectedIndex !== null ? images[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => {
          if (current === null) {
            return 0;
          }
          return (current + 1) % images.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => {
          if (current === null) {
            return images.length - 1;
          }
          return (current - 1 + images.length) % images.length;
        });
      }
    };

    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, selectedIndex]);

  const showPrevious = () => {
    if (selectedIndex === null) {
      return;
    }
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const showNext = () => {
    if (selectedIndex === null) {
      return;
    }
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <section id="galerie" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: restaurant.theme.primary }}
          >
            {restaurant.gallery.label}
          </p>

          <h2
            className="text-3xl font-semibold tracking-[-0.04em] text-[#1C1917] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif", textWrap: "balance" }}
          >
            {restaurant.gallery.title}
          </h2>

          <p className="mt-4 text-base leading-7 text-[#78716C] sm:text-lg">{restaurant.gallery.intro}</p>
        </div>

        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[260px] md:grid-cols-3 md:grid-flow-dense">
          {images.map((item, index) => {
            const failed = Boolean(failedImages[item.id]);
            const baseCardSpanClass =
              item.span === "feature"
                ? "col-span-2 md:col-span-2 md:row-span-2"
                : item.span === "square"
                  ? ""
                  : item.span === "wide"
                    ? "col-span-2 md:col-span-1"
                    : "";
            const cardSpanClass = item.id === "gallery-salle" ? "col-span-2 md:col-span-1" : baseCardSpanClass;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group relative block h-full overflow-hidden rounded-[1.5rem] border border-[#F5E7DA] bg-[#F9F3ED] text-left shadow-[0_14px_28px_rgba(28,25,23,0.04)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70 ${cardSpanClass}`}
                aria-label={`Ouvrir ${item.title}`}
              >
                <div className="relative h-full w-full overflow-hidden">
                  {failed || !item.src ? (
                    <div className="flex h-full w-full items-center justify-center" style={{ background: palettePlaceholder }}>
                      <div className="flex flex-col items-center gap-2 text-[#1C1917]">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#78716C]">Galerie</span>
                        <span className="text-sm font-medium" style={{ color: restaurant.theme.primary }}>{item.title}</span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={() => {
                        setFailedImages((previous) => ({
                          ...previous,
                          [item.id]: true,
                        }));
                      }}
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C1917]/65 via-[#1C1917]/10 to-transparent p-3 sm:p-4">
                    <span className="text-sm font-medium text-white">{item.title}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Container>

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/75 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedIndex(null);
            }
          }}
        >
          <div className="relative w-full max-w-5xl">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute -right-2 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#1C1917]/65 text-xl text-white backdrop-blur-sm transition hover:bg-[#1C1917]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fermer la galerie"
            >
              ×
            </button>

            <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#FFF7ED] shadow-[0_24px_90px_rgba(28,25,23,0.32)]">
              <div className="relative h-[48vh] max-h-[70vh] overflow-hidden sm:h-[60vh]">
                {failedImages[activeItem.id] || !activeItem.src ? (
                  <div className="flex h-full w-full items-center justify-center" style={{ background: palettePlaceholder }}>
                    <div className="flex flex-col items-center gap-2 text-[#1C1917]">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#78716C]">Galerie</span>
                      <span className="text-base font-medium" style={{ color: restaurant.theme.primary }}>{activeItem.title}</span>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    sizes="90vw"
                    className="h-full w-full object-contain"
                    onError={() => {
                      setFailedImages((previous) => ({
                        ...previous,
                        [activeItem.id]: true,
                      }));
                    }}
                  />
                )}
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#78716C]">{restaurant.gallery.label}</p>
                  <p className="mt-1 text-base font-semibold text-[#1C1917]">{activeItem.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5E7DA] bg-white text-lg text-[#1C1917] transition hover:border-[#F97316] hover:text-[#F97316] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
                    aria-label="Image précédente"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5E7DA] bg-white text-lg text-[#1C1917] transition hover:border-[#F97316] hover:text-[#F97316] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
                    aria-label="Image suivante"
                  >
                    ›
                  </button>
                </div>
              </div>

              <p className="px-4 pb-4 text-sm leading-6 text-[#57534E] sm:px-6 sm:pb-6">{activeItem.alt}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
