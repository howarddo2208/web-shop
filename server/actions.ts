'use server'

import { db } from '@/db/drizzle'
import {
  NewOrder,
  NewOrderItem,
  OrderItemsTable,
  OrdersTable,
} from '@/db/schema'
import { Cart, CreateOrderRequest } from '@/types'

const createOrder = async (orderInfo: CreateOrderRequest) => {
  const { shippingInfo, cart } = orderInfo
  db.transaction(async (tx) => {
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

    // TODO: create payment

    // TODO: navigate to payment page
  })
}

export { createOrder }
