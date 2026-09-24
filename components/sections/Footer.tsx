import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V7.2c0-.9.5-1.3 1.4-1.3H16V3.1c-.3-.1-1.2-.1-2.3-.1-2.2 0-3.7 1.3-3.7 3.8V10H7.5v3h2.5v8h3.5Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M15.7 3c.5 1.5 1.8 2.6 3.3 3.2v2.7c-1.4-.1-2.8-.5-4.1-1.2v6.1c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6S6.2 7.4 9.3 7.4c.3 0 .6 0 .9.1V10c-.3 0-.6-.1-.9-.1-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V3h3.7Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M18.9 3h3.3l-7.2 8.2L22.8 21h-6.5l-5.1-7.2L5.4 21H2l7.7-8.8L1.2 3h6.6l4.6 6.6L18.9 3Zm-1.1 16.2h1.8L7.4 4.7H5.5l12.3 14.5Z" />
    </svg>
  );
}

function getSocialIcon(icon: "instagram" | "facebook" | "tiktok" | "x") {
  switch (icon) {
    case "instagram":
      return <InstagramIcon />;
    case "facebook":
      return <FacebookIcon />;
    case "tiktok":
      return <TikTokIcon />;
    case "x":
      return <XIcon />;
    default:
      return null;
  }
}

export function Footer({ restaurant }: { restaurant: Restaurant }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1917] text-[#F5F5F4]">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316]/15 text-[#F9C7A7]">
                <img src={restaurant.brand.logo} alt={restaurant.brand.name} className="h-7 w-7 object-contain" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F9C7A7]">Restaurant</p>
                <p className="text-lg font-semibold text-white">{restaurant.brand.name}</p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#D6D3D1]">{restaurant.footer.text}</p>

            <div className="mt-5 flex items-center gap-3">
              {restaurant.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F5F5F4] transition-colors hover:border-[#F97316]/60 hover:text-[#F9C7A7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/60"
                >
                  {getSocialIcon(item.icon)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F9C7A7]">Navigation</p>
            <nav className="mt-4 space-y-3 text-sm text-[#E7E5E4]">
              {restaurant.footer.links.map((link) => (
                <a key={link.label} href={link.href} className="block transition-opacity hover:opacity-80">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F9C7A7]">Horaires</p>
            <p className="mt-4 text-sm leading-7 text-[#E7E5E4]">{restaurant.footer.hours}</p>
            <p className="mt-4 text-sm text-[#E7E5E4]">{restaurant.contact.address}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-[#D6D3D1] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {restaurant.brand.name}. Tous droits réservés.</p>
          <p>{restaurant.footer.hours}</p>
        </div>
      </Container>
    </footer>
  );
}
