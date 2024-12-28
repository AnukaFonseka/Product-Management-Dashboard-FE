import React, { useState } from "react";
import UsersTable from "../components/tables/UsersTable"; // Users Table Component
import { TextField, Tooltip, Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddUserModal from "../components/modals/AddUserModal";
import { useGetAllUsersQuery } from "../store/api/userApi";

const Users = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users from API
  const { data: usersData, isLoading, isError, error } = useGetAllUsersQuery();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter users based on search input
  const filteredUsers =
    usersData?.payload?.filter((user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Handle adding a new user (mock functionality for now)
  const handleAddUser = (userData) => {
    // Placeholder function until backend mutation is integrated
    setIsModalOpen(false);
  };

  return (
    <div className="px-32 py-10 bg-scn min-h-screen">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-prm mb-6">Users</h1>

      {/* Search and Add User Section */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        {/* Search Bar */}
        <div className="w-full max-w-sm">
          <TextField
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            className="border-prm focus:ring-prm focus:border-prm"
          />
        </div>

        {/* Add User Button */}
        <Tooltip title="Add User">
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setIsModalOpen(true)}
            className="!border-prm !text-prm hover:bg-prm hover:!text-white transition-all rounded-lg font-semibold"
          >
            Add User
          </Button>
        </Tooltip>
      </div>

      {/* Users Table */}
      <br />
      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : isError ? (
        <div className="text-red-500">
          <p>Error fetching users: {error?.data?.message || error?.message}</p>
        </div>
      ) : (
        <UsersTable rows={filteredUsers} />
      )}

      {/* Add User Modal */}
      <AddUserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Users;

