import { useParams } from 'react-router'
import Header from '../components/Header'
import { orderStocks } from '../api/stocks'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import {
  CartAtom,
  OrderFormattingSelector,
  TotalPriceSelector
} from '../recoil/CartAtom'

function CartOrderPage () {
  const { storeId, tableNumber } = useParams()
  const navigate = useNavigate()
  const [cartItem, setCartItem] = useRecoilState(CartAtom)
  const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceSelector)
  const formattedOrder = useRecoilValue(OrderFormattingSelector)

  console.log('Cart Item:', cartItem)
  console.log('Formatted Order:', formattedOrder)
  const increaseCount = stockId => {
    setCartItem(currentCart => {
      const updatedOrderDetails = currentCart.order_details.map(item =>
        item.stock_id === stockId ? { ...item, count: item.count + 1 } : item
      )
      return { ...currentCart, order_details: updatedOrderDetails }
    })
  }

  const decreaseCount = stockId => {
    setCartItem(currentCart => {
      const updatedOrderDetails = currentCart.order_details.map(item =>
        item.stock_id === stockId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
      return { ...currentCart, order_details: updatedOrderDetails }
    })
  }

  const handleOrder = async () => {
    console.log('Order:', formattedOrder)
    const isSuccess = await orderStocks({
      order: {
        store_id: storeId,
        table_id: tableNumber,
        order_details: [...formattedOrder]
      }
    })
    if (isSuccess) {
      setCartItem({
        store_id: storeId,
        table_id: tableNumber,
        order_details: []
      })
      alert('주문이 성공적으로 완료되었습니다.')
      navigate(`/${storeId}/1/order`)
    } else {
      alert('주문에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  return (
    <section className='pb-[10rem]'>
      <Header title='장바구니' />

      <h1 className='py-[2rem] px-[2.5rem] text-[2rem] semibold border-b-[1px]'>
        {tableNumber}번 테이블 주문 내역
      </h1>
      {cartItem?.order_details?.map((menu, index) => {
        const requiredOptions =
          menu.options?.require?.flatMap(option =>
            option.selected_items.map(item => item.name)
          ) || []
        const additionalOptions =
          menu.options?.addition?.flatMap(option =>
            option.selected_items.map(item => item.name)
          ) || []
        const allOptions = [...requiredOptions, ...additionalOptions]

        console.log('All Options:', allOptions)
        return (
          <section
            key={index}
            className='flex items-center justify-between py-[2rem] px-[2.5rem] border-b-[1px] h-[11rem]'
          >
            <div className='flex flex-col justify-between relative'>
              <div className='flex flex-col gap-[.5rem]'>
                <h2 className='text-[1.6rem] medium'>{menu.name}</h2>
                <span className='text-[1.4rem] regular text-grayoption'>
                  {allOptions.join(', ')}
                </span>
              </div>
              <span className='text-[1.6rem] medium'>
                {menu.price.toLocaleString()}원
              </span>
            </div>
            <section className='flex flex-col h-full justify-between'>
              <IoClose size={24} className='self-end' />
              <div className='flex items-center gap-[1rem]'>
                <FiMinusCircle
                  size={28}
                  onClick={() => decreaseCount(menu.stock_id)}
                />
                <span className='text-[1.6rem] medium'>{menu.count}</span>
                <FiPlusCircle
                  size={28}
                  onClick={() => increaseCount(menu.stock_id)}
                />
              </div>
            </section>
          </section>
        )
      })}
      <div className='fixed bottom-0 left-0 right-0 h-[10rem] px-[1.6rem] pt-[1.5rem] border-t-[1px] bg-white'>
        <button
          onClick={handleOrder}
          className='w-full py-[1.65rem] text-[1.6rem] h-[5rem] flex justify-center items-center rounded-[1rem] bg-primary text-white semibold'
        >
          {totalPrice.toLocaleString()}원 주문하기
        </button>
      </div>
    </section>
  )
}

export default CartOrderPage
