import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { restaurant } from "@/content/restaurant";

export default function Home() {
  return (
    <main id="top">
      <HeroSection restaurant={restaurant} />
      <AboutSection restaurant={restaurant} />
      <MenuSection restaurant={restaurant} />
      <GallerySection restaurant={restaurant} />
      <ContactSection restaurant={restaurant} />
      <Footer restaurant={restaurant} />
    </main>
  );
}
