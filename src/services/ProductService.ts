import { http } from "../Api/HttpClient";
import { Product } from "../Types/Product";
import { CreateProductDto } from "../Types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await http.get<Product[]>("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await http.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  product: CreateProductDto
): Promise<Product> => {
  const response = await http.post<Product>("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: CreateProductDto
): Promise<Product> => {
  const response = await http.put<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await http.delete<void>(`/products/${id}`);
};
