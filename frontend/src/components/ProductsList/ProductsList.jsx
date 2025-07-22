import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ArrowRight } from "lucide-react";

import { useProductsList } from "./ProductsListHook";
import { stockInfo } from "../../constants/product";

const ProductsList = ({ searchTerm }) => {
  const {
    products,
    status,
    error,
    scrollContainerRef,
    handleToggleCart,
    cart,
  } = useProductsList({
    searchTerm,
  });

  /*   const isInFavorites = favorites.some((fav) => fav.id === item.id);
const isInCart = cartItems.some((p) => p.id === item.id); */

  if (status === "loading" && products.length === 0) {
    return <p>Loading products...</p>;
  }
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Grid
      container
      spacing={3}
      justifyContent={"center"}
      overflow={"auto"}
      height={"calc(100vh - 200px)"}
      pb={5}
      ref={scrollContainerRef}
    >
      {products?.map((item, index) => (
        <Grid key={item._id}>
          <Card
            sx={{
              width: 300,
              height: "100%",
              display: "flex",
              maxHeight: "450px",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={
                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              alt={item.name}
            />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {item.price.toFixed(2)} €
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    fontWeight: "bold",
                    color: stockInfo[item.inventoryStatus]?.color || "gray",
                  }}
                >
                  {stockInfo[item.inventoryStatus]?.label || "Unknown"}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" gap={1}>
                  <IconButton onClick={() => handleToggleCart(item?._id)}>
                    {cart?.includes(item?._id) ? (
                      <ShoppingCartIcon color="primary" />
                    ) : (
                      <ShoppingCartOutlinedIcon />
                    )}
                  </IconButton>
                  <IconButton disabled>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Box>
                <Box flexGrow={1} />
                <IconButton disabled>
                  <ArrowRight />
                </IconButton>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

ProductsList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default ProductsList;
