import axios from 'axios'
import { BASE_URL } from '.'
import { apiInstance } from './client'

export async function getStocks (category_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_CATEGORY&category_id=${category_id}`
    )
    console.log(response.data, 'response.data', 'category_id', category_id)
    return response.data.stocks
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getAllStocks (store_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_STORE_ID&store_id=${store_id}`
    )
    console.log(response.data)
    return response.data.stocks
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getCategory (store_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/category?store_id=${store_id}`
    )
    console.log(response.data, 'CATEGORY LIST +____ ')
    return response.data.categories
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function getStockById (stock_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_ID&stock_id=${stock_id}`
    )
    console.log('getStockById', JSON.stringify(response.data))
    return response.data.stock
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function FakegetStockById (stock_id) {
  try {
    const response = await axios.get(`/data/stock${stock_id}.json`)
    console.log(response.data)
    return response.data.stock
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function addStocks (items) {
  try {
    const response = await apiInstance.post(
      `${BASE_URL}/stocks/add/temp`,
      items
    )
    console.log(response)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// export async function tmpGetMenus(): Promise<Stock[]> {
//   const response = await axios.get(`/data/fake.json`);
//   // console.log(response.data);
//   return response.data;
// }

export async function orderStocks ({ order }) {
  console.log('포맷팅 주문 이전 ', order)
  order.store_id = Number(order.store_id)
  order.table_id = Number(order.table_id)
  order.order_details = [...order.order_details]
  console.log(JSON.stringify(order))
  try {
    const response = await apiInstance.put(`${BASE_URL}/biz/store/order`, {
      ...order
    })
    console.log('Order response:', response.data) // 여기서 response.data는 실제 응답 데이터에 따라 다를 수 있습니다.
    return true
  } catch (error) {
    console.error('Order error', error)
    return false
  }
}
