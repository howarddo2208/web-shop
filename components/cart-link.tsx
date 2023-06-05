"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Icons } from "@/components/icons";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useCartContext } from "@/client/cart/cart-context";
import { CartContextType } from "@/types";

export const CartLink = () => {
  const cart = useCartContext() as CartContextType
  return (
    <HoverCard>
      <HoverCardTrigger
        href="/cart"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "cursor-pointer relative"
        )}
      >
        <Icons.cart />
        {/* display number of items  */}
        <span className="absolute -top-1 right-0 text-xs text-white bg-primary rounded-full w-4 h-4 flex items-center justify-center">
          {cart.itemsNum}
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        {/* list of items in cart  */}
        <div className="space-y-2">
          {cart.products.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  width={50}
                  height={30}
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8"
                />
                <div className="flex flex-col">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm font-bold leading-none"
                  >
                    {item.name}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {item.quantity} x {item.currentPrice}$
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.quantity * item.currentPrice}$
              </span>
            </div>
          ))}
        </div>
        {/* total price  */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-bold leading-none">Total</span>
          <span className="text-sm font-bold leading-none">
            {cart.subTotal}$
          </span>
        </div>
        {/* checkout button  */}
        <Link
          href="/checkout"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "mt-2 flex"
          )}
        >
          Checkout
        </Link>
      </HoverCardContent>
    </HoverCard>
  )
};
