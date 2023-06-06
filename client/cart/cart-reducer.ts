'use client'
import { Product } from '@/db/schema'
import { Cart } from '@/types'

export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  SET_DECREMENT = 'SET_DECREMENT',
  SET_INCREMENT = 'SET_INCREMENT',
  REMOVE_ITEM = 'REMOVE_ITEM',
  CLEAR_CART = 'CLEAR_CART',
  CALC_SUBTOTAL = 'CALC_SUBTOTAL',
  CALC_ITEMS_NUM = 'CALC_ITEMS_NUM',
}

export const cartReducer = (
  state: Cart,
  action: { type: string; payload?: any }
): Cart => {
  if (action.type === CartActionType.ADD_TO_CART) {
    let { product }: { product: Product } = action.payload

    // tackle the existing product

    let existingProduct = state.products.find(
      (curItem) => curItem.id == product.id
    )

    if (existingProduct) {
      let updatedProduct = state.products.map((curElem) => {
        if (curElem.id === product.id) {
          return { ...curElem, quantity: curElem.quantity + 1 }
        }
        return curElem
      })

      return {
        products: updatedProduct,
        subTotal: state.subTotal + product.currentPrice,
        itemsNum: state.itemsNum + 1,
      }
    } else {
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
      }
    }
  }

  // to set the increment and decrement
  if (action.type === CartActionType.SET_DECREMENT) {
    let decreasedMoney = 0
    let updatedProducts = state.products.map((curElem) => {
      if (curElem.id === action.payload) {
        decreasedMoney = curElem.currentPrice
        let decAmount = curElem.quantity - 1

        if (decAmount <= 1) {
          decAmount = 1
        }

        return {
          ...curElem,
          quantity: decAmount,
        }
      } else {
        return curElem
      }
    })
    return {
      ...state,
      products: updatedProducts,
    }
  }

  if (action.type === CartActionType.SET_INCREMENT) {
    let addedMoney = 0
    let updatedProducts = state.products.map((curElem) => {
      if (curElem.id === action.payload) {
        addedMoney = curElem.currentPrice
        let incAmount = curElem.quantity + 1

        // if (incAmount >= curElem.max) {
        //   incAmount = curElem.max;
        // }

        return {
          ...curElem,
          quantity: incAmount,
        }
      } else {
        return curElem
      }
    })
    return {
      ...state,
      products: updatedProducts,
    }
  }

  if (action.type === CartActionType.REMOVE_ITEM) {
    let updatedProducts = state.products.filter(
      (curItem) => curItem.id !== action.payload
    )
    return {
      ...state,
      products: updatedProducts,
    }
  }

  // to empty or to clear to cart
  if (action.type === CartActionType.CLEAR_CART) {
    return {
      ...state,
      products: [],
    }
  }

  if (action.type === CartActionType.CALC_ITEMS_NUM) {
    let updatedQuantity = state.products.reduce((initialVal, curElem) => {
      let { quantity } = curElem

      initialVal = initialVal + quantity
      return initialVal
    }, 0)

    return {
      ...state,
      itemsNum: updatedQuantity,
    }
  }

  if (action.type === CartActionType.CALC_SUBTOTAL) {
    let total_price = state.products.reduce((initialVal, curElem) => {
      let { quantity, currentPrice } = curElem

      initialVal = initialVal + currentPrice * quantity

      return initialVal
    }, 0)

    return {
      ...state,
      subTotal: total_price,
    }
  }

  return state
}
