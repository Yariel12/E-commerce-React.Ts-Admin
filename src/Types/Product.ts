export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  stock: number;
  categoryName: string;
  imageUrl: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  stock: number;
  categoryName: string;
  imageUrl: string;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
