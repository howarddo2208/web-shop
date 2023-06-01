import { Button } from "./ui/button";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/db/schema";

interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export const ProductCard = ({
  product,
  aspectRatio,
  width,
  height,
  className,
  ...props
}: ProductProps) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm text-center">
        <h3 className="text-2xl font-bold leading-none">{product.name}</h3>
        <p className="text-xs text-muted-foreground">
          <span className="line-through">{product.defaultPrice}$</span>{" "}
          {product.currentPrice}$
        </p>
        <Button variant='default'>Add to cart</Button>
      </div>
    </div>
  );
};
