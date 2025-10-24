import { useProductForm } from "../Hooks/useProductForm";

function ProductCreateComponents() {
  const {
    form,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    categories,
    categoriesLoading,
  } = useProductForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg p-6 mx-auto space-y-4 bg-white shadow-lg rounded-xl"
    >
      <h2 className="mb-4 text-2xl font-bold text-center">Crear Producto</h2>

      <input
        name="name"
        placeholder="Nombre del producto"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleCategoryChange}
        disabled={categoriesLoading}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value={0}>Selecciona una categoría</option>
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="imageUrl"
        placeholder="URL de la imagen"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full p-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Crear Producto
      </button>
    </form>
  );
}

export default ProductCreateComponents;
