import { useState } from "react";
import { useCategories } from "../Hooks/UseCategory";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useCategoryList = () => {
  const { categories, isLoading, deleteCategory, updateCategory } =
    useCategories();
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updated: { id: number; name: string }) => {
    try {
      await updateCategory({ id: updated.id, category: updated });
      toast.success("Categoría actualizada correctamente ✅");
    } catch (err) {
      toast.error("Error al actualizar la categoría ❌");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await MySwal.fire({
      title: "¿Eliminar categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id);
        toast.success("Categoría eliminada correctamente");
        MySwal.fire({
          title: "Eliminada",
          icon: "success",
          timer: 1300,
          showConfirmButton: false,
        });
      } catch (err) {
        toast.error("Error al eliminar la categoría");
      }
    }
  };

  return {
    categories,
    isLoading,
    selectedCategory,
    isModalOpen,
    setIsModalOpen,
    handleEdit,
    handleUpdate,
    handleDelete,
  };
};
