import { useEffect, useState } from "react";
import api from "../api";
import Hero from "../components/Hero/hero";
import PlantCard from "../components/PlantCard/plantCard";
import PlantFinder from "../components/PlantFinder/plantFinder";
import PlantCategories from "../components/PlantCategories/plantCategories";
import WhyPlantNest from "../components/WhyPlantNest/whyPlantNest";
import Footer from "../components/Footer/footer";

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

      <section className="bg-[#F5F7F0] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-[#3F7D4A]">
                Grown with care
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#123524] md:text-5xl">
                Featured Plants<span className="text-[#3F7D4A]">.</span>
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-gray-600">
                Bring home a little greenery. Discover plants that make every
                space feel more alive.
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/plants")}
              className="w-fit border-b-2 border-[#3F7D4A] pb-2 font-semibold text-[#123524] transition hover:text-[#3F7D4A]"
            >
              Explore all plants →
            </button>
          </div>

          {plants.length === 0 ? (
            <p className="mt-12 rounded-2xl bg-white p-10 text-center text-gray-600">
              No plants available yet. Please add plants to your collection.
            </p>
          ) : (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {plants.slice(0, 6).map((plant) => (
                <PlantCard key={plant._id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
