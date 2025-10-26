"use client";

import { createPortal } from "react-dom";
import type { Product } from "../Types/Product";
import { useEditProduct } from "../Hooks/useEditProduct";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function EditProductModal({ product, onClose }: Props) {
  const { form, handleChange, handleSave, categories, categoriesLoading } =
    useEditProduct(product, onClose);

  if (!product) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Editar Producto
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Actualiza la información del producto
          </p>
        </div>

        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del producto
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ej: Laptop HP Pavilion"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Precio y Stock en grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <div className="relative">
                <span className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              disabled={categoriesLoading}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              <option value={0}>Selecciona una categoría</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              URL de la imagen
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="description"
              placeholder="Describe las características del producto..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none placeholder:text-gray-400"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
