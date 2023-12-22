import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getStockById } from '../api/stocks'
import { MenuContext } from '../context/MenuListContext'
import { cloneDeep } from 'lodash'

function MenuOptionPage () {
  const { stock_id } = useParams()
  const navigate = useNavigate()
  const { storeId } = useParams()
  const { menuData, setMenuData } = useContext(MenuContext)

  const [selectedOptions, setSelectedOptions] = useState({})
  const [additionalOptions, setAdditionalOptions] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)

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

  const handleSelectOption = (optionId, item) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [optionId]: item
    }))
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
    Object.values(selectedOptions).forEach(item => {
      newTotal += Number(item.price)
    })
    Object.values(additionalOptions)
      .flat()
      .forEach(item => {
        newTotal += Number(item.price)
      })
    setTotalPrice(newTotal)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    let newStockData = cloneDeep(stock)
    newStockData.price = totalPrice
    setMenuData(prevMenuData => [...prevMenuData, newStockData])
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
            <div
              key={index}
              className='flex flex-col border-b-[1px] p-[2rem] text-[1.6rem]'
            >
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
                          type='radio'
                          name={`option-${option.option_id}`}
                          className='text-primary focus:ring-0 mr-2'
                          onChange={() =>
                            handleSelectOption(option.option_id, item)
                          }
                        />
                        <span>{item.name}</span>
                      </span>
                      <span>{`+${item.price.toLocaleString()}원`}</span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
          {stock.options.addition?.map((option, index) => (
            <div key={index} className='flex flex-col p-[2rem] text-[1.6rem]'>
              <h4 className='medium mb-[1.7rem]'>{option.title}</h4>
              <div className='flex flex-col gap-[3.1rem]'>
                {option.options &&
                  option.options.map(item => (
                    <label
                      key={item.id}
                      className='flex items-center justify-between hover:bg-gray-100 rounded-lg'
                    >
                      <span className='flex items-center'>
                        <input
                          type='checkbox'
                          className='text-primary focus:ring-0 mr-2'
                          onChange={e =>
                            handleCheckOption(
                              option.option_id,
                              item,
                              e.target.checked
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
