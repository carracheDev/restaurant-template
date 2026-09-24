export type Brand = {
  name: string;
  slogan: string;
  description: string;
  logo: string;
  heroImage?: string;
  tagline?: string;
};

export type Theme = {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  buttonStyle: "rounded" | "soft" | "minimal";
  cardStyle: "elevated" | "flat" | "glass";
  typography: {
    heading: string;
    body: string;
  };
};

export type Contact = {
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  city: string;
  country: string;
  hours?: string[];
  mapUrl?: string;
  mapEmbedUrl?: string;
};

export type OpeningHours = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  alt?: string;
  popular?: boolean;
  badge?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  dishes: Dish[];
};

export type GalleryItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  span?: "feature" | "wide" | "tall" | "square";
};

export type GallerySection = {
  label: string;
  title: string;
  intro: string;
  images: GalleryItem[];
};

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  quote: string;
  rating: number;
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "tiktok" | "x";
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterConfig = {
  text: string;
  hours: string;
  links: FooterLink[];
};

export type AboutHighlight = {
  id: string;
  title: string;
  icon: "leaf" | "chef" | "candle";
};

export type AboutStat = {
  label: string;
  value: string;
};

export type AboutSection = {
  label: string;
  title: string;
  paragraphs: string[];
  image: string;
  highlights: AboutHighlight[];
  stats: AboutStat[];
};

export type MenuSectionConfig = {
  eyebrow?: string;
  title: string;
  intro: string;
};

export type ContactSectionConfig = {
  label: string;
  title: string;
  intro: string;
};

export type Restaurant = {
  id: string;
  brand: Brand;
  theme: Theme;
  contact: Contact;
  contactSection: ContactSectionConfig;
  openingHours: OpeningHours[];
  socialLinks: SocialLinks;
  socials: SocialLink[];
  about: AboutSection;
  menuSection: MenuSectionConfig;
  menu: MenuCategory[];
  popularDishes: Dish[];
  gallery: GallerySection;
  testimonials: Testimonial[];
  footer: FooterConfig;
};
