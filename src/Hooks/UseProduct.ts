import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/ProductService";
import { CreateProductDto, PagedResponse, Product } from "../Types/Product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useProducts = (page = 1, limit = 10) => {
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const { data, isLoading, isError, refetch } = useQuery<
    PagedResponse<Product>
  >({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts(page, limit),
  });

  const createMutation = useMutation({
    mutationFn: (product: CreateProductDto) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", page, limit] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: CreateProductDto }) =>
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", page, limit] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", page, limit] });
    },
  });

  const handleDelete = async (id: number) => {
    const result = await MySwal.fire({
      title: "¿Eliminar producto?",
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
        await deleteMutation.mutateAsync(id);
        MySwal.fire({
          title: "Eliminado",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch {
        MySwal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto",
          icon: "error",
        });
      }
    }
  };

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? page,
    limit: data?.limit ?? limit,
    isLoading,
    isError,
    refetch,
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: handleDelete,
    getById: getProductById,
  };
};
