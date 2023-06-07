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
    }
    const order = await db.insert(OrdersTable).values(newOrder)
    console.log(order)
    //create order items
    const orderItems: NewOrderItem[] = cart.products.map((product) => ({
      orderId: Number(order.insertId),
      productId: product.id,
      quantity: product.quantity,
    }))
    const resultOrderItems = await db.insert(OrderItemsTable).values(orderItems)
    console.log(resultOrderItems)

    // TODO: reduce product stock

    return order.insertId
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 100,
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${redirectPaymentURL}/payment?orderId=${orderId}&success=true`,
    cancel_url: `${redirectPaymentURL}/payment?orderId=${orderId}&cancelled=true`,
  })
  return session
}

export { createOrder }
