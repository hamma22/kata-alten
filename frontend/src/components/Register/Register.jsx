import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useRegister } from "./RegisterHook";

const Register = ({ setError, showSuccess, setMode }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    showPassword,
    setShowPassword,
    errors,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useRegister({ setError, showSuccess, setMode });
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Register"}
      </Button>
    </Box>
  );
};

Register.propTypes = {
  setError: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
};

export default Register;
