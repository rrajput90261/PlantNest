
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85",
    eyebrow: "BRING NATURE CLOSER",
    title: "Bring Nature",
    subtitle: "Into Your Home.",
    description:
      "Discover beautiful plants that bring freshness, calmness and life into every corner of your home.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85",
    eyebrow: "YOUR PERSONAL GREEN SPACE",
    title: "Grow Your",
    subtitle: "Happy Place.",
    description:
      "Find plants that match your space, lifestyle and sunlight with our smart plant collection.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85",
    eyebrow: "LIVE GREEN, FEEL GOOD",
    title: "Make Life",
    subtitle: "More Natural.",
    description:
      "From easy-care indoor plants to beautiful leafy favourites, find your next green companion.",
  },
];

function Hero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  const scrollToFinder = () => {
    document
      .getElementById("plant-finder")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#123524] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#3F7D4A]/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 py-12 md:min-h-[700px] md:grid-cols-2 md:px-12 lg:px-16">
        {/* Left content */}
        <div className="relative z-10 py-6">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[4px] text-[#A8C3A0] sm:text-sm">
            <span className="h-px w-8 bg-[#A8C3A0]" />
            {slide.eyebrow}
          </p>

          <h1
            key={slide.title}
            className="mt-7 font-serif text-5xl font-bold leading-[1.12] tracking-tight text-[#F5F7F0] sm:text-6xl lg:text-7xl"
          >
            {slide.title}
            <br />
            <span className="italic font-normal text-[#A8C3A0]">
              {slide.subtitle}
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-white/75 sm:text-lg">
            {slide.description}
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/plants")}
              className="rounded-md bg-[#3F7D4A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#4D8E58]"
            >
              Explore Plants <span className="ml-2">↗</span>
            </button>

            <button
              onClick={scrollToFinder}
              className="rounded-md border border-[#A8C3A0]/60 px-7 py-3.5 text-sm font-semibold text-[#F5F7F0] transition duration-300 hover:border-[#A8C3A0] hover:bg-white/10"
            >
              Find My Plant
            </button>
          </div>

          {/* Slider indicators */}
          <div className="mt-12 flex items-center gap-3">
            {slides.map((item, index) => (
              <button
                key={item.eyebrow}
                onClick={() => setCurrent(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === index
                    ? "w-10 bg-[#A8C3A0]"
                    : "w-3 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}

            <span className="ml-2 text-xs tracking-widest text-white/50">
              0{current + 1} / 0{slides.length}
            </span>
          </div>

          {/* Small trust details */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
            <span>✳ Easy Plant Care</span>
            <span>✳ Find Your Perfect Plant</span>
          </div>
        </div>

        {/* Right image */}
        <div className="relative mx-auto flex h-[390px] w-full max-w-[500px] items-center justify-center md:h-[540px]">
          {/* Soft circular background */}
          <div className="absolute h-[290px] w-[290px] rounded-full bg-[#A8C3A0]/15 md:h-[390px] md:w-[390px]" />

          {/* Outer circle */}
          <div className="absolute h-[340px] w-[340px] rounded-full border border-[#A8C3A0]/25 sm:h-[370px] sm:w-[370px] md:h-[410px] md:w-[410px]"/>

          {/* Plant image */}
          <img
            key={slide.image}
            src={slide.image}
            alt="Green houseplant from PlantNest"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85";
            }}
           className="relative z-10 h-[320px] w-[320px] rounded-full object-cover shadow-2xl transition-all duration-700 sm:h-[350px] sm:w-[350px] md:h-[380px] md:w-[380px]"
          />

          {/* Floating badge */}
          <div className="absolute bottom-3 left-1/2 z-20 w-max -translate-x-1/2 rounded-full border border-green-100/60 bg-[#F5F7F0] px-5 py-3 shadow-xl sm:bottom-7 sm:left-auto sm:right-0 sm:translate-x-0">
            <p className="text-xs font-medium text-[#123524] sm:text-sm">
              🌱 Plant your happiness
            </p>
          </div>

          {/* Small decorative label */}
          <div className="absolute left-0 top-10 z-20 hidden rounded-full border border-white/15 bg-[#123524]/90 px-4 py-2 backdrop-blur-sm sm:block">
            <p className="text-xs tracking-wide text-[#A8C3A0]">
              A LITTLE MORE GREEN
            </p>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#A8C3A0]/40 to-transparent" />
    </section>
  );
}

export default Hero;
