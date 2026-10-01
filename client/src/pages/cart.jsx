import { useEffect, useState } from "react";
import api from "../api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/users/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data.cart || []);
    } catch (error) {
      console.error("Cart error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckout = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    alert("Please login first");
    return;
  }

  const address = prompt(
    "Enter your delivery address:"
  );

  if (!address) {
    return;
  }

  try {
    const response = await api.post(
      "/orders",
      {
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message || "Order placed successfully!");

    setCart([]);
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Unable to place order"
    );
  }
};

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0,
  );

  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen bg-green-50 p-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">🛒 My Cart</h1>

        <p className="mt-4 text-gray-600">Please login to see your cart.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <h1 className="text-center text-4xl font-bold text-green-900">
        🛒 My Cart
      </h1>

      {loading ? (
        <p className="mt-10 text-center text-gray-600">Loading cart...</p>
      ) : cart.length === 0 ? (
        <p className="mt-10 text-center text-gray-600">Your cart is empty 🌱</p>
      ) : (
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.plant._id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={
                    item.plant.image ||
                    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={item.plant.name}
                  className="h-32 w-full rounded-xl object-cover sm:w-32"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-green-800">
                    {item.plant.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    ₹{item.plant.price} × {item.quantity}
                  </p>

                  <p className="mt-2 font-semibold text-green-700">
                    ₹{item.plant.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">Total</span>

              <span className="text-2xl font-bold text-green-700">
                ₹{total}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-5 w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
