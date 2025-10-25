import { http } from "../Api/HttpClient";
import { CreateProductDto, PagedResponse, Product } from "../Types/Product";

const BASE_URL = "/Product";

export const getProducts = (
  page = 1,
  limit = 10
): Promise<PagedResponse<Product>> => {
  return http
    .get<PagedResponse<Product>>(`${BASE_URL}?page=${page}&limit=${limit}`)
    .then((res) => res.data);
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await http.get<Product>(`/Product/${id}`);
  return response.data;
};

export const createProduct = async (
  product: CreateProductDto
): Promise<Product> => {
  const response = await http.post<Product>("/Product", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: CreateProductDto
): Promise<Product> => {
  const body = { ...product, id };
  const response = await http.put<Product>(`/Product/${id}`, body);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await http.delete<void>(`/Product/${id}`);
};
