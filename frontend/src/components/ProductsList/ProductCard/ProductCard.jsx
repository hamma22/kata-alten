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

import { stockInfo } from "../../../constants/product";

const ProductCard = ({
  product = {
    _id: "",
    name: "",
    price: 0,
    description: "",
    inventoryStatus: stockInfo.OUTOFSTOCK,
  },
  cart,
  handleToggleCart,
}) => {
  const isInCart = cart?.includes(product?._id);
  return (
    <Grid>
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
          alt={product?.name}
        />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {product?.name}
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
              {product?.description}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {product?.price?.toFixed(2)} €
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                fontWeight: "bold",
                color: stockInfo[product?.inventoryStatus]?.color || "gray",
              }}
            >
              {stockInfo[product?.inventoryStatus]?.label || "Unknown"}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" gap={1}>
              <IconButton onClick={() => handleToggleCart(product?._id)}>
                {isInCart ? (
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
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    inventoryStatus: PropTypes.string.isRequired,
  }).isRequired,
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleToggleCart: PropTypes.func.isRequired,
};
export default ProductCard;
