import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/products");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center border border-gray-800"
      >

        {/* Success Icon */}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="w-28 h-28 bg-green-600 rounded-full flex items-center justify-center mx-auto text-6xl text-white"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✓
          </motion.span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-4xl font-bold text-white mt-8"
        >
          Order Placed Successfully!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 mt-4 text-lg"
        >
          Thank you for shopping with us.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400"
        >
          Your order has been received and is being processed.
        </motion.p>

        {/* Order ID */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 bg-gray-800 rounded-xl p-6"
        >
          <p className="text-gray-400 text-lg">
            Order ID
          </p>

          <p className="text-green-400 text-2xl font-bold mt-2 break-all">
            #{order._id}
          </p>
        </motion.div>

        {/* Order Details */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-8 bg-gray-800 rounded-xl p-6 text-left"
        >
          <h2 className="text-white text-xl font-semibold mb-4">
            Order Details
          </h2>

          <div className="space-y-2 text-gray-300">

            <div className="flex justify-between">
              <span>Total Amount</span>

              <span className="text-green-400 font-semibold">
                ₹{order.totalPrice}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment Method</span>

              <span>
                {order.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Order Status</span>

              <span className="text-yellow-400">
                {order.orderStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment Status</span>

              <span className="text-red-400">
                {order.paymentStatus}
              </span>
            </div>

          </div>
        </motion.div>

        {/* What's Next */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-8 text-left bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-white text-xl font-semibold mb-4">
            What's Next?
          </h2>

          <ul className="text-gray-300 space-y-3 list-disc list-inside">
            <li>Your order has been confirmed.</li>
            <li>We'll start processing it shortly.</li>
            <li>You can track your order from the Orders page.</li>
            <li>You'll receive updates as your order progresses.</li>
          </ul>
        </motion.div>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          className="grid md:grid-cols-2 gap-5 mt-10"
        >

          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0px 8px 25px rgba(37,99,235,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/order")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            View My Orders
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0px 8px 25px rgba(34,197,94,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
}

export default OrderSuccess;