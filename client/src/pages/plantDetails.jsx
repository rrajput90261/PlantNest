
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function PlantDetails() {
  const { id } = useParams();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState({
    show: false,
    x: 50,
    y: 50,
  });

  const getPlant = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/plants/${id}`);
      setPlant(response.data?.plant || null);
    } catch (error) {
      console.error("Plant details error:", error);
      setPlant(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlant();
  }, [id]);

  const handleZoom = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)
    );

    const y = Math.max(
      0,
      Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)
    );

    setZoom({ show: true, x, y });
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await api.post(
        "/users/cart",
        { plantId: plant._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data?.message || "Added to cart!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add to cart");
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
        { plantId: plant._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data?.message || "Added to wishlist!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add to wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 p-10 text-center">
        Loading plant...
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

  const image =
    plant.image ||
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-5 shadow-xl md:grid-cols-2 md:p-10">

        {/* Plant Image and Magnifier */}
        <div className="min-w-0">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <div
                className="relative cursor-crosshair overflow-hidden rounded-2xl bg-green-50"
                onMouseMove={handleZoom}
                onMouseEnter={(event) => {
                  handleZoom(event);
                }}
                onMouseLeave={() =>
                  setZoom((previous) => ({ ...previous, show: false }))
                }
                onTouchStart={(event) => {
                  const touch = event.touches[0];
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = Math.max(
                    0,
                    Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)
                  );
                  const y = Math.max(
                    0,
                    Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100)
                  );

                  setZoom({ show: true, x, y });
                }}
                onTouchMove={(event) => {
                  const touch = event.touches[0];
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = Math.max(
                    0,
                    Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)
                  );
                  const y = Math.max(
                    0,
                    Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100)
                  );

                  setZoom({ show: true, x, y });
                }}
                onTouchEnd={() =>
                  setZoom((previous) => ({ ...previous, show: false }))
                }
              >
                <img
                  src={image}
                  alt={plant.name}
                  className="h-[420px] w-full object-contain sm:object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80";
                  }}
                />

                {zoom.show && (
                  <div
                    className="pointer-events-none absolute h-24 w-24 border-2 border-green-600 bg-green-300/25"
                    style={{
                      left: `${zoom.x}%`,
                      top: `${zoom.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>

              <p className="mt-3 text-center text-sm text-gray-500">
                Move your mouse over the plant to zoom in
              </p>
            </div>

            {/* Zoomed image */}
            <div className="hidden overflow-hidden rounded-2xl border border-green-100 bg-white lg:block">
              {zoom.show ? (
                <div
                  className="h-[420px] w-full"
                  style={{
                    backgroundImage: `url("${image}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "250% 250%",
                    backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                  }}
                  role="img"
                  aria-label={`Zoomed view of ${plant.name}`}
                />
              ) : (
                <div className="flex h-[420px] flex-col items-center justify-center bg-green-50 px-6 text-center text-green-800">
                  <span className="text-4xl">🔍</span>
                  <p className="mt-3 font-semibold">Plant Zoom</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Move your mouse over the image to inspect plant details.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile zoom preview */}
          {zoom.show && (
            <div className="mt-4 overflow-hidden rounded-xl border border-green-200 lg:hidden">
              <div
                className="h-64 w-full"
                style={{
                  backgroundImage: `url("${image}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "250% 250%",
                  backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                }}
                role="img"
                aria-label={`Zoomed view of ${plant.name}`}
              />
              <button
                type="button"
                onClick={() =>
                  setZoom((previous) => ({ ...previous, show: false }))
                }
                className="w-full bg-green-800 px-4 py-2 text-sm font-semibold text-white"
              >
                Close zoom
              </button>
            </div>
          )}
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
