import { CartInfo } from '@/components/cart-info'
import {
  ShippingInfoForm,
  shippingFormSchema,
} from '@/components/shipping-form'

export default function CheckoutPage() {
  return (
    <div className="flex">
      {/* shipping info */}
      <div className="w-1/2 px-4">
        <ShippingInfoForm />
      </div>
      {/* cart info */}
      <div className="w-1/2 px-4">
        <CartInfo />
      </div>
    </div>
  )
}
