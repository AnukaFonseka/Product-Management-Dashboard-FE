import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import Users from "./pages/Users";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route index element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:productId" element={<UpdateProduct />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
