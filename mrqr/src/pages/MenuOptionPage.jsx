import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getStockById } from '../api/stocks'
import '../styles/check.css'
import { useRecoilState } from 'recoil'
import { CartAtom } from '../recoil/CartAtom'
function MenuOptionPage () {
  const { stock_id } = useParams()
  const navigate = useNavigate()
  const { storeId } = useParams()

  const [selectedOptions, setSelectedOptions] = useState({
    require: [],
    addition: []
  })

  const [additionalOptions, setAdditionalOptions] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartItem, setCartItem] = useRecoilState(CartAtom)
  const {
    data: stock,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['stock', stock_id],
    queryFn: () => getStockById(stock_id)
  })

  useEffect(() => {
    if (stock) {
      calculateTotal()
    }
  }, [selectedOptions, additionalOptions, stock])
  // 옵션 추후 수정 필요
  const handleSelectOption = (isRequire, isMulti, item) => {
    console.log('item', item)
    const newOption = {
      option_id: item.id,
      selected_items: [{ name: item.name, price: item.price, count: 1 }]
    }

    setSelectedOptions(prevOptions => {
      let targetArray = isRequire ? prevOptions.require : prevOptions.addition
      // isMulti가 아닐 경우, 동일한 범주의 기존 옵션 제거
      if (!isMulti) {
        targetArray = targetArray.filter(
          option => option.type !== newOption.type
        )
      }
      const existingOptionIndex = targetArray.findIndex(option =>
        option.selected_items.some(
          selectedItem => selectedItem.name === item.name
        )
      )
      if (existingOptionIndex !== -1) {
        targetArray[existingOptionIndex].selected_items[0].count += 1
      } else {
        targetArray.push(newOption)
      }

      return {
        ...prevOptions,
        require: isRequire ? targetArray : prevOptions.require,
        addition: !isRequire ? targetArray : prevOptions.addition
      }
    })

    console.log(selectedOptions)
  }

  const handleCheckOption = (optionId, item, isChecked) => {
    setAdditionalOptions(prevOptions => {
      const newOptions = { ...prevOptions }
      if (isChecked) {
        if (!newOptions[optionId]) newOptions[optionId] = []
        newOptions[optionId].push(item)
      } else {
        newOptions[optionId] = newOptions[optionId].filter(
          optionItem => optionItem.id !== item.id
        )
      }
      return newOptions
    })
  }
  const calculateTotal = () => {
    let newTotal = stock ? stock.price : 0
    ;['require', 'addition'].forEach(category => {
      selectedOptions[category].forEach(option => {
        if (option.selected_items && option.selected_items.length > 0) {
          option.selected_items.forEach(item => {
            if (item && item.price) {
              newTotal += Number(item.price)
            }
          })
        }
      })
    })

    Object.values(additionalOptions)
      .flat()
      .forEach(item => {
        if (item && item.price) {
          newTotal += Number(item.price)
        }
      })

    setTotalPrice(newTotal)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const options = [
      ...(Array.isArray(selectedOptions.require) &&
      selectedOptions.require.length > 0
        ? selectedOptions.require
        : []),
      ...(Array.isArray(selectedOptions.addition) &&
      selectedOptions.addition.length > 0
        ? selectedOptions.addition
        : [])
    ]

    // 선택한 옵션들을 주문 상세에 포함
    const newOrderDetails = {
      type: 'order',
      stock_id: stock.id,
      price: totalPrice,
      count: 1,
      name: stock.name,
      options: options
    }
    console.log('newOrderDetails', newOrderDetails)
    // 장바구니 상태 업데이트
    setCartItem(prevCartItem => ({
      ...prevCartItem,
      order_details: [...prevCartItem.order_details, newOrderDetails]
    }))

    console.log('newOrderDetails', newOrderDetails)
    console.log(selectedOptions)
    navigate(`/${storeId}`, { replace: true })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading the stock details.</div>
  if (!stock) return <div>No stock data available.</div>

  return (
    <form onSubmit={handleFormSubmit}>
      <section className='pb-[10rem]'>
        <img
          src='/images/menuImage/example2.png'
          alt={stock.name}
          className='h-80 w-full object-cover'
        />
        <div>
          <div className='flex flex-col gap-[.5rem] p-[2rem] border-b-[1px]'>
            <h3 className='text-[2rem] semibold'>{stock.name}</h3>
            <p className='text-[1.4rem] text-textGray leading-[1.8rem]'>
              {stock.describe}
            </p>
          </div>
          <div className='flex items-center justify-between px-[2.5rem] py-[2rem] border-b-[1px]'>
            <h1 className='text-[1.6rem]'>가격</h1>
            <h1 className='text-[1.6rem]'>{stock.price.toLocaleString()}원</h1>
          </div>
          {stock.options.require?.map((option, index) => (
            <section key={index}>
              <h1>필수 옵션</h1>
              <div className='flex flex-col border-b-[1px] p-[2rem] text-[1.6rem]'>
                <h4 className='medium mb-[1.7rem]'>{option.title}</h4>
                <div className='flex flex-col gap-[3.1rem]'>
                  {option.options &&
                    option.options.map((item, index) => (
                      <label
                        key={index}
                        className='flex items-center justify-between hover:bg-gray-100 rounded-lg'
                      >
                        <span className='flex items-center'>
                          <input
                            type={option.select_multiple ? 'checkbox' : 'radio'}
                            name={`option-${option.option_id}`}
                            className='text-primary focus:ring-0 mr-2'
                            onChange={() =>
                              option.select_multiple
                                ? handleCheckOption(option.option_id, item)
                                : handleSelectOption(true, item)
                            }
                          />
                          <span>{item.name}</span>
                        </span>
                        <span>{`+${item.price.toLocaleString()}원`}</span>
                      </label>
                    ))}
                </div>
              </div>
            </section>
          ))}

          {stock.options.addition?.map((option, index) => (
            <section key={index}>
              <h1 className='text-[1.6rem] p-[2rem] pb-0 semibold'>
                추가 옵션
              </h1>
              <div className='flex flex-col pt-0 p-[2rem] text-[1.6rem]'>
                <h4 className='medium mb-[1.7rem]'>{option.title}</h4>
                <div className='flex flex-col gap-[3.1rem]'>
                  {option.options &&
                    option.options.map(item => (
                      <label
                        key={item.id}
                        className='flex items-center justify-between rounded-lg'
                      >
                        <span className='flex items-center'>
                          <input
                            type={option.select_multiple ? 'checkbox' : 'radio'}
                            name={`option-${option.option_id}`}
                            className='text-primary focus:ring-0 mr-2'
                            onChange={e =>
                              option.select_multiple
                                ? handleCheckOption(
                                    option.option_id,
                                    item,
                                    e.target.checked
                                  )
                                : handleSelectOption(
                                    false,
                                    option.select_multiple,
                                    item
                                  )
                            }
                          />
                          <span>{item.name}</span>
                        </span>
                        <span>
                          {item.price > 0
                            ? `+${item.price.toLocaleString()}원`
                            : '무료'}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className='fixed bottom-0 left-0 right-0 h-[10rem] px-[1.6rem] pt-[1.5rem] border-t-[1px] bg-white'>
          <button
            type='submit'
            className='w-full py-[1.65rem] text-[1.6rem] rounded-[1rem] bg-primary text-white semibold'
          >
            {totalPrice.toLocaleString()}원 담기
          </button>
        </div>
      </section>
    </form>
  )
}

export default MenuOptionPage
