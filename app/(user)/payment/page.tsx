'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const success = searchParams.get('success')
  const cancelled = searchParams.get('cancelled')

  const paragraph = success ? 'Payment successful!' : 'Payment cancelled.,'
  return (
    <>
      <p>{paragraph}</p>
      <p>
        see detail at <Link href={`/orders/${orderId}`}>Your order</Link>
      </p>
      {/* {cancelled && ( */}
      {/*   <p> */}
      {/*     resume payment <Link href={`#`}>here</Link> */}
      {/*   </p> */}
      {/* )} */}
    </>
  )
}
