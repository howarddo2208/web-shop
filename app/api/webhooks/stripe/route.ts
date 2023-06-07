import { headers } from 'next/headers'
import Stripe from 'stripe'

import { env } from '@/env.mjs'
import { db } from '@/db/drizzle'
import { stripe } from '@/lib/stripe'
import { OrdersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SIGNING_SECRET
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  console.log('rq body', body)

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const orderId = Number(session!.metadata!.orderId)
    await db
      .update(OrdersTable)
      .set({ status: 'PAID' })
      .where(eq(OrdersTable.id, orderId))
  }

  return new Response('received', { status: 200 })
}
