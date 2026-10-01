import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=80",
    title: "Take care of your plants.",
    text: "Discover beautiful plants and learn how to care for them with the right light, water and environment.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80",
    title: "Bring nature into your home.",
    text: "Find plants that perfectly match your space, lifestyle and budget.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80",
    title: "Make your space greener.",
    text: "Create a beautiful and peaceful home with plants you will love.",
  },
  {
    image:
      "https://media.istockphoto.com/id/1415568863/photo/summer-flower-container-display-in-patio-container-gardening-ideas.jpg?s=612x612&w=0&k=20&c=KmB3q3halsB_Hxc9MWwqacGRtsfST6-6a5KseWBxmWI=",
    title: "Grow something beautiful.",
    text: "PlantNest helps you discover the perfect plants for every corner of your home.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1446071103084-c257b5f70672?auto=format&fit=crop&w=1000&q=80",
    title: "Grow something beautiful.",
    text: "PlantNest helps you discover the perfect plants for every corner of your home.",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="min-h-[600px] overflow-hidden bg-[#f7faf5]">
      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-2 lg:px-12">
        {/* Left Content */}
        <div className="z-10">
          <p className="mb-5 font-semibold uppercase tracking-[4px] text-green-600">
            Welcome to PlantNest
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight text-green-950 md:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            {slide.text}
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/plants")}
              className="rounded-lg bg-green-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700"
            >
              Explore Plants
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("plant-finder")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-lg border border-green-600 px-7 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Find My Plant
            </button>
          </div>

          {/* Slide Dots */}
          <div className="mt-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-8 bg-green-600" : "w-2 bg-green-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex h-[450px] items-center justify-center">
          {/* Small Circle */}
          <div className="absolute h-[280px] w-[280px] rounded-full bg-green-100 md:h-[330px] md:w-[350px]" />

          {/* Plant Image */}
          <img
            key={current}
            src={slide.image}
            alt="Beautiful plant"
            className="relative z-10 h-[360px] w-[300px] rounded-[50%] object-cover shadow-2xl transition-all duration-700 md:h-[400px] md:w-[330px]"
          />

          {/* Floating Badge */}
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white px-5 py-3 shadow-lg whitespace-nowrap">
            🌱 Plant your happiness
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
