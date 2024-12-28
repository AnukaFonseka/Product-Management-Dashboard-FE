import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersTable = ({ rows }) => {
  return (
    <TableContainer
      component={Paper}
      className="rounded-lg shadow-lg overflow-hidden border border-gray-200"
    >
      <Table className="min-w-full">
        <TableHead className="bg-prm text-white">
          <TableRow>
            <TableCell className="font-bold text-white !pl-10">
              Name
            </TableCell>
            <TableCell align="left" className="font-bold text-white">
              Email
            </TableCell>
            <TableCell align="left" className="font-bold text-white">
              Phone
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            // Show 'No Data Found' if no users
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No Users Found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={row.email}
                className={`${
                  index % 2 === 0 ? "bg-scn" : "bg-white"
                } hover:bg-gray-100 transition duration-200`}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="text-gray-700 !pl-10"
                >
                  {row.firstName +' '+ row.lastName}
                </TableCell>
                <TableCell align="left" className="text-gray-600">
                  {row.email}
                </TableCell>
                <TableCell align="left" className="text-gray-600">
                  {row.phoneNumber}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
