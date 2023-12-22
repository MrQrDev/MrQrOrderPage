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

export async function orderStocks ({ store_id, table_id, order_details }) {
  console.log('포맷팅 주문 이전 ', order_details)

  const formattedOrderDetails = order_details.map(menu => {
    const formattedOptions = {
      require: [],
      addition: []
    }

    // Handle 'require' options
    if (menu.options.require) {
      formattedOptions.require = menu.options.require.map(opt => {
        // Assuming that only one item can be selected, so take the first one
        const selected_item =
          opt.selected_items.length > 0 ? opt.selected_items[0] : null
        return {
          option_id: opt.option_id,
          title: opt.title,
          type: opt.type,
          selected_item: selected_item
            ? { name: selected_item.name, price: selected_item.price, count: 1 }
            : null
        }
      })
    }

    if (menu.options.addition) {
      formattedOptions.addition = menu.options.addition.map(opt => {
        return {
          option_id: opt.option_id,
          title: opt.title,
          type: opt.type,
          selected_items: opt.selected_items.map(item => ({
            name: item.name,
            price: item.price,
            count: 1
          }))
        }
      })
    }

    return {
      stock_id: menu.id,
      options: formattedOptions
    }
  })

  console.log('Formatted order details', JSON.stringify(formattedOrderDetails))

  // try {
  //   const response = await apiInstance.put(`${BASE_URL}/biz/store/order`, {
  //     store_id: store_id,
  //     table_id: table_id,
  //     order_details: formattedOrderDetails,
  //   });
  //   console.log("Order response");
  //   return true;
  // } catch (error) {
  //   console.error("Order error", error);
  //   return false;
  // }
}

export async function deleteStocks () {
  const order_detail_id = 6
  try {
    const response = await apiInstance.delete(`${BASE_URL}/biz/store/order`, {
      order_detail_id: 6
    })
    console.log('response', response)
    console.log('order_detail_id', order_detail_id)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
