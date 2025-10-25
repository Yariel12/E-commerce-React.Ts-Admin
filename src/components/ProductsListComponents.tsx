import { useState } from "react";
import { useProducts } from "../Hooks/UseProduct";
import { Trash2, Edit3, MoreVertical } from "lucide-react";
import EditProductModal from "./EditProductModal";

function ProductsListComponents() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { products, total, deleteProduct, isLoading } = useProducts(
    page,
    limit
  );
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState(null as any);

  const totalPages = Math.ceil(total / limit);

  const handleEdit = (p: any) => {
    setEditingProduct(p);
    setOpenDropdown(null);
  };

  const handleOutsideClick = () => setOpenDropdown(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="relative p-3 space-y-4">
      <div className="relative overflow-hidden bg-white border shadow-md rounded-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-sm tracking-wider text-gray-700 uppercase border-b bg-gray-50">
                <th className="px-6 py-4 text-left">Producto</th>
                <th className="px-6 py-4 text-left">Nombre</th>
                <th className="px-6 py-4 text-left">Categoría</th>
                <th className="px-6 py-4 text-left">Precio</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((p) => (
                <tr
                  key={p.id}
                  className="transition-all duration-200 border-b hover:bg-gray-100/60 hover:shadow-sm"
                >
                  <td className="px-6 py-4">
                    <img
                      src={p.imageUrl}
                      className="object-cover rounded-lg shadow-sm w-14 h-14"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {p.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{p.categoryName}</td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${p.price}
                  </td>

                  <td className="px-6 py-4 text-gray-700">{p.stock} uds</td>

                  <td className="relative px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === p.id ? null : p.id)
                      }
                      className="p-2 transition rounded-lg hover:bg-gray-200/60"
                    >
                      <MoreVertical />
                    </button>

                    {openDropdown === p.id && (
                      <>
                        <div
                          className="fixed inset-0 z-[90]"
                          onClick={handleOutsideClick}
                        />

                        <div className="absolute right-0 z-[100] mt-2 w-40 bg-white shadow-lg border rounded-xl overflow-hidden animate-fadeIn">
                          <button
                            onClick={() => handleEdit(p)}
                            className="flex items-center w-full gap-2 px-4 py-2 transition hover:bg-gray-100"
                          >
                            <Edit3 className="w-4" /> Editar
                          </button>

                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="flex items-center w-full gap-2 px-4 py-2 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="w-4" /> Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          className="btn"
        >
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className="btn"
        >
          Siguiente
        </button>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductsListComponents;
