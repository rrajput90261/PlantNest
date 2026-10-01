import { useEffect, useState } from "react";
import api from "../api";
import Hero from "../components/Hero/hero";
import PlantCard from "../components/PlantCard/plantCard";
import PlantFinder from "../components/PlantFinder/plantFinder";
import PlantCategories from "../components/PlantCategories/plantCategories";
import WhyPlantNest from "../components/WhyPlantNest/whyPlantNest";

function Home() {
  const [plants, setPlants] = useState([]);

  const getPlants = async () => {
    try {
      const response = await api.get("/plants");

      console.log("Plants API:", response.data);

      setPlants(response.data?.plants || []);
    } catch (error) {
      console.error("Plants error:", error);
      setPlants([]);
    }
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <Hero />
      <PlantFinder />
      <PlantCategories />
      <WhyPlantNest />

      <section className="px-8 py-14">
        <h2 className="mb-8 text-center text-3xl font-bold text-green-900">
          🌿 Featured Plants
        </h2>

        {plants.length === 0 ? (
          <p className="text-center text-gray-600">
            No plants available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;