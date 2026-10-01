import { useEffect, useState } from "react";
import api from "../api";
import PlantCard from "../components/PlantCard/plantCard";

function Plants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlants = async () => {
    try {
      const response = await api.get("/plants");

      setPlants(response.data?.plants || []);
    } catch (error) {
      console.error("Plants error:", error);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">

      {/* Heading */}
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-semibold uppercase tracking-widest text-green-600">
          PlantNest Collection
        </p>

        <h1 className="mt-2 text-4xl font-bold text-green-950 md:text-5xl">
          Explore Our Plants 🌿
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Find beautiful plants for your home, office and garden.
        </p>
      </div>

      {/* Plants */}
      {loading ? (
        <p className="mt-12 text-center text-gray-600">
          Loading plants...
        </p>
      ) : plants.length === 0 ? (
        <p className="mt-12 text-center text-gray-600">
          No plants available.
        </p>
      ) : (
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant) => (
            <PlantCard
              key={plant._id}
              plant={plant}
            />
          ))}
        </div>
        
      )}
    </div>
  );
}

export default Plants;