import { seed } from '@/db/seed'
import { db } from '@/db/drizzle'
import { ProductsTable } from '@/db/schema'
import { ProductList } from '@/components/product-list'

export default async function Home() {
  seed()
  const products = await db.select().from(ProductsTable).execute()
  return (
    <>
      <div className="mt-4">
        <ProductList products={products} />
      </div>
    </>
  )
}
