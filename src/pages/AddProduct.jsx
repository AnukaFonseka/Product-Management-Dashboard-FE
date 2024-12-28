import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
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
import { useAddProductMutation } from "../store/api/productApi"; 

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
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Only JPG, JPEG, PNG files are allowed", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});

const AddProduct = () => {
  const [addProduct, { isLoading }] = useAddProductMutation(); 

  
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

  // Handle Form Submission
  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productDescription", data.description);
    formData.append("productCategory", data.category);
    formData.append("productPrice", data.price);
    formData.append("productImage", data.image);

    try {
      await addProduct(formData).unwrap(); 
      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been successfully added.",
      });
      reset(); 
      setImagePreview(""); 
      setSelectedFileName(""); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  // Handle Image Upload
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

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gradient-to-t from-scn to-prm/50">
      <Paper elevation={6} className="p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-prm mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <TextField
            label="Product Name"
            fullWidth
            variant="outlined"
            {...register("productName")}
            error={!!errors.productName}
            helperText={errors.productName?.message}
          />

          {/* Description */}
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

          {/* Category */}
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category">
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.category?.message}</FormHelperText>
          </FormControl>

          {/* Price */}
          <TextField
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          {/* Image Upload */}
          <FormControl fullWidth error={!!errors.image}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                className="!border-prm bg-transparent hover:bg-prm hover:text-white !text-gray-600 font-semibold py-2 px-4 rounded-lg transition-all !my-2"
              >
                Upload Image
              </Button>
              {selectedFileName && (
                <span className="ml-2 text-gray-600">{selectedFileName}</span>
              )}
            </label>
            <FormHelperText>{errors.image?.message}</FormHelperText>
          </FormControl>

          {/* Image Preview */}
          {imagePreview && (
            <Box className="flex justify-center my-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded-lg shadow-md"
              />
            </Box>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="!bg-prm hover:bg-opacity-80 text-white"
            disabled={isLoading} 
          >
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
