import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Link,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../constants/routes";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { selectUserStatus } from "../store/slices/userSlice";

const LoginPage = () => {
  const userFetched = useSelector(selectUserStatus);

  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (localStorage.getItem("kata-app-token") && userFetched === "succeeded") {
    return <Navigate to={ROUTES.PRODUCTS} />;
  }

  const handleShowSuccess = (message) => {
    setSuccessMessage(message);
    setOpenSnackbar(true);
  };

  const toggleMode = () => {
    setError(null);
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {mode === "login" ? "Login" : "Register"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {mode === "login" ? (
          <Login setError={setError} />
        ) : (
          <Register
            setError={setError}
            setMode={setMode}
            showSuccess={handleShowSuccess}
          />
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Typography variant="body2">
            {mode === "login"
              ? "Don't have an account?"
              : "Already registered?"}
          </Typography>
          <Link component="button" variant="body2" onClick={toggleMode}>
            {mode === "login" ? "Register" : "Login"}
          </Link>
        </Stack>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
