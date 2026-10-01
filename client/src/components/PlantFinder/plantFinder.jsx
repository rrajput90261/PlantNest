import { useState } from "react";
import api from "../../api";
import PlantCard from "../PlantCard/plantCard";

function PlantFinder() {
  const [sunlight, setSunlight] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [plants, setPlants] = useState([]);

  const findPlants = async () => {
    try {
      const params = new URLSearchParams();

      if (sunlight) params.append("sunlight", sunlight);
      if (category) params.append("category", category);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const response = await api.get(`/plants/find?${params.toString()}`);

      setPlants(response.data.plants || []);
    } catch (error) {
      console.error("Plant finder error:", error);
      setPlants([]);
    }
  };

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-semibold text-green-600">
            🌱 Smart Recommendation
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-900">
            Find Your Perfect Plant
          </h2>

          <p className="mt-3 text-gray-600">
            Tell us about your space and budget.
          </p>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl bg-green-50 p-6 md:grid-cols-4">
          <select
            value={sunlight}
            onChange={(e) => setSunlight(e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="">Sunlight</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="">Category</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Flowering">Flowering</option>
          </select>

          <input
            type="number"
            placeholder="Max Budget ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="rounded-lg border bg-white p-3"
          />

          <button
            onClick={findPlants}
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
          >
            Find Plants 🔍
          </button>
        </div>

        {plants.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        )}

        {plants.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            Choose your preferences and find your perfect plant 🌿
          </p>
        )}
      </div>
    </section>
  );
}

export default PlantFinder;