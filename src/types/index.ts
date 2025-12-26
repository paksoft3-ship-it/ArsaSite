// Site Configuration Types
export interface SiteConfig {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  logo: {
    text: string;
    icon: string;
  };
  contact: ContactInfo;
  social: SocialLinks;
  seo: SEOConfig;
  analytics: AnalyticsConfig;
  legal: LegalInfo;
}

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  phoneLink: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  emailLink: string;
  address: Address;
  workingHours: string;
}

export interface Address {
  full: string;
  short: string;
  district: string;
  city: string;
  country: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

export interface SEOConfig {
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
}

export interface AnalyticsConfig {
  googleAnalyticsId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  facebookPixelId: string;
}

export interface LegalInfo {
  companyName: string;
  taxNumber: string;
  registrationNumber: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  highlight?: boolean;
}

export interface Navigation {
  mainNav: NavItem[];
  footerNav: {
    quickLinks: { label: string; href: string }[];
    legal: { label: string; href: string }[];
    support: { label: string; href: string }[];
  };
  ctaButton: {
    label: string;
    href: string;
    icon: string;
  };
}

// Listing Types
export interface ListingCategory {
  id: string;
  label: string;
  color: string;
}

export interface ListingFeature {
  id: string;
  label: string;
  icon: string;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  city: string;
  district: string;
  neighborhood: string;
  size: number;
  adaParsel: string;
  price: number;
  pricePerM2: number;
  imarDurumu: string;
  gabroDurumu: string;
  features: string[];
  description: string;
  highlights: string[];
  images: string[];
  mainImage: string;
  photoCount: number;
  location: {
    lat: number;
    lng: number;
  };
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListingsData {
  categories: ListingCategory[];
  features: ListingFeature[];
  listings: Listing[];
  filters: {
    cities: { value: string; label: string }[];
    imarDurumu: { value: string; label: string }[];
    sizeRange: {
      min: number;
      max: number;
      step: number;
      unit: string;
    };
    sortOptions: { value: string; label: string }[];
  };
}

// Blog Types
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface BlogAuthor {
  name: string;
  title: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: BlogAuthor;
  image: string;
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  isFeatured: boolean;
  views: number;
}

export interface BlogData {
  categories: BlogCategory[];
  posts: BlogPost[];
  sidebar: {
    popularPosts: string[];
    newsletter: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  pagination: {
    postsPerPage: number;
  };
}

// FAQ Types
export interface FAQQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: string;
}

export interface FAQData {
  pageTitle: string;
  pageDescription: string;
  searchPlaceholder: string;
  categories: FAQCategory[];
  questions: FAQQuestion[];
  cta: {
    title: string;
    description: string;
    buttons: {
      primary: { label: string; href: string };
      secondary: { label: string; href: string };
    };
  };
}

// City Types
export interface City {
  id: number;
  name: string;
  slug: string;
}

export interface CitiesData {
  cities: City[];
  popularCities: string[];
}

// Form Types
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  city: string;
  district?: string;
  subject?: string;
  message: string;
  kvkkConsent: boolean;
}

export interface QuickOfferFormData {
  name: string;
  phone: string;
  city: string;
  district?: string;
  landType?: string;
  size?: number;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface SelectProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
