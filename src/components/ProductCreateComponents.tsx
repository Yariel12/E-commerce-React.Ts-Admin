import { useProductForm } from "../Hooks/useProductForm";

export default function ProductCreateForm() {
  const {
    form,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    categories,
    categoriesLoading,
  } = useProductForm();

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-10 rounded-full w-96 -top-48 -left-48 bg-violet-500/10 blur-3xl" />
      </div>
      <form onSubmit={handleSubmit} className="relative w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 ">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black-300"
            >
              Nombre del Producto
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej: iPhone 15 Pro Max"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-black transition-all duration-200 border rounded-xl bg-white-800/50 border-white-700/50 placeholder:text-black-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white-800/80"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-black-300"
            >
              Precio
            </label>
            <div className="relative">
              <span className="absolute transform -translate-y-1/2 text-black-400 left-4 top-1/2">
                $
              </span>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                className="w-full py-3.5 pl-8 pr-4 text-black transition-all duration-200 border rounded-xl bg-white-800/50 border-white-700/50 placeholder:text-black-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white-800/80"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-black-300"
            >
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              placeholder="0"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-black transition-all duration-200 border rounded-xl bg-white-800/50 border-white-700/50 placeholder:text-black-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white-800/80"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-black-300"
            >
              Categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleCategoryChange}
              disabled={categoriesLoading}
              className="w-full px-4 py-3.5 text-black transition-all duration-200 border rounded-xl bg-white-800/50 border-white-700/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white-800/80 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
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
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-black-300"
            >
              URL de la Imagen
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-black transition-all duration-200 border rounded-xl bg-black-800/50 border-black-700/50 placeholder:text-black-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white-800/80"
            />
          </div>

          {/* Description (OCUPA 2 COLUMNAS) */}
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black-300"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Describe las características principales del producto..."
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-black transition-all duration-200 border rounded-xl bg-white-800/50 border-white-700/50 placeholder:black-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-white-800/80 resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="relative w-full py-4 mt-2 overflow-hidden font-semibold text-black transition-all duration-300 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-white-900 group"
            >
              <span className="relative z-10">Crear Producto</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
