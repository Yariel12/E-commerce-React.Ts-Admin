import { useState, useEffect } from "react";
import { CreateProductDto, Product } from "../Types/Product";
import { useProducts } from "./UseProduct";
import { useCategories } from "./UseCategory";

export const useEditProduct = (
  product: Product | null,
  onClose: () => void
) => {
  const { updateProduct } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const [form, setForm] = useState<CreateProductDto>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    categoryId: 0,
    categoryName: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        imageUrl: product.imageUrl,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "categoryId"
          ? Number(value)
          : value,
    }));

    if (name === "categoryId") {
      const selected = categories?.find((c) => c.id === Number(value));
      setForm((prev) => ({ ...prev, categoryName: selected?.name || "" }));
    }
  };

  const handleSave = async () => {
    if (!product) return;

    try {
      await updateProduct({
        id: product.id,
        product: form,
      });
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el producto");
    }
  };

  return {
    form,
    handleChange,
    handleSave,
    categories,
    categoriesLoading,
  };
};
