import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home";
import Plants from "./pages/plants";
import Wishlist from "./pages/wishlist";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Login from "./pages/login";
import Register from "./pages/register";
import PlantDetails from "./pages/plantDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />

        <Route path="/plants" element={<Plants />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
