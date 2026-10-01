import { useEffect, useState } from "react";
import api from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen bg-green-50 p-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">
          📦 My Orders
        </h1>

        <p className="mt-4 text-gray-600">
          Please login to see your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-green-600">
            PlantNest
          </p>

          <h1 className="mt-2 text-4xl font-bold text-green-900">
            My Orders 📦
          </h1>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-gray-600">
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-md">
            <div className="text-6xl">🌱</div>

            <h2 className="mt-4 text-2xl font-bold text-green-800">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your PlantNest orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                {/* Order Header */}
                <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-semibold text-green-800">
                      #{order._id.slice(-8)}
                    </p>
                  </div>

                  <div>
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="mt-5 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={
                          item.plant?.image ||
                          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&q=80"
                        }
                        alt={item.plant?.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-green-800">
                          {item.plant?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-green-700">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-5 border-t pt-5">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">
                      Delivery Address
                    </span>

                    <span className="max-w-xs text-right text-gray-700">
                      {order.address}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <span className="text-xl font-bold">
                      Total
                    </span>

                    <span className="text-xl font-bold text-green-700">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;