import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import httpClient from "../../../httpClient/clientV1";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  code: yup.string().required("Code is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  category: yup.string().required("Category is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  description: yup.string().required("Description is required"),
});
const defaultValues = {
  name: "",
  price: 10,
  category: "",
  quantity: 50,
  description: "",
  code: "",
};
const ProductFormDialog = ({ open, onClose, onProductAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  const onSubmit = async (data) => {
    try {
      await httpClient.post("/products", data);
      onProductAdded();
      onClose();
      reset();
    } catch (err) {
      console.error("Add product failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter un nouveau produit</DialogTitle>
      <DialogContent>
        <form id="product-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Code"
                fullWidth
                {...register("code")}
                error={!!errors.code}
                helperText={errors.code?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                fullWidth
                {...register("category")}
                error={!!errors.category}
                helperText={errors.category?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                {...register("quantity")}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                required
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="product-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProductAdded: PropTypes.func.isRequired,
};

export default ProductFormDialog;
