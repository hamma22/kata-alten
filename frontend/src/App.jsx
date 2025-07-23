import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./constants/routes";
import { fetchUser, selectUserStatus } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
    if (localStorage.getItem("kata-app-token")) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const isAuthCheckInProgress =
    localStorage.getItem("kata-app-token") && userStatus !== "succeeded";

  if (isAuthCheckInProgress) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to={ROUTES.PRODUCTS} />} />
        <Route
          path={ROUTES.PRODUCTS}
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.FAVORITES}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CART}
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Routes>
  );
}

export default App;
