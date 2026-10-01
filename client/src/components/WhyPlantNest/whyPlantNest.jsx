function WhyPlantNest() {
  const features = [
    {
      icon: "🌱",
      title: "Healthy Plants",
      text: "Fresh and carefully selected plants for your home.",
    },
    {
      icon: "💧",
      title: "Easy Plant Care",
      text: "Get simple care guidance for your plants.",
    },
    {
      icon: "🚚",
      title: "Safe Delivery",
      text: "Plants packed carefully and delivered safely.",
    },
    {
      icon: "💚",
      title: "Plant Finder",
      text: "Find plants according to your space and budget.",
    },
  ];

  return (
    <section className="bg-green-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-green-400">
            Why PlantNest
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Everything Your Plants Need 🌿
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            We make finding, buying and caring for plants simple.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-green-900 p-6 text-center transition hover:-translate-y-2 hover:bg-green-800"
            >
              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-green-100">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyPlantNest;