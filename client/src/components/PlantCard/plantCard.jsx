import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

function PlantCard({ plant }) {
  const [liked, setLiked] = useState(false);

  // Add to Wishlist
  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await api.post(
        "/users/wishlist",
        {
          plantId: plant._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLiked(true);
      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to add to wishlist"
      );
    }
  };

  // Add to Cart
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await api.post(
        "/users/cart",
        {
          plantId: plant._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to add to cart"
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      {/* Plant Image */}
      <Link to={`/plants/${plant._id}`}>
        <img
          src={
            plant.image ||
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
          }
          alt={plant.name}
          className="h-56 w-full object-cover transition duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </Link>

      <div className="p-5">

        {/* Name + Wishlist */}
        <div className="flex items-center justify-between">

          <Link to={`/plants/${plant._id}`}>
            <h2 className="text-xl font-bold text-green-800 hover:text-green-600">
              {plant.name}
            </h2>
          </Link>

          <button
            onClick={addToWishlist}
            className="text-3xl transition hover:scale-110"
            style={{
              color: liked ? "red" : "gray",
            }}
          >
            {liked ? "♥" : "♡"}
          </button>
        </div>

        {/* Description */}
        <p className="mt-2 text-gray-600">
          {plant.description}
        </p>

        {/* Sunlight */}
        <div className="mt-3 text-sm text-gray-500">
          ☀️ {plant.sunlight}
        </div>

        {/* Price + Cart */}
        <div className="mt-4 flex items-center justify-between">

          <span className="text-xl font-bold text-green-700">
            ₹{plant.price}
          </span>

          <button
            onClick={addToCart}
            className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
          >
            Add to Cart 🛒
          </button>

        </div>
      </div>
    </div>
  );
}

export default PlantCard;