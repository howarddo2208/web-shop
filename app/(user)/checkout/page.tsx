import { CartInfo } from "@/components/cart-info";
import { ShippingInfoForm } from "@/components/shipping-form";

// build a checkout form for me with user info on the left and order info, items on the right
export default function CheckoutPage() {

  const checkOut = async (shippingInfo, cart) => {
    "use server"
    // create order with shipping items and shipping info
    // implement stripe
  }

  return (
    <div className="flex">
      {/* shipping info */}
      <div className="w-1/2 px-4">
        <ShippingInfoForm checkOut={checkOut}/>
      </div>
      {/* cart info */}
      <div className="w-1/2 px-4">
        <CartInfo />
      </div>
    </div>
  );
}
