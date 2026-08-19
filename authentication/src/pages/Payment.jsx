import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { createOrder } from "../services/orderService";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  if (!shippingAddress) {
    navigate("/checkout");
    return null;
  }

  const paymentOptions = [
    {
      id: "COD",
      title: "Cash On Delivery",
      description: "Pay when your order is delivered.",
      enabled: true,
    },
    {
      id: "ONLINE",
      title: "Online Payment",
      description: "Coming Soon",
      enabled: false,
    },
    {
      id: "UPI",
      title: "UPI",
      description: "Coming Soon",
      enabled: false,
    },
    {
      id: "CARD",
      title: "Credit / Debit Card",
      description: "Coming Soon",
      enabled: false,
    },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const response = await createOrder({
        shippingAddress: {
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
        },

        paymentMethod,

        taxPrice,
        shippingPrice,
        totalPrice,
      });

      navigate("/ordersuccess", {
        state: {
          order: response.data.order,
        },
      });
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-900 w-full max-w-2xl rounded-2xl shadow-xl p-8 border border-gray-800"
      >

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-8"
        >
          Payment Method
        </motion.h1>

        {/* Payment Options */}

        <div className="space-y-5">

          {paymentOptions.map((option, index) => (
            <motion.label
              key={option.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.45,
              }}
              whileHover={
                option.enabled
                  ? {
                      scale: 1.02,
                      borderColor: "#22c55e",
                    }
                  : {}
              }
              className={`flex items-center gap-4 border border-gray-700 rounded-xl p-5 transition ${
                option.enabled
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >

              <input
                type="radio"
                value={option.id}
                disabled={!option.enabled}
                checked={
                  option.enabled &&
                  paymentMethod === option.id
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <div>
                <p className="text-white text-xl font-semibold">
                  {option.title}
                </p>

                <p className="text-gray-400">
                  {option.description}
                </p>
              </div>

            </motion.label>
          ))}

        </div>

        {/* Information */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-gray-400 mt-8"
        >
          More payment methods will be added later.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-5 mt-10"
        >

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            disabled={loading}
            className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white py-3 rounded-xl font-semibold"
          >
            Back
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 25px rgba(34,197,94,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePlaceOrder}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
}

export default Payment;