export interface Product {
  id: string;
  name: string;
  defaultPrice: number;
  image: string;
  currentPrice: number;
  stock: number;
}

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type HomeConfig = {
  mainNav: MainNavItem[];
};
