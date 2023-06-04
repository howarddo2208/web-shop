"use client"

import { changeCartQuantity, getCart } from "@/lib/cart"
import { CartItem } from "@/types"
import { useState } from "react"
import Image from "next/image"
import Link from 'next/link'

export const CartInfo = () => {
  const [cart, setCart] = useState(getCart())

  const changeQuantity = (item: CartItem, num: number) => {
    changeCartQuantity(item, num)
    setCart(getCart())
  }

  return (

    <div className="flex flex-col">
      <h2 className="text-3xl font-bold mb-4">Your order</h2>
      <div className="flex flex-col">
        {/* list of items in cart  */}
        <div className="space-y-4">
          {cart.items.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-transparent ring rounded-md ring-gray-100 pr-4"
            >
              <Image
                width={200}
                height={200}
                src={item.image}
                alt={item.name}
                className="aspect-square rounded-md"
              />
              <Link
                href={`/products/${item.slug}`}
                className="text-2xl font-bold leading-none"
              >
                {item.name}
              </Link>

              <div className="flex items-center">
                <button
                  className="text-2xl leading-none"
                  onClick={() => changeQuantity(item, -1)}
                >
                  -
                </button>
                <span className="text-xl w-14 text-center">{item.quantity}</span>
                <button
                  className="text-2xl leading-none"
                  onClick={() => changeQuantity(item, +1)}
                >
                  +
                </button>
              </div>

              <span className="text-2xl font-bold">
                {item.currentPrice * item.quantity}$
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex justify-between">
            <span className="text-lg">Subtotal</span>
            <span className="text-lg">{cart.subTotal}$</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg">Shipping</span>
            <span className="text-lg">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg">Total</span>
            <span className="text-lg">{cart.subTotal}$</span>
          </div>
        </div>
      </div>
    </div>
  )
}
