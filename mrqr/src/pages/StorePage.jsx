import { useQuery } from '@tanstack/react-query'
import StoreHeader from '../components/StoreHeader'
import { getCategory, getStockById, getStocks } from '../api/stocks'
import { useContext, useState, useEffect } from 'react'
import { MenuContext } from '../context/MenuListContext'
import CategorySkeleton from '../skeleton/skeleton_stock/CategorySkeleton'
import StockSkeleton from '../skeleton/skeleton_stock/StockSkeleton'
import CartIndicator from '../components/CartIndicator'
import CategoryList from '../components/menupage/CategoryList'
import StockList from '../components/menupage/StockList'
import { useParams } from 'react-router-dom'

function StorePage () {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const { storeId } = useParams()
  console.log(storeId)
  const {
    data: queryStock,
    isLoading: categoryLoading,
    isError: categoryError
  } = useQuery({ queryKey: ['category'], queryFn: () => getCategory(storeId) })
  const {
    data: stocks,
    isLoading: stocksLoading,
    isError: stocksError
  } = useQuery(
    selectedCategoryId && {
      queryKey: ['stocks', selectedCategoryId],
      queryFn: () => getStocks(selectedCategoryId)
    }
  )
  getStockById(3)
  useEffect(() => {
    if (queryStock && queryStock.length > 0) {
      setSelectedCategoryId(queryStock[0].id)
    }
  }, [queryStock])

  // const { menuData } = useContext(MenuContext)
  // console.log(menuData)
  const selectedCategoryName = queryStock?.find(
    category => category.id === selectedCategoryId
  )?.name
  return (
    <section className='relative'>
      <StoreHeader title='Store' tableNumber={1} />
      <CategoryList
        categoryLoading={categoryLoading}
        queryStock={queryStock}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <StockList
        stocksLoading={stocksLoading}
        stocks={stocks || []}
        selectedCategoryName={selectedCategoryName}
      />
      <CartIndicator />
    </section>
  )
}

export default StorePage
