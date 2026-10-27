import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Check,
  CheckCircle2,
  Copy,
  Package,
  ShoppingBag,
  ArrowRight,
  ClipboardCheck,
  Truck,
  CreditCard,
  ShieldCheck,
  Clock,
  MapPin,
  Receipt,
} from "lucide-react";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!order) {
      navigate("/products", { replace: true });
    }
  }, [order, navigate]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (!order) return null;

  const orderId = order._id;
  const paymentMethod = order.paymentMethod || "N/A";
  const orderStatus = order.orderStatus || "Processing";
  const paymentStatus = order.paymentStatus || "Pending";

  const totalAmount = Number(order.totalPrice || 0);

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy order ID:", error);
    }
  };

  const getOrderStatusStyle = (status) => {
    const normalizedStatus = String(status).toLowerCase();

    if (normalizedStatus.includes("deliver")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (normalizedStatus.includes("cancel")) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getPaymentStatusStyle = (status) => {
    const normalizedStatus = String(status).toLowerCase();

    if (normalizedStatus === "paid" || normalizedStatus === "completed") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (normalizedStatus.includes("fail")) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-[#e9e5dc] bg-white shadow-[0_10px_45px_rgba(23,70,56,0.07)]"
        >
          {/* Top Accent */}
          <div className="h-2 bg-[#174638]" />

          <div className="px-5 py-8 sm:px-10 sm:py-12">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 180,
              }}
              className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#eaf4e9] text-[#174638] sm:h-28 sm:w-28"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#174638] text-white sm:h-[76px] sm:w-[76px]"
              >
                <Check size={42} strokeWidth={2.5} />
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#d5e8d2] text-[#174638]"
              >
                <CheckCircle2 size={17} />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-7 text-center"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#668373]">
                Order Confirmation
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#174638] sm:text-4xl">
                Order Placed Successfully!
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#69736c] sm:text-base">
                Thank you for shopping with ShopNest. Your order has been
                received, and we're getting it ready for you.
              </p>
            </motion.div>

            {/* Order ID Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#dce5da] bg-[#f4f7f1] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#174638] shadow-sm">
                    <Receipt size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#69736c]">
                      Your Order ID
                    </p>

                    <p className="mt-1 break-all text-lg font-bold text-[#174638] sm:text-xl">
                      #{orderId}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 self-start rounded-xl border border-[#dce5da] bg-white px-4 py-2.5 text-sm font-semibold text-[#174638] transition-colors hover:bg-[#eaf4e9] sm:self-center"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Order ID
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-8 overflow-hidden rounded-2xl border border-[#e9e5dc]"
            >
              <div className="flex items-center gap-3 border-b border-[#e9e5dc] bg-[#fcfaf6] px-5 py-4 sm:px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#174638]">
                  <Package size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-[#174638]">Order Details</h2>

                  <p className="mt-0.5 text-xs text-[#7a827b]">
                    Summary of your purchase
                  </p>
                </div>
              </div>

              <div className="space-y-0 px-5 sm:px-6">
                {/* Total Amount */}
                <div className="flex items-center justify-between gap-4 border-b border-[#eeeae2] py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf4e9] text-[#174638]">
                      <span className="text-xl font-bold">₹</span>
                    </div>

                    <span className="text-sm text-[#69736c]">Total Amount</span>
                  </div>

                  <span className="text-lg font-bold text-[#174638]">
                    {totalAmount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between gap-4 border-b border-[#eeeae2] py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f3f0e8] text-[#89764c]">
                      <CreditCard size={18} />
                    </div>

                    <span className="text-sm text-[#69736c]">
                      Payment Method
                    </span>
                  </div>

                  <span className="text-right text-sm font-semibold text-[#344b3e]">
                    {paymentMethod}
                  </span>
                </div>

                {/* Order Status */}
                <div className="flex items-center justify-between gap-4 border-b border-[#eeeae2] py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff4dc] text-[#9b7529]">
                      <Package size={18} />
                    </div>

                    <span className="text-sm text-[#69736c]">Order Status</span>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getOrderStatusStyle(orderStatus)}`}
                  >
                    {orderStatus}
                  </span>
                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0ecfb] text-[#7253a6]">
                      <ShieldCheck size={18} />
                    </div>

                    <span className="text-sm text-[#69736c]">
                      Payment Status
                    </span>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getPaymentStatusStyle(paymentStatus)}`}
                  >
                    {paymentStatus}
                  </span>
                </div>
              </div>
            </motion.section>

            {/* What's Next */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-7 rounded-2xl border border-[#e9e5dc] bg-white p-5 sm:p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-[#174638]">
                <ClipboardCheck size={21} />
                What's Next?
              </h2>

              <div className="mt-6 space-y-5">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf4e9] text-[#174638]">
                    <CheckCircle2 size={20} />
                  </div>

                  <div className="pt-0.5">
                    <h3 className="text-sm font-bold text-[#344b3e]">
                      Order Confirmed
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-[#7a827b]">
                      Your order has been successfully placed with ShopNest.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f0e8] text-[#89764c]">
                    <Clock size={20} />
                  </div>

                  <div className="pt-0.5">
                    <h3 className="text-sm font-bold text-[#344b3e]">
                      Order Processing
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-[#7a827b]">
                      We'll prepare your order for the next stage of delivery.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf0f8] text-[#355f94]">
                    <Truck size={20} />
                  </div>

                  <div className="pt-0.5">
                    <h3 className="text-sm font-bold text-[#344b3e]">
                      Delivery Updates
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-[#7a827b]">
                      Visit your orders page to check your order's progress.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* COD Information */}
            {String(paymentMethod).toUpperCase() === "COD" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-start gap-4 rounded-2xl border border-[#dce5da] bg-[#f1f5ef] p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#174638]">
                  <Truck size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-[#174638]">
                    Pay at Your Doorstep
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#69736c]">
                    You've selected Cash on Delivery. Keep the payable amount
                    ready when your order arrives.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/my-orders")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#dce5da] bg-white px-5 py-4 font-bold text-[#174638] transition-colors hover:bg-[#f1f5ef] focus:outline-none focus:ring-4 focus:ring-[#174638]/10"
              >
                <Package size={19} />
                View My Orders
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/products")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#174638] px-5 py-4 font-bold text-white shadow-sm transition-colors hover:bg-[#205b49] focus:outline-none focus:ring-4 focus:ring-[#174638]/20"
              >
                <ShoppingBag size={19} />
                Continue Shopping
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[#eeeae2] pt-6 text-xs text-[#7a827b]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#537064]" />
                Secure checkout
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#537064]" />
                Order confirmation
              </div>

              <div className="flex items-center gap-2">
                <ShoppingBag size={15} className="text-[#537064]" />
                Thank you for choosing ShopNest
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OrderSuccess;
