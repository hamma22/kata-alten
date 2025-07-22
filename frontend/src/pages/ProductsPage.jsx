import { debounce, Grid, TextField } from "@mui/material";
import ProductsList from "../components/ProductsList/ProductsList";
import { useState } from "react";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Grid container alignItems={"center"} flexDirection={"column"}>
      <TextField
        variant="outlined"
        onChange={debounce((e) => setSearchTerm(e.target.value), 300)}
        placeholder="Rechercher un produit par nom, description ou catégorie..."
        sx={{ mb: 3, width: "50%" }}
        size="small"
      />
      <ProductsList searchTerm={searchTerm} />
    </Grid>
  );
};

export default ProductsPage;
