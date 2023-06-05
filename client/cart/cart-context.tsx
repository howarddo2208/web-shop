'use client'
import { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/db/schema";
import { CartActionType, cartReducer } from "./cart-reducer";
import { Cart, CartContextType } from "@/types";

const CartContext = createContext<CartContextType|null>(null);

const getLocalCartData = (): Cart => {
  let localCartData = localStorage.getItem("cart");
  if (!localCartData) {
    return { products: [], itemsNum: 0, subTotal: 0 };
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = typeof window !== 'undefined' ? getLocalCartData() : { products: [], itemsNum: 0, subTotal: 0 };

const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type:CartActionType.ADD_TO_CART, payload: { product } });
  };

  const setDecrease = (id: number) => {
    dispatch({ type: CartActionType.SET_DECREMENT, payload: id });
  };

  const setIncrease = (id: number) => {
    dispatch({ type: CartActionType.SET_INCREMENT, payload: id });
  };

  const removeItem = (id: number) => {
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.CLEAR_CART});
  };

  useEffect(() => {
    dispatch({ type: CartActionType.CALC_ITEMS_NUM});
    dispatch({ type: CartActionType.CALC_SUBTOTAL });
    localStorage.setItem("cart", JSON.stringify({ ...state }));
  }, [state.products]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        setDecrease,
        setIncrease,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
