import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getCart,
} from "../services/cartService";
import MyCart from "../components/MyCart";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCw,
  Package,
} from "lucide-react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function fetchCart() {
    setLoading(true);
    setError("");

    try {
      const response = await getCart();
      setCart(response.data.cartItems);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setError("Failed to load your cart. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#fcfaf6]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <RefreshCw size={30} className="text-[#174638]" />
        </motion.div>

        <p className="text-sm font-medium text-[#537064]">
          Preparing your shopping cart...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#fcfaf6] px-5 text-center"
      >
        <Package size={44} className="text-[#8b9b8e]" />

        <h1 className="text-2xl font-bold text-[#19372f]">
          Something went wrong
        </h1>

        <p className="max-w-md text-sm leading-6 text-[#69736c]">
          {error}
        </p>

        <button
          onClick={fetchCart}
          className="rounded-lg bg-[#174638] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#205b49]"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  // Empty Cart State
  if (!cart || cart.length === 0) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[75vh] flex-col items-center justify-center bg-[#fcfaf6] px-5 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e9eee6]"
        >
          <ShoppingBag size={42} className="text-[#174638]" />
        </motion.div>

        <h1 className="mt-7 font-serif text-3xl font-bold text-[#19372f] sm:text-4xl">
          Your cart is waiting
        </h1>

        <p className="mt-3 max-w-md text-sm leading-7 text-[#69736c]">
          Looks like you haven't added anything yet. Explore our collection
          and find something you'll love.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/products")}
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#174638] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#205b49]"
        >
          <ShoppingBag size={17} />
          Explore Products
        </motion.button>
      </motion.main>
    );
  }

  // Order Summary Calculations
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18;

  const shipping = subtotal > 500 ? 0 : 50;

  const grandTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <main className="min-h-screen bg-[#fcfaf6] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-sm"
        >
          <Link
            to="/"
            className="text-[#7b817a] transition hover:text-[#174638] hover:underline"
          >
            Home
          </Link>

          <span className="text-[#b3b7ae]">/</span>

          <span aria-current="page" className="font-medium text-[#19372f]">
            My Cart
          </span>
        </nav>

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-9"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9eee6]">
              <ShoppingBag size={24} className="text-[#174638]" />
            </div>

            <div>
              <h1 className="font-serif text-3xl font-bold text-[#19372f] sm:text-4xl">
                My Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-[#7b817a]">
                Review your selections before checkout.
              </p>
            </div>
          </div>

          <div className="mt-6 h-px bg-[#e9e5dc]" />
        </motion.div>

        {/* Main Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <motion.section
            aria-label="Cart items"
            className="space-y-5 lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#19372f]">
                Your Items
              </h2>

              <span className="rounded-full bg-[#e9eee6] px-3 py-1 text-xs font-semibold text-[#174638]">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.product._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <MyCart item={item} fetchCart={fetchCart} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-[#174638] transition hover:text-[#205b49]"
            >
              <ArrowLeft size={17} />
              Continue Shopping
            </Link>
          </motion.section>

          {/* Order Summary */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-fit rounded-2xl border border-[#e9e5dc] bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6"
          >
            <h2 className="font-serif text-2xl font-bold text-[#19372f]">
              Order Summary
            </h2>

            <p className="mt-2 text-sm text-[#7b817a]">
              Here's a breakdown of your order.
            </p>

            <div className="my-6 h-px bg-[#eeeae2]" />

            {/* Price Breakdown */}
            <div className="space-y-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#69736c]">Subtotal</span>

                <span className="font-semibold text-[#19372f]">
                  ₹{subtotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#69736c]">Tax (18%)</span>

                <span className="font-semibold text-[#19372f]">
                  ₹{tax.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#69736c]">Shipping</span>

                <span
                  className={`font-semibold ${
                    shipping === 0 ? "text-[#26714e]" : "text-[#19372f]"
                  }`}
                >
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>

              {/* Free Shipping Message */}
              {shipping > 0 && (
                <div className="rounded-lg bg-[#f3f5ef] p-3 text-xs leading-5 text-[#537064]">
                  Add ₹{(501 - subtotal).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  more to qualify for free shipping.
                </div>
              )}

              {shipping === 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-[#edf5ed] p-3 text-xs font-medium text-[#26714e]">
                  <Truck size={16} />
                  You've unlocked free shipping!
                </div>
              )}
            </div>

            <div className="my-6 h-px bg-[#eeeae2]" />

            {/* Grand Total */}
            <motion.div
              key={grandTotal}
              initial={{ opacity: 0.7, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start justify-between gap-4"
            >
              <div>
                <p className="text-base font-semibold text-[#19372f]">
                  Total
                </p>

                <p className="mt-1 text-xs text-[#8c928a]">
                  Including tax and shipping
                </p>
              </div>

              <p className="text-2xl font-bold text-[#174638]">
                ₹{grandTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </motion.div>

            {/* Checkout Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#174638] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#205b49] hover:shadow-md"
            >
              Proceed to Checkout
              <span aria-hidden="true">→</span>
            </motion.button>

            {/* Security Message */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#7b817a]">
              <ShieldCheck size={16} className="shrink-0 text-[#64806e]" />

              <span>Secure checkout experience</span>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;