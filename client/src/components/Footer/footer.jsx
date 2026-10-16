
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#123524] text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[3px] text-[#A8C3A0]">
              Grow with PlantNest
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              A little more green, every day.
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-white/65">
              Discover plants, find your favourites and make your home
              a little greener.
            </p>
          </div>

          <Link
            to="/plants"
            className="w-fit shrink-0 rounded-lg bg-[#3F7D4A] px-6 py-3 font-semibold text-white transition hover:bg-[#4D8E58]"
          >
            Explore Plants →
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-bold"
          >
            <span className="text-3xl">🌱</span>
            <span>
              Plant<span className="text-[#A8C3A0]">Nest</span>
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
            Bringing nature closer to your home, one beautiful plant
            at a time. Find the right plants for your space and lifestyle.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm transition hover:border-[#A8C3A0] hover:bg-white/10"
            >
              IG
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm transition hover:border-[#A8C3A0] hover:bg-white/10"
            >
              f
            </a>

            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm transition hover:border-[#A8C3A0] hover:bg-white/10"
            >
              P
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-semibold text-[#A8C3A0]">
            Quick Links
          </h3>

          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/plants" className="transition hover:text-white">
                All Plants
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="transition hover:text-white">
                My Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition hover:text-white">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="transition hover:text-white">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Plant care */}
        <div>
          <h3 className="text-lg font-semibold text-[#A8C3A0]">
            Plant Care
          </h3>

          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>Indoor Plant Care</li>
            <li>Watering Tips</li>
            <li>Sunlight Guide</li>
            <li>Beginner-Friendly Plants</li>
            <li>Green Living</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#A8C3A0]">
            Get in Touch
          </h3>

          <p className="mt-5 text-sm leading-7 text-white/65">
            Have questions about choosing your plants? We would love to
            help you discover your next green companion.
          </p>

          <Link
            to="/plants"
            className="mt-4 inline-block font-semibold text-[#A8C3A0] transition hover:text-white"
          >
            Find Your Plant →
          </Link>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold">🌿 PlantNest Promise</p>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Helping you bring more nature into everyday life.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-center text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:text-left">
          <p>© {year} PlantNest. All rights reserved.</p>

          <p>
            Made with <span className="text-[#A8C3A0]">♥</span> for
            plant lovers.
          </p>

          <Link
            to="/"
            className="transition hover:text-white"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
