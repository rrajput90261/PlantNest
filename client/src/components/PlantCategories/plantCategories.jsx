
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Indoor Plants",
    subtitle: "Bring green indoors",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=85",
    category: "Indoor",
  },
  {
    name: "Outdoor Plants",
    subtitle: "Grow in the sunshine",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=85",
    category: "Outdoor",
  },
  {
    name: "Flowering Plants",
    subtitle: "Add natural colours",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85",
    category: "Flowering",
  },
  {
    name: "Succulents",
    subtitle: "Small plants, big charm",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=85",
    category: "Succulent",
  },
  
];

function PlantCategories() {
  const navigate = useNavigate();

  const openCategory = (category) => {
    navigate(`/plants?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-[#F5F7F0] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#3F7D4A]">
            Find your favourite
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#123524] md:text-5xl">
            Explore Our Plants
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
            From leafy indoor companions to colourful blooms,
            find the perfect plants for your space.
          </p>
        </div>

        {/* Category cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <button
              key={item.category}
              onClick={() => openCategory(item.category)}
              className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#123524]/85 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#D8E7D2]">
                    PlantNest Collection
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-semibold text-[#123524]">
                  Explore collection
                </span>

                <span className="text-lg text-[#3F7D4A] transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlantCategories;
