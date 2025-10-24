import { useState } from "react";
import { useProducts } from "../Hooks/UseProduct";
import { Trash2, Edit3, MoreVertical } from "lucide-react";

function ProductsListComponents() {
  const { products, isLoading, deleteProduct } = useProducts();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 rounded-full border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="p-4 mb-4 rounded-full bg-muted/50">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-foreground">
          No hay productos disponibles
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Agrega tu primer producto para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="overflow-hidden border shadow-sm rounded-xl bg-card border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase text-muted-foreground">
                  Producto
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase text-muted-foreground">
                  Nombre
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase text-muted-foreground">
                  Categoría
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase text-muted-foreground">
                  Precio
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase text-muted-foreground">
                  Stock
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-right uppercase text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {products.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-muted/20">
                  <td className="flex items-center gap-3 px-6 py-4">
                    <div className="flex-shrink-0 overflow-hidden rounded-lg w-14 h-14 bg-muted ring-1 ring-border">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">
                      {p.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary ring-1 ring-primary/20">
                      {p.categoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        p.stock > 10
                          ? "bg-green-500/10 text-green-600 ring-1 ring-green-500/20"
                          : p.stock > 0
                          ? "bg-yellow-500/10 text-yellow-600 ring-1 ring-yellow-500/20"
                          : "bg-red-500/10 text-red-600 ring-1 ring-red-500/20"
                      }`}
                    >
                      {p.stock} unidades
                    </span>
                  </td>
                  <td className="relative px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === p.id ? null : p.id)
                        }
                        className="p-2 transition-colors rounded-lg hover:bg-muted/50"
                      >
                        <MoreVertical className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </button>

                      {openDropdown === p.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 z-50 mt-2 overflow-hidden border rounded-lg shadow-lg w-44 bg-card border-border">
                            <button
                              className="flex items-center w-full gap-2 px-4 py-2 text-sm transition-colors text-foreground hover:bg-muted"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <Edit3 className="w-4 h-4 text-primary" />
                              Editar
                            </button>
                            <button
                              className="flex items-center w-full gap-2 px-4 py-2 text-sm transition-colors text-destructive hover:bg-destructive/10"
                              onClick={() => deleteProduct(p.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsListComponents;
