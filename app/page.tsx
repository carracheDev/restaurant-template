import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { restaurant } from "@/content/restaurant";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.brand.name,
  description: restaurant.brand.description,
  image: `${restaurant.brand.logo}`,
  telephone: restaurant.contact.phone,
  email: restaurant.contact.email,
  url: "https://lepatio-cotonou.bj",
  servesCuisine: ["Cuisine béninoise"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.contact.address,
    addressLocality: restaurant.contact.city,
    addressCountry: restaurant.contact.country,
  },
  openingHours: [
    "Mo-Fr 12:00-22:00",
    "Sa-Su 11:30-23:00",
  ],
  sameAs: [
    restaurant.socialLinks.instagram,
    restaurant.socialLinks.facebook,
    restaurant.socialLinks.tiktok,
  ].filter(Boolean),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="top">
        <HeroSection restaurant={restaurant} />
        <AboutSection restaurant={restaurant} />
        <MenuSection restaurant={restaurant} />
        <GallerySection restaurant={restaurant} />
        <ContactSection restaurant={restaurant} />
        <Footer restaurant={restaurant} />
      </main>
    </>
  );
}
