import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import httpClient from "../../httpClient/clientV1";
import { fetchUser } from "../../store/slices/userSlice";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const useLogin = ({ setError }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);
    try {
      const response = await httpClient.post("/auth/token", data);
      localStorage.setItem("kata-app-token", response.data.token);
      dispatch(fetchUser());
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Login failed");
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
  };
};
