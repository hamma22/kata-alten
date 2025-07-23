import { useState } from "react";
import httpClient from "../../../httpClient/clientV1";
import { useEffect } from "react";

export const useProductsTable = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: page + 1,
        limit,
        search,
      };

      const response = await httpClient.get("/products", { params });

      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, search]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  return {
    handleDialogOpen,
    handleDialogClose,
    products,
    total,
    setPage,
    dialogOpen,
    fetchProducts,
    limit,
    page,
    setLimit,
  };
};
