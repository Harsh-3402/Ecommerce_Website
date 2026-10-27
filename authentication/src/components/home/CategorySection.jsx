
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import electronicsImage from "../images/electronics.jpg";
import fashionImage from "../images/fashion.jpg";
import homeLivingImage from "../images/homeLiving.jpg";
import accessoriesImage from "../images/accessories.jpg";

const categories = [
  {
    name: "Electronics",
    image: electronicsImage,
    path: "/products?category=Electronics",
  },
  {
    name: "Fashion",
    image: fashionImage,
    path: "/products?category=Fashion",
  },
  {
    name: "Home & Living",
    image: homeLivingImage,
    path: "/products?category=Home%20%26%20Living",
  },
  {
    name: "Accessories",
    image: accessoriesImage,
    path: "/products?category=Accessories",
  },
];

function CategorySection() {
  return (
    <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">

        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="group overflow-hidden rounded-md bg-[#f3f0ea] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Category Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Category Information */}
            <div className="flex items-center justify-between px-4 py-4 sm:px-5">
              <h3 className="text-sm font-semibold text-[#19372f] sm:text-base">
                {category.name}
              </h3>

              <ArrowRight
                size={18}
                className="text-[#19372f] transition duration-300 group-hover:translate-x-1"
              />
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}

export default CategorySection;