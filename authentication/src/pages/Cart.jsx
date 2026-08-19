import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getCart } from "../services/cartService";
import MyCart from "../components/MyCart";
import { useNavigate } from "react-router-dom";

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
      setError("Failed to fetch Cart Data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-red-500 text-2xl">
        {error}
      </div>
    );

  if (!cart || cart.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-950 flex justify-center items-center text-gray-300 text-2xl"
      >
        No Products Available
      </motion.div>
    );

  // =============================
  // Order Summary Calculations
  // =============================

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
    <div className="min-h-screen bg-gray-950 px-6 py-10">

      {/* Page Heading */}

      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl text-center font-bold text-white mb-10"
      >
        My Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ============================= */}
        {/* Left Side - Cart Items */}
        {/* ============================= */}

        <motion.div
          className="lg:col-span-2 space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.product._id}
                layout
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -40,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  x: -100,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <MyCart
                  item={item}
                  fetchCart={fetchCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ============================= */}
        {/* Right Side - Order Summary */}
        {/* ============================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="bg-gray-900 rounded-xl p-6 h-fit sticky top-5"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>

              <span>
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>
            </div>

            <hr className="border-gray-700" />

            <motion.div
              key={grandTotal}
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between text-2xl font-bold text-green-400"
            >
              <span>Total</span>

              <span>
                ₹{grandTotal.toFixed(2)}
              </span>
            </motion.div>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition cursor-pointer"
              onClick={handleCheckout}
            >
              Proceed To Checkout
            </motion.button>

          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Cart;