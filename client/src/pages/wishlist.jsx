import { useEffect, useState } from "react";
import api from "../api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/users/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(response.data.wishlist || []);
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen bg-green-50 p-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">
          ♡ My Wishlist
        </h1>

        <p className="mt-4 text-gray-600">
          Please login to see your wishlist.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <h1 className="text-center text-4xl font-bold text-green-800">
        ♥ My Wishlist
      </h1>

      {loading ? (
        <p className="mt-10 text-center text-gray-600">
          Loading wishlist...
        </p>
      ) : wishlist.length === 0 ? (
        <p className="mt-10 text-center text-gray-600">
          Your wishlist is empty ♡
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((plant) => (
            <div
              key={plant._id}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >
              <img
                src={
                  plant.image ||
                  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
                }
                alt={plant.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-green-800">
                    {plant.name}
                  </h2>

                  <span className="text-2xl text-red-500">
                    ♥
                  </span>
                </div>

                <p className="mt-2 text-gray-600">
                  {plant.description}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  ☀️ {plant.sunlight}
                </p>

                <p className="mt-4 text-xl font-bold text-green-700">
                  ₹{plant.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;