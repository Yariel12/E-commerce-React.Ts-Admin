"use client";
import React, { useState } from "react";
import { useCategories } from "../Hooks/UseCategory";
import { Trash2, FolderOpen, Loader2, Edit3 } from "lucide-react";
import EditCategoryModal from "./EditCategoryModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CategoryListComponents() {
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
      toast.success("Categoría actualizada correctamente");
    } catch (err) {
      toast.error("Error al actualizar la categoría");
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
        toast.success("Categoría eliminada correctamente ✅");

        MySwal.fire({
          title: "Eliminada",
          icon: "success",
          timer: 1300,
          showConfirmButton: false,
        });
      } catch (err) {
        toast.error("Error al eliminar la categoría ❌");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Categorías</h2>
          <p className="mt-1 text-sm text-gray-500">Gestiona tus categorías</p>
        </div>
        <div className="flex justify-center p-6 py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-md rounded-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Categorías</h2>
            <p className="mt-1 text-sm text-gray-500">
              {categories?.length || 0}{" "}
              {categories?.length === 1 ? "categoría" : "categorías"} en total
            </p>
          </div>
        </div>

        <div className="p-6">
          {!categories || categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 mb-4 bg-gray-100 rounded-full">
                <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                No hay categorías
              </h3>
              <p className="text-sm text-gray-500">
                Comienza agregando tu primera categoría
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between px-2 py-4 transition-all rounded-lg hover:bg-gray-50 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-50">
                      <FolderOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <p className="text-sm text-gray-500">
                        ID: {cat.id} Activa
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 transition rounded-md hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-red-600 transition rounded-md hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default CategoryListComponents;
