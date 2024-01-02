import { atom } from 'recoil'
import { selector } from 'recoil'

export const CartAtom = atom({
  key: 'CartAtom',
  default: {
    store_id: 0,
    table_id: 0,
    order_details: []
  }
})

export const TotalQuantitySelector = selector({
  key: 'TotalQuantitySelector',
  get: ({ get }) => {
    const currentCart = get(CartAtom)
    return currentCart.length
  }
})
export const TotalPriceSelector = selector({
  key: 'TotalPriceSelector',
  get: ({ get }) => {
    const currentCart = get(CartAtom)
    console.log('TOTAL_PRICE', currentCart)
    const totalPrice = currentCart.order_details.reduce((total, item) => {
      return total + item.price * item.count
    }, 0)
    return totalPrice
  }
})
export const OrderFormattingSelector = selector({
  key: 'OrderFormattingSelector',
  get: ({ get }) => {
    const currentCart = get(CartAtom)
    const orderFormat = currentCart.order_details.map(item => {
      const { price, name, ...rest } = item
      return rest
    })
    return orderFormat
  }
})
