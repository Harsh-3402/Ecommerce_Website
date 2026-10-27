import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Package,
  ShoppingBag,
  ClipboardCheck,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Pencil,
} from "lucide-react";
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

  // No shipping address
  if (!address) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfaf6] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-[#e9e5dc] bg-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1f5ef] text-[#174638]">
            <MapPin size={30} />
          </div>

          <h2 className="text-2xl font-bold text-[#174638]">
            Shipping Address Required
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#69736c]">
            We need your delivery information before you can review your order.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/checkout")}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#174638] px-5 py-3.5 font-semibold text-white transition-colors hover:bg-[#205b49]"
          >
            Add Shipping Address
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfaf6] px-4">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#174638]/10 text-[#174638]">
            <ShoppingBag size={27} />
          </div>

          <p className="text-lg font-semibold text-[#174638]">
            Preparing your order...
          </p>

          <p className="mt-1 text-sm text-[#69736c]">
            Getting your cart ready for review.
          </p>
        </motion.div>
      </div>
    );
  }

  // Empty cart safeguard
  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfaf6] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-[#e9e5dc] bg-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1f5ef] text-[#174638]">
            <ShoppingBag size={30} />
          </div>

          <h2 className="text-2xl font-bold text-[#174638]">
            Your Cart Is Empty
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#69736c]">
            There are no products to review right now. Explore our collection
            and find something you love.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#174638] px-5 py-3.5 font-semibold text-white transition-colors hover:bg-[#205b49]"
          >
            Explore Products
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Existing price calculations — unchanged
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const taxPrice = Number((subtotal * 0.18).toFixed(2));

  const shippingPrice = subtotal >= 1000 ? 0 : 100;

  const totalPrice = Number(
    (subtotal + taxPrice + shippingPrice).toFixed(2)
  );

  return (
    <div className="min-h-screen bg-[#fcfaf6] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Navigation */}
        <motion.button
          type="button"
          onClick={() => navigate("/checkout")}
          whileHover={{ x: -3 }}
          className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#537064] transition-colors hover:text-[#174638]"
        >
          <ArrowLeft size={18} />
          Back to shipping
        </motion.button>

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-9 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#668373]">
            One last look
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#174638] sm:text-4xl">
            Review Your Order
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#69736c] sm:text-base">
            Check your delivery details and make sure everything looks right
            before proceeding to payment.
          </p>
        </motion.div>

        {/* Checkout Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-10 max-w-2xl"
        >
          <div className="flex items-center justify-center">

            {/* Cart */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174638] text-white">
                <ShoppingBag size={18} />
              </div>

              <span className="mt-2 text-xs font-semibold text-[#174638] sm:text-sm">
                Cart
              </span>
            </div>

            <div className="mx-3 mb-5 h-px flex-1 bg-[#174638] sm:mx-5" />

            {/* Shipping */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174638] text-white">
                <MapPin size={18} />
              </div>

              <span className="mt-2 text-xs font-semibold text-[#174638] sm:text-sm">
                Shipping
              </span>
            </div>

            <div className="mx-3 mb-5 h-px flex-1 bg-[#174638] sm:mx-5" />

            {/* Review */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#174638] bg-[#174638]/10 text-[#174638]">
                <ClipboardCheck size={18} />
              </div>

              <span className="mt-2 text-xs font-bold text-[#174638] sm:text-sm">
                Review
              </span>
            </div>
          </div>
        </motion.div>

        {/* Shipping Address */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-7 overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_5px_25px_rgba(23,70,56,0.04)]"
        >
          {/* Section Header */}
          <div className="flex flex-col gap-4 border-b border-[#e9e5dc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f5ef] text-[#174638]">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#174638] sm:text-xl">
                  Shipping Address
                </h2>

                <p className="mt-1 text-sm text-[#7a827b]">
                  Your order will be delivered here.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate("/checkout", {
                  state: { address },
                })
              }
              className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl border border-[#dce5da] bg-[#f5f7f1] px-4 py-2.5 text-sm font-semibold text-[#174638] transition-colors hover:bg-[#eaf0e7] sm:self-auto"
            >
              <Pencil size={15} />
              Change Address
            </motion.button>
          </div>

          {/* Address Details */}
          <div className="p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fcfaf6] text-[#537064]">
                <Truck size={17} />
              </div>

              <div className="min-w-0">
                <p className="break-words font-bold text-[#263b30]">
                  {address.fullName}
                </p>

                <p className="mt-1 text-sm text-[#69736c]">
                  {address.phone}
                </p>

                <p className="mt-3 break-words text-sm leading-6 text-[#536259]">
                  {address.address}
                  <br />
                  {address.city}, {address.state} - {address.postalCode}
                  <br />
                  {address.country}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#f1f5ef] px-3 py-1.5 text-xs font-semibold text-[#174638]">
                  <CheckCircle2 size={14} />
                  Delivery address added
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Ordered Products */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_5px_25px_rgba(23,70,56,0.04)]"
        >
          {/* Products Header */}
          <div className="flex items-center justify-between border-b border-[#e9e5dc] px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f5ef] text-[#174638]">
                <Package size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#174638] sm:text-xl">
                  Ordered Products
                </h2>

                <p className="mt-1 text-sm text-[#7a827b]">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your order
                </p>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="divide-y divide-[#eeeae2] px-5 sm:px-7">
            {cart.map((item, index) => {
              const imageUrl =
                typeof item.product.image === "string"
                  ? item.product.image
                  : item.product.image?.url;

              const itemTotal = item.product.price * item.quantity;

              return (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + index * 0.08,
                    duration: 0.35,
                  }}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6"
                >
                  {/* Product Image */}
                  <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl border border-[#eeeae2] bg-[#fcfaf6] sm:h-28 sm:w-28">
                    {imageUrl ? (
                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        src={imageUrl}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#9a9d93]">
                        <ShoppingBag size={30} />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-lg font-bold text-[#263b30] sm:text-xl">
                      {item.product.title}
                    </h3>

                    <p className="mt-2 text-base font-semibold text-[#174638]">
                      ₹{Number(item.product.price).toFixed(2)}
                      <span className="ml-1 text-sm font-normal text-[#7a827b]">
                        / item
                      </span>
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#fcfaf6] px-3 py-2 text-sm text-[#69736c]">
                      <ShoppingBag size={15} />
                      Quantity:{" "}
                      <span className="font-semibold text-[#344b3e]">
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex items-center justify-between border-t border-dashed border-[#e9e5dc] pt-4 sm:min-w-32 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
                    <p className="text-sm text-[#7a827b]">
                      Item Total
                    </p>

                    <p className="text-lg font-bold text-[#174638]">
                      ₹{Number(itemTotal).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Order Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-7 overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_5px_25px_rgba(23,70,56,0.04)]"
        >
          <div className="border-b border-[#e9e5dc] px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1f5ef] text-[#174638]">
                <ClipboardCheck size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#174638] sm:text-xl">
                  Order Summary
                </h2>

                <p className="mt-1 text-sm text-[#7a827b]">
                  A breakdown of your order total.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="space-y-4">

              {/* Subtotal */}
              <div className="flex justify-between gap-4 text-sm sm:text-base">
                <span className="text-[#69736c]">Subtotal</span>

                <span className="font-semibold text-[#344b3e]">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between gap-4 text-sm sm:text-base">
                <span className="text-[#69736c]">Tax (18%)</span>

                <span className="font-semibold text-[#344b3e]">
                  ₹{taxPrice.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between gap-4 text-sm sm:text-base">
                <div>
                  <span className="text-[#69736c]">Shipping</span>

                  {shippingPrice === 0 && (
                    <p className="mt-1 text-xs text-[#537064]">
                      Your order qualifies for free shipping!
                    </p>
                  )}
                </div>

                <span
                  className={`font-semibold ${
                    shippingPrice === 0
                      ? "text-[#174638]"
                      : "text-[#344b3e]"
                  }`}
                >
                  {shippingPrice === 0
                    ? "FREE"
                    : `₹${shippingPrice.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-dashed border-[#dedbd2] pt-5">
                <motion.div
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-base font-bold text-[#174638] sm:text-lg">
                      Grand Total
                    </p>

                    <p className="mt-1 text-xs text-[#7a827b]">
                      Inclusive of applicable tax and shipping
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-[#174638] sm:text-3xl">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Payment Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-7 overflow-hidden rounded-2xl border border-[#dce5da] bg-[#f1f5ef]"
        >
          <div className="p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#174638] shadow-sm">
                <CreditCard size={24} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#174638] sm:text-xl">
                  Ready for Payment?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#69736c]">
                  Your products and delivery address are ready. Continue to
                  the payment page to complete the next step.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
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
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#174638] px-5 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#205b49] focus:outline-none focus:ring-4 focus:ring-[#174638]/20 sm:text-lg"
            >
              Proceed to Payment
              <ArrowRight size={20} />
            </motion.button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#537064]">
              <ShieldCheck size={16} className="shrink-0" />
              Review your order carefully before completing payment.
            </div>
          </div>
        </motion.section>

        {/* Bottom Navigation */}
        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#537064] transition-colors hover:text-[#174638]"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}

export default Order;