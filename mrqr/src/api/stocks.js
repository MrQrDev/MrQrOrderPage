import axios from "axios";
import { BASE_URL, IMAGE_URL } from ".";
import { apiInstance } from "./client";

export async function getStocks(category_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_CATEGORY&category_id=${category_id}`
    );
    console.log(response.data);
    return response.data.stocks;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getAllStocks(store_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_STORE_ID&store_id=${store_id}`
    );
    console.log(response.data);
    return response.data.stocks;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCategory() {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/category?store_id=1`
    );
    console.log(response.data);
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getStockById(stock_id) {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_ID&stock_id=${stock_id}`
    );
    console.log(response.data);
    return response.data.stock;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function FakegetStockById(stock_id) {
  try {
    const response = await axios.get(`/data/stock${stock_id}.json`);
    console.log(response.data);
    return response.data.stock;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function addStocks(items) {
  try {
    const response = await apiInstance.post(
      `${BASE_URL}/stocks/add/temp`,
      items
    );
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export async function tmpGetMenus(): Promise<Stock[]> {
//   const response = await axios.get(`/data/fake.json`);
//   // console.log(response.data);
//   return response.data;
// }
