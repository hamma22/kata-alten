import { Box, Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/productsPage";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <TopBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: "70px",
        }}
      >
        <Container maxWidth>
          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="*" element={<h2>404 - Not Found</h2>} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
