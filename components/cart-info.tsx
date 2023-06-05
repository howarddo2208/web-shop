"use client"
import Image from "next/image"
import Link from 'next/link'
import { useCartContext } from "@/client/cart/cart-context"
import { Button } from "./ui/button"
import { CartContextType } from "@/types"

export const CartInfo = () => {
  const cart = useCartContext() as CartContextType

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold mb-4">Your order</h2>
      <div className="flex flex-col">
        {/* list of items in cart  */}
        <div className="space-y-4">
          {cart.products.map((cartProduct) => (
            <div
              key={cartProduct.id}
              className="flex items-center justify-between bg-transparent ring rounded-md ring-gray-100 pr-4"
            >
              <Image
                width={200}
                height={200}
                src={cartProduct.image}
                alt={cartProduct.name}
                className="aspect-square rounded-md"
              />
              <Link
                href={`/products/${cartProduct.name}`}
                className="text-2xl font-bold leading-none"
              >
                {cartProduct.name}
              </Link>

              <div className="flex items-center">
                <button
                  className="text-2xl leading-none"
                  onClick={() => cart.setDecrease(cartProduct.id)}
                >
                  -
                </button>
                <span className="text-xl w-14 text-center">{cartProduct.quantity}</span>
                <button
                  className="text-2xl leading-none"
                  onClick={() => cart.setIncrease(cartProduct.id)}
                >
                  +
                </button>
              </div>

              <span className="text-2xl font-bold">
                {cartProduct.currentPrice * cartProduct.quantity}$
              </span>

              {/* remove item */}
              <Button variant='destructive' onClick={() => cart.removeItem(cartProduct.id)}>Remove item </Button>
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
