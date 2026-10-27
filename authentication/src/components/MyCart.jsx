import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Minus,
  Trash2,
  Package,
  ShoppingBag,
  Heart,
  X,
} from "lucide-react";

import { updateCart, deleteCart } from "../services/cartService";

function MyCart({ item, fetchCart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const imageUrl =
    typeof item.product.image === "string"
      ? item.product.image
      : item.product.image?.url;

  const price = Number(item.product.price) || 0;
  const stock = Math.max(0, Number(item.product.stock) || 0);
  const itemTotal = price * item.quantity;

  const handleIncrease = async () => {
    if (item.quantity >= stock || loading) return;

    setLoading(true);
    setError("");

    try {
      await updateCart(item.product._id, {
        quantity: item.quantity + 1,
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
      setError("Unable to update quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1 || loading) return;

    setLoading(true);
    setError("");

    try {
      await updateCart(item.product._id, {
        quantity: item.quantity - 1,
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
      setError("Unable to update quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Remove product only after confirmation
  const removeCart = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await deleteCart(item.product._id);

      setShowRemoveModal(false);

      await fetchCart();
    } catch (error) {
      console.error(error);
      setError("Unable to remove this product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.article
        layout
        className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Product Image */}
          <div className="w-full shrink-0 overflow-hidden bg-[#f3f0e8] sm:w-44 md:w-52">
            {imageUrl ? (
              <motion.img
                src={imageUrl}
                alt={item.product.title}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto sm:min-h-[240px]"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center sm:min-h-[240px]">
                <Package size={42} className="text-[#9ba99b]" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
            <div>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64806e]">
                    {item.product.category || "ShopNest Collection"}
                  </p>

                  <h2 className="mt-2 break-words font-serif text-xl font-bold leading-snug text-[#19372f] sm:text-2xl">
                    {item.product.title}
                  </h2>

                  <p className="mt-3 text-lg font-bold text-[#174b3b]">
                    ₹{price.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-2 text-sm text-[#7b817a]">
                    {stock > 0 ? (
                      <>
                        <span className="mr-1.5 text-[#26714e]">●</span>
                        {stock} available
                      </>
                    ) : (
                      <span className="text-red-600">Out of stock</span>
                    )}
                  </p>
                </div>

                {/* Remove Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowRemoveModal(true)}
                  disabled={loading}
                  className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#ead7d1] px-3.5 py-2.5 text-sm font-semibold text-[#a64c3c] transition hover:bg-[#fbefec] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Remove
                </motion.button>
              </div>
            </div>

            {/* Quantity and Item Total */}
            <div className="mt-7 border-t border-[#eeeae2] pt-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                {/* Quantity Selector */}
                <div>
                  <p className="mb-3 text-sm font-semibold text-[#19372f]">
                    Quantity
                  </p>

                  <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#d9e2d9]">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDecrease}
                      disabled={loading || item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="p-2.5 text-[#174638] transition hover:bg-[#e9eee6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={16} />
                    </motion.button>

                    <motion.span
                      key={item.quantity}
                      initial={{ opacity: 0.5, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      aria-live="polite"
                      className="min-w-10 text-center text-sm font-bold text-[#19372f]"
                    >
                      {item.quantity}
                    </motion.span>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={handleIncrease}
                      disabled={loading || item.quantity >= stock}
                      aria-label="Increase quantity"
                      className="p-2.5 text-[#174638] transition hover:bg-[#e9eee6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>

                  {item.quantity >= stock && stock > 0 && (
                    <p className="mt-2 text-xs text-[#8c928a]">
                      Maximum available quantity reached
                    </p>
                  )}
                </div>

                {/* Item Total */}
                <div className="sm:text-right">
                  <p className="text-sm text-[#7b817a]">Item Total</p>

                  <motion.p
                    key={itemTotal}
                    initial={{ opacity: 0.5, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 text-2xl font-bold text-[#174638]"
                  >
                    ₹{itemTotal.toLocaleString("en-IN")}
                  </motion.p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.article>

      {/* Remove Confirmation Modal */}
      <AnimatePresence>
        {showRemoveModal && (
          <motion.div
            key="remove-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#14251e]/50 px-4 py-6 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget &&
                !loading
              ) {
                setShowRemoveModal(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="remove-modal-title"
              aria-describedby="remove-modal-description"
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#e9e5dc] bg-[#fcfaf6] p-6 shadow-2xl sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowRemoveModal(false)}
                disabled={loading}
                aria-label="Close confirmation"
                className="absolute right-4 top-4 rounded-full p-2 text-[#7b817a] transition hover:bg-[#e9eee6] hover:text-[#19372f] disabled:opacity-50"
              >
                <X size={19} />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0.7, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e9eee6]"
              >
                <ShoppingBag size={30} className="text-[#174638]" />
              </motion.div>

              {/* Heading */}
              <h2
                id="remove-modal-title"
                className="mt-5 text-center font-serif text-2xl font-bold text-[#19372f] sm:text-3xl"
              >
                Leaving something behind?
              </h2>

              {/* Persuasive Message */}
              <p
                id="remove-modal-description"
                className="mx-auto mt-3 max-w-sm text-center text-sm leading-7 text-[#69736c]"
              >
                <span className="font-semibold text-[#174638]">
                  {item.product.title}
                </span>{" "}
                looks like a great choice! Are you sure you want to remove it
                from your cart? We'd love for you to keep it a little longer.
              </p>

              {/* Friendly Reminder */}
              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#e1e8dc] bg-white px-4 py-3">
                <Heart
                  size={17}
                  className="shrink-0 text-[#64806e]"
                />

                <p className="text-center text-xs font-medium leading-5 text-[#537064]">
                  Great finds deserve a second thought.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                {/* No: Keep Product */}
                <motion.button
                  type="button"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  onClick={() => setShowRemoveModal(false)}
                  disabled={loading}
                  className="flex-1 rounded-lg border border-[#d9e2d9] bg-white px-4 py-3.5 text-sm font-semibold text-[#174638] transition hover:bg-[#e9eee6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  No, Keep It
                </motion.button>

                {/* Yes: Remove Product */}
                <motion.button
                  type="button"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  onClick={removeCart}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#a64c3c] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8f3e31] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Removing..." : "Yes, Remove It"}
                </motion.button>
              </div>

              <p className="mt-4 text-center text-xs text-[#8c928a]">
                You can always find it again in our collection.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MyCart;