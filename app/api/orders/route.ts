import { db } from '@/db/drizzle'
import { OrdersTable } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  // const orders = await db.select().from(OrdersTable).where({
  //   userId: request.locals.userId,
  // });
  return NextResponse.json({
    message: 'hello',
  })
}

export async function POST(request: NextRequest) {
  const requestBody = await request.body.json()
  const { shippingInfo, cart } = z.infer<typeof CreateOrderRequest>(requestBody)
  const order = await db
    .insert({
      userId: request.locals.userId,
      items,
      total,
    })
    .into(OrdersTable)
  return NextResponse.json(order)
}
