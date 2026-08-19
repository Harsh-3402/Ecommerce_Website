import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { getCart } from "../services/cartService";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  const address = location.state?.address;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data.cartItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center text-white">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-5">
            No Shipping Address Found
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Go To Checkout
          </motion.button>
        </motion.div>

      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-white text-2xl">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const taxPrice = Number(
    (subtotal * 0.18).toFixed(2)
  );

  const shippingPrice =
    subtotal >= 1000 ? 0 : 100;

  const totalPrice = Number(
    (subtotal + taxPrice + shippingPrice).toFixed(2)
  );

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center text-white mb-10"
        >
          Order Review
        </motion.h1>

        {/* SHIPPING ADDRESS */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gray-900 rounded-xl p-6 mb-8 shadow-lg border border-gray-800"
        >

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5">

            <h2 className="text-2xl text-white font-bold">
              Shipping Address
            </h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Change Address
            </motion.button>

          </div>

          <div className="text-gray-300 space-y-1">
            <p>{address.fullName}</p>
            <p>{address.phone}</p>
            <p>{address.address}</p>

            <p>
              {address.city}, {address.state}
            </p>

            <p>{address.postalCode}</p>
            <p>{address.country}</p>
          </div>

        </motion.div>

        {/* ORDERED PRODUCTS */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800"
        >

          <h2 className="text-2xl font-bold text-white mb-6">
            Ordered Products
          </h2>

          <div className="space-y-6">

            {cart.map((item, index) => (

              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                }}
                className="flex flex-col md:flex-row gap-6 border-b border-gray-700 pb-6"
              >

                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-48 h-48 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h3 className="text-2xl font-bold text-white">
                    {item.product.title}
                  </h3>

                  <p className="text-green-400 text-xl mt-2">
                    ₹{item.product.price}
                  </p>

                  <p className="text-gray-300 mt-2">
                    Quantity : {item.quantity}
                  </p>

                  <p className="text-2xl font-bold text-green-400 mt-5">
                    Item Total : ₹
                    {item.product.price * item.quantity}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* ORDER SUMMARY */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 rounded-xl p-6 mt-8 shadow-lg border border-gray-800"
        >

          <h2 className="text-2xl font-bold text-white mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Tax (18%)</span>
              <span>₹{taxPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>

              <span>
                {shippingPrice === 0
                  ? "FREE"
                  : `₹${shippingPrice}`}
              </span>
            </div>

            <hr className="border-gray-700" />

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between text-3xl font-bold text-green-400"
            >
              <span>Grand Total</span>

              <span>
                ₹{totalPrice.toFixed(2)}
              </span>
            </motion.div>

          </div>

        </motion.div>

        {/* PAYMENT */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-xl p-6 mt-8 shadow-lg border border-gray-800"
        >

          <h2 className="text-2xl font-bold text-white mb-5">
            Payment
          </h2>

          <p className="text-gray-300 mb-6">
            Review your order before continuing to payment.
          </p>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 0px 20px rgba(34,197,94,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              navigate("/payment", {
                state: {
                  shippingAddress: address,
                  taxPrice,
                  shippingPrice,
                  totalPrice,
                },
              })
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold"
          >
            Proceed To Payment
          </motion.button>

        </motion.div>

      </div>

    </div>
  );
}

export default Order;