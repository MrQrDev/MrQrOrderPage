import { useParams } from 'react-router'
import Header from '../components/Header'
import { MenuContext } from '../context/MenuListContext'
import { useContext } from 'react'
import { orderStocks } from '../api/stocks'

function CartOrderPage () {
  const { storeId, tableNumber } = useParams()
  const { menuData } = useContext(MenuContext)
  const totalPrice = menuData.reduce((sum, menu) => sum + menu.price, 0)
  console.log(menuData)

  const handleOrder = async () => {
    const isSuccess = await orderStocks({
      store_id: storeId,
      table_id: tableNumber,
      order_details: menuData
    })
    if (isSuccess) {
      alert('주문이 성공적으로 완료되었습니다.')
    } else {
      alert('주문에 실패하였습니다. 다시 시도해주세요.')
    }
    console.log(menuData)
  }

  return (
    <section>
      <Header title='장바구니' />
      <h1 className='py-[2rem] px-[2.5rem] text-[2rem] semibold border-b-[1px]'>
        {tableNumber}번 테이블 주문 내역
      </h1>
      {menuData &&
        menuData.map((menu, index) => {
          const requiredOptions =
            menu.options?.require?.flatMap(option => option.selected_items) ||
            []
          const additionalOptions =
            menu.options?.addition?.flatMap(option => option.selected_items) ||
            []
          const allOptions = [...requiredOptions, ...additionalOptions]
          console.log(allOptions)
          {
            /* const optionNames = allOptions.map((item) => item.name).join(", "); */
          }

          return (
            <div
              key={index}
              className='py-[2rem] px-[2.5rem] border-b-[1px] flex h-[12rem] relative'
            >
              <div className='flex flex-col justify-between'>
                <div className='flex flex-col gap-[.5rem]'>
                  <h2 className='text-[1.6rem] medium'>{menu.name}</h2>
                  {/* <span className="text-[1.4rem] regular text-grayoption">
                    {optionNames}
                  </span> */}
                </div>
                <span className='text-[1.6rem] medium'>
                  {menu.price.toLocaleString()}원
                </span>
              </div>
            </div>
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
