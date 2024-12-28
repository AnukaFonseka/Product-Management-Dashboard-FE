import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {
  useDeleteProductMutation,
} from "../../store/api/productApi";

const ProductsTable = ({ products, refetch }) => {
  const navigate = useNavigate(); 
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  // Handle Delete
  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          await deleteProduct(productId).unwrap(); 

          
          Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success",
            showConfirmButton: false, 
            timer: 2000, 
          });

          
          refetch(); 
        } catch (error) {
          console.error("Delete Error:", error);

         
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the product.",
            icon: "error",
          });
        }
      }
    });
  };

  // Handle Edit
  const handleEdit = (productId) => {
    navigate(`edit-product/${productId}`); 
  };

  return (
    <TableContainer
      component={Paper}
      className="rounded-lg shadow-lg overflow-hidden border border-gray-200"
    >
      <Table className="min-w-full">
        <TableHead className="bg-prm text-white">
          <TableRow>
            <TableCell className="font-bold text-white !pl-10">Image</TableCell>
            <TableCell className="!font-bold text-white !text-lg">
              Product Name
            </TableCell>
            <TableCell align="left" className="!font-bold text-white !text-base">
              Description
            </TableCell>
            <TableCell align="left" className="!font-bold text-white !text-base">
              Category
            </TableCell>
            <TableCell align="left" className="!font-bold text-white !text-base">
              Price (LKRs)
            </TableCell>
            <TableCell align="center" className="!font-bold text-white !text-base">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No Data Found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow
                key={product._id}
                className={`${
                  index % 2 === 0 ? "bg-scn" : "bg-white"
                } hover:bg-gray-100 transition duration-200`}
              >
                <TableCell align="left" className="text-gray-700 !pl-10">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-12 h-12 object-cover rounded-md shadow-md"
                  />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className="text-gray-700 !pl-10"
                >
                  {product.productName}
                </TableCell>
                <TableCell align="left" className="text-gray-600">
                  {product.productDescription}
                </TableCell>
                <TableCell align="left" className="text-gray-600">
                  {product.productCategory}
                </TableCell>
                <TableCell align="left" className="text-gray-600">
                  {product.productPrice}
                </TableCell>
                <TableCell
                  align="center"
                  className="text-gray-600 flex items-center space-x-2"
                >
                  {/* Edit Button */}
                  <IconButton
                    className="text-prm hover:text-green-700 transition duration-150"
                    aria-label="edit"
                    onClick={() => handleEdit(product._id)} 
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Delete Button */}
                  <IconButton
                    className="text-red-500 hover:text-red-700 transition duration-150"
                    aria-label="delete"
                    onClick={() => handleDelete(product._id)}
                    disabled={isLoading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
