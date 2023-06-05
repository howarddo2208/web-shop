import { CartInfo } from "@/components/cart-info";
import { ShippingInfoForm, shippingFormSchema } from "@/components/shipping-form";
import { clearCart } from "@/lib/cart";
import { Cart, CreateOrderRequest } from "@/types";
import { z } from "zod";

// build a checkout form for me with user info on the left and order info, items on the right
export default function CheckoutPage() {

  const checkOut = async (orderInfo: CreateOrderRequest) => {
    "use server"
    // create order with shipping items and shipping info
    const order = await fetch('/api/order', { method: 'POST', body: JSON.stringify(orderInfo) })
    // clear the cart
    clearCart()
    // redirect to order confirmation page
    window.location.href = `/order/${order.id}`
  }

  return (
    <div className="flex">
      {/* shipping info */}
      <div className="w-1/2 px-4">
        <ShippingInfoForm checkOut={checkOut} />
      </div>
      {/* cart info */}
      <div className="w-1/2 px-4">
        <CartInfo />
      </div>
    </div>
  );
}
