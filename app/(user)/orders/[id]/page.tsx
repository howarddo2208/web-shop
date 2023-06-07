import { OrderCard } from '@/components/order-card'
import { db } from '@/db/drizzle'
import { OrdersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default async function PaymentPage({ params }: any) {
  const { id } = params
  const order = await db.query.OrdersTable.findFirst({
    where: eq(OrdersTable.id, id),
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
  })

  return order && <OrderCard order={order} />
}
