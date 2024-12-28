import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  Box,
  Typography,
  Paper,
} from "@mui/material";

import { useUpdateProductMutation, useGetProductByIdQuery } from "../store/api/productApi";

// **Validation Schema using Yup**
const schema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0.01, "Price must be greater than zero"),
  image: yup.mixed().test("fileType", "Only JPG, JPEG, PNG files are allowed", (value) => {
    if (!value) return true; 
    return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
  }),
});

const UpdateProduct = () => {
  const { productId } = useParams(); 
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: response, isFetching } = useGetProductByIdQuery(productId);

  // Extract product data from API response
  const product = response?.payload;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imagePreview, setImagePreview] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  // Prefill form with product data
  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName || "",
        description: product.productDescription || "",
        category: product.productCategory || "",
        price: product.productPrice || "",
      });
      setImagePreview(product.productImage || "");
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("productName", data.productName);
    formData.append("productDescription", data.description);
    formData.append("productCategory", data.category);
    formData.append("productPrice", data.price);

    if (data.image) {
      formData.append("productImage", data.image);
    }

    try {
      await updateProduct(formData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "Your product has been successfully updated.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        return;
      }
      setValue("image", file);
      setSelectedFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isFetching) return <Typography>Loading...</Typography>;

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gradient-to-t from-scn to-prm/50">
      <Paper elevation={6} className="p-8 rounded-lg shadow-lg max-w-lg w-full">
        <Typography variant="h4" textAlign="center" gutterBottom className="text-prm font-bold">
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Product Name"
            fullWidth
            variant="outlined"
            {...register("productName")}
            error={!!errors.productName}
            helperText={errors.productName?.message}
          />

          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category">
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.category?.message}</FormHelperText>
          </FormControl>

          <TextField
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <FormControl fullWidth error={!!errors.image}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Upload New Image
              </Button>
              {selectedFileName && <span className="ml-2">{selectedFileName}</span>}
            </label>
            <FormHelperText>{errors.image?.message}</FormHelperText>
          </FormControl>

          {imagePreview && (
            <Box className="flex justify-center my-4">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover border rounded-lg shadow-md" />
            </Box>
          )}

          <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateProduct;
