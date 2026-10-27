
import { Link } from "react-router-dom";
import { Leaf, Mail, ArrowUpRight } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop All", path: "/products" },
    { name: "Electronics", path: "/products?category=Electronics" },
    { name: "Fashion", path: "/products?category=Fashion" },
  ];

  const supportLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "About Us"},
    { name: "Shipping Guidelines" },
    { name: "Returns & Refunds" },
  ];

  return (
    <footer className="mt-16 bg-[#103c30] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand Information */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2"
              aria-label="ShopNest home"
            >
              <Leaf
                size={30}
                strokeWidth={2}
                className="fill-white text-white"
              />

              <span className="text-xl font-bold tracking-[0.13em]">
                SHOPNEST
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
              Discover thoughtfully selected essentials for your everyday
              lifestyle. Find your favourites and make every purchase count.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-1 text-sm text-white/70 transition hover:text-white"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
              Customer Support
            </h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
              Get in Touch
            </h3>

            <p className="mt-5 text-sm leading-6 text-white/70">
              Have a question? We're here to help.
            </p>

            <div className="mt-4 flex items-start gap-3">
              <Mail
                size={19}
                className="mt-0.5 shrink-0 text-[#c7d8c7]"
              />

              <div>
                <p className="text-xs text-white/50">
                  Customer Support
                </p>

                <p className="mt-1 text-sm text-white/80">
                  Add your support email
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-white/60">
            © {currentYear} ShopNest. All rights reserved.
          </p>

          <Link
            to="/"
            className="text-xs text-white/60 transition hover:text-white"
          >
            Made for your everyday lifestyle.
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

