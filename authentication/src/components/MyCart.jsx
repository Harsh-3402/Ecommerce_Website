import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Minus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updateCart, deleteCart } from "../services/cartService";

function MyCart({ item, fetchCart }) {
  const [loading, setLoading] = useState(false);

  const handleIncrease = async () => {
    if (item.quantity >= item.product.stock) return;

    setLoading(true);

    try {
      await updateCart(item.product._id, {
        quantity: item.quantity + 1,
      });

      await fetchCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1) return;

    setLoading(true);

    try {
      await updateCart(item.product._id, {
        quantity: item.quantity - 1,
      });

      await fetchCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCart = async () => {
    setLoading(true);

    try {
      await deleteCart(item.product._id);
      await fetchCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden mb-8">

      <div className="flex flex-col lg:flex-row">

        {/* Product Image */}

        <div className="lg:w-80 w-full flex-shrink-0">

          <motion.img
            src={item.product.image}
            alt={item.product.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-72 lg:h-full object-cover"
          />

        </div>

        {/* Product Details */}

        <div className="flex-1 p-6 flex flex-col justify-between">

          {/* Product Information */}

          <div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  {item.product.title}
                </h2>

                <p className="mt-3 text-2xl font-bold text-green-400">
                  ₹{item.product.price}
                </p>

                <p className="mt-2 text-gray-300">
                  Stock:

                  <span
                    className={`ml-2 font-semibold ${
                      item.product.stock > 0
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {item.product.stock > 0
                      ? `${item.product.stock} Available`
                      : "Out of Stock"}
                  </span>
                </p>

              </div>

              {/* Remove Button */}

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
              >
                <Button
                  variant="destructive"
                  onClick={removeCart}
                  disabled={loading}
                  className="gap-2"
                >
                  <Trash2 size={16} />

                  {loading ? "Removing..." : "Remove"}
                </Button>
              </motion.div>

            </div>

          </div>

          {/* Quantity */}

          <div className="mt-8">

            <p className="text-white text-lg font-semibold mb-4">
              Quantity
            </p>

            <div className="flex items-center gap-5">

              {/* Decrease */}

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.85 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  disabled={loading || item.quantity <= 1}
                  onClick={handleDecrease}
                  className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white"
                >
                  <Minus />
                </Button>
              </motion.div>

              {/* Quantity */}

              <motion.span
                key={item.quantity}
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="text-2xl text-white font-bold w-10 text-center"
              >
                {item.quantity}
              </motion.span>

              {/* Increase */}

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.85 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  disabled={
                    loading ||
                    item.quantity >= item.product.stock
                  }
                  onClick={handleIncrease}
                  className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white"
                >
                  <Plus />
                </Button>
              </motion.div>

            </div>

          </div>

          {/* Item Total */}

          <div className="mt-8 border-t border-gray-700 pt-6">

            <div className="flex justify-between items-center">

              <p className="text-xl text-gray-300">
                Item Total
              </p>

              <motion.p
                key={item.quantity * item.product.price}
                initial={{
                  scale: 0.9,
                  opacity: 0.5,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="text-3xl font-bold text-green-400"
              >
                ₹{item.quantity * item.product.price}
              </motion.p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyCart;