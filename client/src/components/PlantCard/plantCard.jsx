
import { useState } from "react";
import { Link } from "react-router-dom";
import api, {notifyCartUpdate,notifyWishlistUpdate,} from "../../api";

function PlantCard({ plant }) {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await api.post(
        "/users/wishlist",
        { plantId: plant._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLiked(true);
      window.dispatchEvent(new Event("wishlistUpdate"));
      notifyWishlistUpdate();

      alert(response.data.message || "Added to wishlist!");
    } catch (error) {
      const message = error.response?.data?.message;
      if (message?.toLowerCase().includes("already")) {
        setLiked(true);
        alert("This plant is already in your wishlist.");
      } else {
        alert(message || "Unable to add to wishlist");
      }
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setAdding(true);
      notifyCartUpdate();
      window.dispatchEvent(new Event("cartUpdate"));


      const response = await api.post(
        "/users/cart",
        { plantId: plant._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message || "Added to cart!");
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to add to cart"
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-[#f3f5f0]">
        <Link to={`/plants/${plant._id}`}>
          <img
            src={
              plant.image ||
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
            }
            alt={plant.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80";
            }}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48"
          />
        </Link>

        <button
          type="button"
          onClick={addToWishlist}
          aria-label="Add to wishlist"
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
            liked ? "text-red-500" : "text-gray-500"
          }`}
        >
          <span className="text-xl">{liked ? "♥" : "♡"}</span>
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <Link to={`/plants/${plant._id}`}>
          <h3 className="truncate text-sm font-bold text-green-950 sm:text-base">
            {plant.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 min-h-8 text-xs text-gray-500">
          {plant.description || "Bring natural beauty into your home."}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-bold text-green-800">₹{plant.price}</span>
          <span className="text-xs text-amber-500">★★★★☆</span>
        </div>

        <button
          type="button"
          onClick={addToCart}
          disabled={adding || plant.stock === 0}
          className="mt-3 w-full rounded-full bg-green-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {adding
            ? "Adding..."
            : plant.stock === 0
              ? "Out of Stock"
              : "🛒 Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default PlantCard;

