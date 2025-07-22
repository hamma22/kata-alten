import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  selectProductsError,
  selectProductsItems,
  selectProductsPage,
  selectProductsPages,
  selectProductsStatus,
  clearProducts,
} from "../../store/slices/productsSlice";
import { useCart } from "../../context/CartContext";
import { selectUserRoleAdmin } from "../../store/slices/userSlice";
import { useMemo } from "react";

export const useProductsList = ({ searchTerm = "" }) => {
  const { cart, toggleCart } = useCart();

  const dispatch = useDispatch();
  const products = useSelector(selectProductsItems);
  const currentPage = useSelector(selectProductsPage);
  const totalPages = useSelector(selectProductsPages);
  const status = useSelector(selectProductsStatus);

  const scrollContainerRef = useRef(null);

  const PAGE_LIMIT = 20;

  const isLoadingProducts = status === "loading" && products.length === 0;

  //just to use useMemo hook
  const filtredproducts = useMemo(
    () => products?.filter((item) => item?.name),
    [products]
  );

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(fetchProducts({ page: 1, limit: PAGE_LIMIT, search: searchTerm }));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (status === "loading") return;
      if (currentPage >= totalPages) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollTop + clientHeight > scrollHeight - 100) {
        dispatch(
          fetchProducts({
            page: currentPage + 1,
            limit: PAGE_LIMIT,
            search: searchTerm,
          })
        );
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [dispatch, status, currentPage, totalPages, searchTerm]);

  return {
    products: filtredproducts,
    scrollContainerRef,
    handleToggleCart: toggleCart,
    cart,
    isLoadingProducts,
  };
};
