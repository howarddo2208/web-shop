import { Product } from "@/db/schema"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { ProductCard } from "./product-card"

interface ProductListProps {
  products: Product[]
}

export const ProductList = ({products}: ProductListProps) => {
  return (
      <ScrollArea>
        <div className="flex flex-wrap space-x-4 pb-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
  )
}

