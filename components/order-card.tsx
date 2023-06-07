'use client'
import React, { useState } from 'react'

export const OrderCard = ({ order }: any) => {
  const [showOrderItems, setShowOrderItems] = useState(true)

  const toggleOrderItems = () => {
    setShowOrderItems(!showOrderItems)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Order ID:</span> {order.id}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Name:</span> {order.name}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Phone Number:</span> {order.phoneNumber}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Email:</span> {order.email}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Address:</span> {order.address}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Status:</span> {order.status}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <span className="font-bold">Total:</span> ${order.total}
        </div>
      </div>
      <div className="mb-4">
        <button onClick={toggleOrderItems} className="text-blue-500 font-bold">
          {showOrderItems ? 'Hide Order Items' : 'Show Order Items'}
        </button>
      </div>
      {showOrderItems && (
        <>
          {order.orderItems.map(
            (item: any) =>
              item &&
              item.product && (
                <div key={item.id} className="flex items-center mb-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-32 h-auto rounded-md mr-4 md:mr-8"
                  />
                  <div>
                    <h4 className="font-bold">{item.product.name}</h4>
                    <p>{item.product.description}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-gray-500">
                      Price: ${item.product.currentPrice}
                    </p>
                  </div>
                </div>
              )
          )}
        </>
      )}
    </div>
  )
}
