import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-green-900 px-8 py-4 text-white">
      <Link to="/" className="text-2xl font-bold">
        🌱 PlantNest
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>

        <Link to="/plants">Plants</Link>

        <Link to="/wishlist">❤️ Wishlist</Link>

        <Link to="/cart">🛒 Cart</Link>

        <Link to="/orders">📦 Orders</Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;