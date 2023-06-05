import { Product } from "@/db/schema";
import { CartItem } from "@/types";

export const getCart = (): { items: CartItem[]; subTotal: number } => {
  if (!localStorage.getItem("cart")) {
    const defaultCart = { items: [], subTotal: 0 };
    localStorage.setItem("cart", JSON.stringify(defaultCart));
    return defaultCart;
  }
  return JSON.parse(localStorage.getItem("cart") || "{}");
};

export const addCart = (product: Product) => {
  const cart = getCart();
  const cartItem = cart.items.find((item) => item.id === product.id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
  cart.subTotal += product.currentPrice;
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const changeCartQuantity = (item: CartItem, change: number) => {
  const cart = getCart();
  const newQuantity = item.quantity + change;
  if (newQuantity < 1) {
    return deleteCartItem(item)
  }
  const newCart = {
    items: cart.items.map((i) => {
      if (i.id === item.id) {
        return {
          ...i,
          quantity: newQuantity,
        };
      }
      return i;
    }),
    subTotal: cart.subTotal + change * item.currentPrice,
  };
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const deleteCartItem = (item: CartItem) => {
  const cart = getCart();
  const newCart = {
    items: cart.items.filter((i) => i.id !== item.id),
    subTotal: cart.subTotal - item.quantity * item.currentPrice,
  };
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.dispatchEvent(new Event("cart-updated"));
}

export const clearCart = () => {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cart-updated"));
}
