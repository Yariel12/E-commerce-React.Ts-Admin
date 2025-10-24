import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/ProductService";
import { Product, CreateProductDto } from "../Types/Product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const createMutation = useMutation({
    mutationFn: (product: CreateProductDto) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: CreateProductDto }) =>
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
          timer: 1300,
          showConfirmButton: false,
        });
      } catch (error) {
        MySwal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto",
          icon: "error",
        });
      }
    }
  };

  const getById = async (id: number) => {
    return await getProductById(id);
  };

  return {
    products,
    isLoading,
    isError,
    refetch,
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: handleDelete,
    getById,
  };
};
