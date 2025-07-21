import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../store/slices/cartSlice";
import { Grid, Typography } from "@mui/material";

const ProductsList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleAdd = () => {
    dispatch(
      addToCart({
        name: "first product",
        type: 5,
        category: "ss",
        stock: 22,
        price: 45,
      })
    );
  };

  return (
    <Grid>
      <button onClick={handleAdd}>Add to Cart</button>
      {cartItems?.map((item, index) => (
        <Typography key={index}>{item.name}</Typography>
      ))}
    </Grid>
  );
};
export default ProductsList;
