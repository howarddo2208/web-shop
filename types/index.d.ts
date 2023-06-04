import { Product } from "@/db/schema";
import { z } from "zod";

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

export type CartItem = Product & { quantity: number };
export type Cart = {items: CartItem[], subTotal: number };
