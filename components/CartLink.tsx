"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Icons } from "@/components/icons";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export const CartLink = () => {
  const [cart, setCart] = React.useState(
    localStorage.getItem("cart") || '{"items":[],"total":0}'
  );
  useEffect(() => {
    window.addEventListener("cart-updated", () => {
      console.log("cart updated");
      setCart(localStorage.getItem("cart") || '{"items":[],"total":0}');
    });
  }, []);
  // if there is no cart in local storage, create an empty one with items and total property
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
          {JSON.parse(cart).items.length}
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        {/* list of items in cart  */}
        <div className="space-y-2">
          {JSON.parse(cart).items.map((item: any) => (
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
            {JSON.parse(cart).total}$
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
  );
};
