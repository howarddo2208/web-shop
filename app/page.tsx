import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  return (
    <>
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} className="w-[250px]" aspectRatio="portrait" width={250} height={330} />
          ))}
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </>
  );
}
