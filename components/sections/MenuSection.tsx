'use client';

import Image from "next/image";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

export type MenuSectionProps = {
  restaurant: Restaurant;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type DeliveryMode = "sur-place" | "a-emporter" | "livraison";

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("sur-place");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const visibleCategory = useMemo(() => {
    return restaurant.menu.find((category) => category.id === selectedCategory) ?? restaurant.menu[0];
  }, [restaurant.menu, selectedCategory]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (dish: { id: string; name: string; price: number }) => {
    setCart((current) => {
      const next = [...current];
      const existing = next.find((item) => item.id === dish.id);

      if (existing) {
        existing.quantity += 1;
        return next;
      }

      next.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      });

      return next;
    });

    setCartOpen(true);
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setCart((current) => {
      const next = current
        .map((item) => {
          if (item.id !== dishId) {
            return item;
          }

          return { ...item, quantity: item.quantity + delta };
        })
        .filter((item) => item.quantity > 0);

      return next;
    });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("La géolocalisation n'est pas disponible sur cet appareil.");
      setErrorMessage("La géolocalisation n'est pas disponible sur cet appareil.");
      return;
    }

    setLocationStatus("Localisation en cours...");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const detectedAddress = `Latitude ${coords.latitude.toFixed(5)}, Longitude ${coords.longitude.toFixed(5)}`;
        setCustomerAddress(detectedAddress);
        setLocationStatus("Position détectée et ajoutée à votre commande.");
      },
      () => {
        setLocationStatus("Impossible de récupérer votre position. Merci d’entrer votre adresse manuellement.");
        setErrorMessage("Impossible de récupérer votre position. Merci d’entrer votre adresse manuellement.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  const handleSubmitOrder = () => {
    if (!customerName.trim()) {
      setErrorMessage("Veuillez renseigner votre nom.");
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage("Veuillez renseigner votre téléphone.");
      return;
    }

    if (deliveryMode === "livraison" && !customerAddress.trim()) {
      setErrorMessage("Veuillez renseigner votre adresse de livraison.");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Votre panier est vide.");
      return;
    }

    const itemsText = cart
      .map((item) => `- ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
      .join("\n");

    const modeLabel =
      deliveryMode === "sur-place"
        ? "Sur place"
        : deliveryMode === "a-emporter"
          ? "À emporter"
          : "Livraison";

    const payload = [
      "Bonjour Le Patio de Cotonou, je souhaite passer une commande.",
      "",
      "Commande :",
      itemsText,
      "",
      `Total : ${formatPrice(subtotal)}`,
      `Mode : ${modeLabel}`,
      `Nom : ${customerName.trim()}`,
      `Téléphone : ${customerPhone.trim()}`,
      deliveryMode === "livraison" ? `Adresse : ${customerAddress.trim()}` : "",
      customerNotes.trim() ? `Note : ${customerNotes.trim()}` : "",
      "",
      "Merci.",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${restaurant.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(payload)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setCart([]);
    setCartOpen(false);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setCustomerNotes("");
    setLocationStatus("");
    setDeliveryMode("sur-place");
    setErrorMessage("");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => addToCart(dish)}
                          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                          style={{ backgroundColor: restaurant.theme.primary }}
                        >
                          Ajouter
                        </button>

                        {cart.some((item) => item.id === dish.id) ? (
                          <span className="text-sm font-medium text-[#1C1917]">
                            {cart.find((item) => item.id === dish.id)?.quantity ?? 0} dans le panier
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_30px_rgba(249,115,22,0.20)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: restaurant.theme.primary }}
            disabled={cart.length === 0}
          >
            {cart.length > 0 ? `Voir ma commande (${cartCount})` : "Commander sur WhatsApp"}
          </button>
        </div>
      </Container>

      {cart.length > 0 ? (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(249,115,22,0.28)] transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: restaurant.theme.primary }}
          aria-label="Ouvrir le panier"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs">{cartCount}</span>
          Panier
        </button>
      ) : null}

      {cartOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/65 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setCartOpen(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-[1.75rem] border border-[#F5E7DA] bg-white p-4 shadow-[0_24px_80px_rgba(28,25,23,0.24)] sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#F2E9E2] pb-3">
              <h3 className="text-2xl font-semibold text-[#1C1917]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                Ma commande
              </h3>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5E7DA] text-lg text-[#1C1917] hover:border-[#F97316] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/60"
                aria-label="Fermer le panier"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F5E7DA] bg-[#FFFDFB] p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1C1917]">{item.name}</p>
                    <p className="text-xs text-[#78716C]">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5E7DA] text-lg text-[#1C1917] hover:border-[#F97316] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
                      aria-label={`Retirer ${item.name}`}
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold text-[#1C1917]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5E7DA] text-lg text-[#1C1917] hover:border-[#F97316] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
                      aria-label={`Ajouter ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-[#F5E7DA] bg-[#FFF7ED] p-3">
              <div className="flex items-center justify-between text-sm font-medium text-[#1C1917]">
                <span>Mode de service</span>
                <span className="text-[#F97316]">{cartCount} article{cartCount > 1 ? "s" : ""}</span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { value: "sur-place", label: "Sur place" },
                  { value: "a-emporter", label: "À emporter" },
                  { value: "livraison", label: "Livraison" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDeliveryMode(option.value as DeliveryMode)}
                    className={`rounded-xl border px-2 py-2 text-xs font-medium transition-colors ${
                      deliveryMode === option.value
                        ? "border-[#F97316] bg-[#F97316]/10 text-[#F97316]"
                        : "border-[#E7DDD3] bg-white text-[#1C1917]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-sm font-medium text-[#1C1917]">
                Votre prénom
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E7DDD3] bg-[#FFFDFB] px-3 py-2.5 text-sm text-[#1C1917] outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  placeholder="Votre prénom"
                />
              </label>

              <label className="block text-sm font-medium text-[#1C1917]">
                Téléphone
                <input
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E7DDD3] bg-[#FFFDFB] px-3 py-2.5 text-sm text-[#1C1917] outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  placeholder="0141193597"
                />
              </label>

              {deliveryMode === "livraison" ? (
                <div>
                  <label className="block text-sm font-medium text-[#1C1917]">
                    Adresse de livraison
                    <input
                      value={customerAddress}
                      onChange={(event) => setCustomerAddress(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#E7DDD3] bg-[#FFFDFB] px-3 py-2.5 text-sm text-[#1C1917] outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                      placeholder="Adresse complète"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="mt-2 inline-flex items-center justify-center rounded-full border border-[#F5E7DA] bg-[#FFFDFB] px-3 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:border-[#F9C7A7] hover:bg-[#fffaf5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/60"
                  >
                    Utiliser ma position
                  </button>

                  {locationStatus ? <p className="mt-2 text-xs text-[#78716C]">{locationStatus}</p> : null}
                </div>
              ) : null}

              <label className="block text-sm font-medium text-[#1C1917]">
                Notes (optionnel)
                <textarea
                  rows={3}
                  value={customerNotes}
                  onChange={(event) => setCustomerNotes(event.target.value)}
                  className="mt-1 w-full resize-none rounded-xl border border-[#E7DDD3] bg-[#FFFDFB] px-3 py-2.5 text-sm text-[#1C1917] outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  placeholder="Ex : sans oignon, livraison rapide..."
                />
              </label>
            </div>

            {errorMessage ? (
              <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
            ) : null}

            <div className="mt-5 flex items-center justify-between border-t border-[#F2E9E2] pt-4 text-lg font-semibold text-[#1C1917]">
              <span>Total</span>
              <span style={{ color: restaurant.theme.primary }}>{formatPrice(subtotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleSubmitOrder}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(249,115,22,0.28)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
              style={{ backgroundColor: restaurant.theme.primary }}
            >
              Envoyer sur WhatsApp
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
