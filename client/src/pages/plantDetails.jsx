import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function PlantDetails() {
  const { id } = useParams();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPlant = async () => {
    try {
      const response = await api.get(`/plants/${id}`);
      setPlant(response.data.plant);
    } catch (error) {
      console.error("Plant details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlant();
  }, [id]);

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

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to add to wishlist"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-10 text-center">
        <p className="text-gray-600">Loading plant...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-green-50 p-10 text-center">
        <h1 className="text-3xl font-bold text-green-800">
          Plant not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
        
        {/* Plant Image */}
        <div>
          <img
            src={
              plant.image ||
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80"
            }
            alt={plant.name}
            className="h-[450px] w-full rounded-3xl object-cover"
          />
        </div>

        {/* Plant Information */}
        <div className="flex flex-col justify-center">
          <p className="font-semibold uppercase tracking-widest text-green-600">
            PlantNest Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold text-green-950">
            {plant.name}
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {plant.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold text-green-800">
                {plant.category}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">Sunlight</p>
              <p className="font-semibold text-green-800">
                {plant.sunlight}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">Watering</p>
              <p className="font-semibold text-green-800">
                {plant.watering}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">Stock</p>
              <p className="font-semibold text-green-800">
                {plant.stock}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <span className="text-3xl font-bold text-green-700">
              ₹{plant.price}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={addToCart}
              className="flex-1 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Add to Cart 🛒
            </button>

            <button
              onClick={addToWishlist}
              className="flex-1 rounded-xl border-2 border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Add to Wishlist ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantDetails;