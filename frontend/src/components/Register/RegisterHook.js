import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";

import httpClient from "../../httpClient/clientV1";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export const useRegister = ({ setError, showSuccess, setMode }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);
    try {
      await httpClient.post("/auth/account", data);
      showSuccess("Registration successful! You can login now.");
      setMode("login");
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    loading,
    showPassword,
    setShowPassword,
    errors,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
