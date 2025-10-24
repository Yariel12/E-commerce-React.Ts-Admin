import { useState } from "react";
import { toast } from "react-toastify";
import { useProducts } from "../Hooks/UseProduct";
import { useCategories } from "../Hooks/UseCategory";

interface ProductForm {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  stock: number;
  categoryName: string;
  imageUrl: string;
}

export const useProductForm = () => {
  const { createProduct } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: 0,
    description: "",
    categoryId: 0,
    stock: 0,
    categoryName: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    const selected = categories?.find((c) => c.id === Number(e.target.value));
    setForm((prev) => ({ ...prev, categoryName: selected?.name || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.categoryName.trim() ||
      !form.imageUrl.trim() ||
      form.price <= 0 ||
      form.stock < 0 ||
      form.categoryId <= 0
    ) {
      toast.error("Rellena todos los campos correctamente");
      return;
    }

    try {
      await createProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        categoryName: form.categoryName.trim(),
        imageUrl: form.imageUrl.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
      });

      setForm({
        name: "",
        price: 0,
        description: "",
        categoryId: 0,
        stock: 0,
        categoryName: "",
        imageUrl: "",
      });

      toast.success("Producto creado con éxito ✅");
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto");
    }
  };

  return {
    form,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    categories,
    categoriesLoading,
  };
};
