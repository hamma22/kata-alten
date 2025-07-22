import { debounce, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import ProductsList from "../components/ProductsList/ProductsList";
import { selectUserRoleAdmin } from "../store/slices/userSlice";
import ProductsTable from "../components/ProductsList/ProductsTable/ProductsTable";

const ProductsPage = () => {
  const isAdmin = useSelector(selectUserRoleAdmin);

  const [searchTerm, setSearchTerm] = useState("");

  if (isAdmin) {
    return <ProductsTable search={searchTerm} setSearch={setSearchTerm} />;
  }
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
