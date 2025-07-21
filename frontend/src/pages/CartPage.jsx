import { Grid } from "@mui/material";
import ProductsList from "../components/ProductsList/ProductsList";

const CartPage = () => {
  return (
    <Grid container border={"1px solid red"}>
      <ProductsList />
    </Grid>
  );
};

export default CartPage;
