import { Link, NavLink } from "react-router-dom";

const categories = [
  { name: "Home", path: "/" },
  { name: "Electronics", path: "/products?category=Electronics" },
  { name: "Men's Fashion", path: "/products?category=Men%27s%20Fashion" },
  { name: "Women's Fashion", path: "/products?category=Women%27s%20Fashion" },
  { name: "Footwear", path: "/products?category=Footwear" },
  { name: "Home & Living", path: "/products?category=Home%20%26%20Living" },
  { name: "Beauty & Personal Care", path: "/products?category=Beauty" },
  { name: "Sports & Fitness", path: "/products?category=Sports" },
  { name: "Accessories", path: "/products?category=Accessories" },
];

function Navbar() {
  return (
    <nav className="sticky top-[72px] z-40 border-b border-gray-700 bg-[#17202d] text-white md:top-[76px]">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-10">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={category.path}
              end={category.name === "Home"}
              className={({ isActive }) =>
                `relative shrink-0 whitespace-nowrap px-4 py-4 text-sm font-medium transition duration-200 ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-200 hover:text-blue-400"
                }`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;