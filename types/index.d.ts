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

export type CartProduct = Product & { quantity: number };
export type Cart = { products: CartProduct[], subTotal: number, itemsNum: number, userId?: number };
export type CartContextType = Cart & {
  addToCart: (product: Product) => void;
  setDecrease: (id: number) => void;
  setIncrease: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export type CreateOrderRequest = {
  shippingInfo: z.infer<typeof shippingInfoSchema>;
  cart: Cart
}
