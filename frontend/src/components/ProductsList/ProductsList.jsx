import PropTypes from "prop-types";
import { Grid, Skeleton } from "@mui/material";

import { useProductsList } from "./ProductsListHook";
import ProductCard from "./ProductCard/ProductCard";

const ProductsList = ({ searchTerm }) => {
  const {
    products,
    scrollContainerRef,
    handleToggleCart,
    cart,
    isLoadingProducts,
  } = useProductsList({
    searchTerm,
  });

  return (
    <Grid
      container
      spacing={3}
      justifyContent={"center"}
      overflow={"auto"}
      height={"calc(100vh - 200px)"}
      pb={5}
      ref={scrollContainerRef}
      px={1}
    >
      {isLoadingProducts
        ? Array.from({ length: 10 }).map((_, index) => (
            <Grid
              key={index}
              sx={{
                width: 300,
                height: "100%",
                display: "flex",
                maxHeight: "350px",
                flexDirection: "column",
              }}
            >
              <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </Grid>
          ))
        : products?.map((item) => (
            <ProductCard
              cart={cart}
              handleToggleCart={handleToggleCart}
              product={item}
              key={item?._id}
            />
          ))}
    </Grid>
  );
};

ProductsList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default ProductsList;
