const categories = [
  {
    name: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Outdoor Plants",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Succulents",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
  },
];

function PlantCategories() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-green-600">
            Explore Plants
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-950">
            Shop by Category 🌿
          </h2>

          <p className="mt-3 text-gray-600">
            Find the perfect plants for every space.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-green-50 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-green-800">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Explore collection →
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PlantCategories;