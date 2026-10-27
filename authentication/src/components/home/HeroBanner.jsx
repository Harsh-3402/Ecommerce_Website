import { Link } from "react-router-dom";
import heroImage from "../images/heroImage.jpg";

function HeroBanner() {
  return (
    <section className="overflow-hidden bg-[#f1e9dd]">
      <div className="grid min-h-[440px] lg:grid-cols-2">
        {/* Left: Promotional Content */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#245344]">
            NEW ARRIVALS
          </p>

          <h1 className="max-w-xl font-serif text-4xl font-bold leading-[1.1] text-[#173a30] sm:text-5xl lg:text-6xl">
            Find your everyday favourites.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#394740] sm:text-lg">
            Thoughtfully picked essentials, made for your lifestyle.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-xl bg-[#104534] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#1b5b46]"
            >
              Shop Collection
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/products?category=Electronics"
              className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-[#174638] transition hover:text-[#648b69]"
            >
              Explore Categories
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right: Lifestyle Image */}
        <div className="relative h-[300px] overflow-hidden sm:h-[400px] lg:h-full lg:min-h-[440px]">
          <img
            src={heroImage}
            alt="A curated collection of everyday lifestyle essentials"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
