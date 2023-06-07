'use server'

import { db } from '@/db/drizzle'
import {
  NewOrder,
  NewOrderItem,
  OrderItemsTable,
  OrdersTable,
} from '@/db/schema'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'
import { Cart, CreateOrderRequest } from '@/types'

const redirectPaymentURL = absoluteUrl('/')

const createOrder = async (orderInfo: CreateOrderRequest) => {
  const { shippingInfo, cart } = orderInfo
  const orderId = await db.transaction(async (tx) => {
    const newOrder: NewOrder = {
      ...shippingInfo,
      status: 'PENDING',
      total: cart.subTotal,
    }
    const order = await db.insert(OrdersTable).values(newOrder)
    //create order items
    const orderItems: NewOrderItem[] = cart.products.map((product) => ({
      orderId: Number(order.insertId),
      productId: product.id,
      quantity: product.quantity,
    }))
    const resultOrderItems = await db.insert(OrderItemsTable).values(orderItems)

    // TODO: reduce product stock

    return order.insertId
  })

  // stripe payment
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      ...cart.products.map((product) => ({
        price_data: {
          currency: 'usd',
          unit_amount: product.currentPrice * 100,
          product_data: {
            name: product.name,
            images: [product.image],
          },
        },
        quantity: product.quantity,
      })),
    ],
    metadata: {
      orderId: orderId,
    },
    customer_email: shippingInfo.email,
    mode: 'payment',
    success_url: `${redirectPaymentURL}/orders/${orderId}?success=true`,
    cancel_url: `${redirectPaymentURL}/orders/${orderId}?cancelled=true`,
  })
  return session
}

export { createOrder }
