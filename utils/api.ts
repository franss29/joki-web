import axios from "axios";
import { Item } from "../types"

const API_BASE_URL = "http://localhost/crud_api"; // Sesuaikan dengan URL backend PHP Anda

export async function fetchItems() {
  const response = await axios.get(`${API_BASE_URL}/items.php`);
  return response.data;
}

export async function createItem(item: Omit<Item, "id">) {
  const response = await axios.post(`${API_BASE_URL}/items.php`, item);
  return response.data;
}

export async function updateItem(item: Item) {
  const response = await axios.put(`${API_BASE_URL}/items.php`, item);
  return response.data;
}

export async function deleteItem(id: number) {
  const response = await axios.delete(`${API_BASE_URL}/items.php?id=${id}`);
  return response.data;
}
