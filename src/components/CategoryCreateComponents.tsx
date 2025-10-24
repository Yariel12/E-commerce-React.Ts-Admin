import React, { useState } from "react";
import { useCategories } from "../Hooks/UseCategory";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

function CategoryCreateComponents() {
  const { createCategory } = useCategories();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    try {
      await createCategory({ id: 0, name });
      toast.success("Categoría creada correctamente");
      setName("");
      navigate("/category/List");
    } catch (error) {
      toast.error("Error creando categoría");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-5 p-8 bg-white shadow-xl bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-900 rounded-2xl animate-fade-in"
      >
        <div className="flex flex-col items-center gap-2">
          <PlusCircle size={42} className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Crear Categoría
          </h2>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Agrega una nueva categoría al sistema
          </p>
        </div>

        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 text-gray-900 transition border border-gray-300 outline-none dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 p-3 font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          Guardar
        </button>

        <button
          type="button"
          onClick={() => navigate("/category/List")}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-[-6px] transition self-center"
        >
          Volver a la lista
        </button>
      </form>
    </div>
  );
}

export default CategoryCreateComponents;
