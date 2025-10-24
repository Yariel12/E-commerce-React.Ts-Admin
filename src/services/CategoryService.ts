import { Category } from "../Types/Category";
import { http } from "../Api/HttpClient";

export const getCategories = async (): Promise<Category[]> => {
  const response = await http.get<Category[]>("/Category");
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await http.get<Category>(`/Category/${id}`);
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await http.post<Category>("/Category", category);
  return response.data;
};

export const updateCategory = async (
  id: number,
  category: Category
): Promise<Category> => {
  const response = await http.put<Category>(`/Category/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await http.delete<void>(`/Category/${id}`);
};
