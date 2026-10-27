import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  LockKeyhole,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
  AlertCircle,
} from "lucide-react";
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
  const [errorMessage, setErrorMessage] = useState("");

  if (!shippingAddress) {
    navigate("/checkout", { replace: true });
    return null;
  }

  const paymentOptions = [
    {
      id: "COD",
      title: "Cash on Delivery",
      description: "Pay when your order arrives at your doorstep.",
      enabled: true,
      badge: "Available",
      icon: Wallet,
      iconBg: "bg-[#eaf4e9]",
      iconColor: "text-[#174638]",
      visual: "cash",
    },
    {
      id: "UPI",
      title: "UPI",
      description: "Google Pay, PhonePe, Paytm and more.",
      enabled: false,
      badge: "Coming Soon",
      icon: Smartphone,
      iconBg: "bg-[#f0ecfb]",
      iconColor: "text-[#7253a6]",
      visual: "upi",
    },
    {
      id: "CARD",
      title: "Credit / Debit Card",
      description: "Visa, Mastercard and other supported cards.",
      enabled: false,
      badge: "Coming Soon",
      icon: CreditCard,
      iconBg: "bg-[#eaf0f8]",
      iconColor: "text-[#355f94]",
      visual: "card",
    },
  ];

  const handlePlaceOrder = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage("");

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

      setErrorMessage(
        error.response?.data?.message ||
          "We couldn't place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Render payment-brand visuals
  const renderPaymentVisual = (option) => {
    const Icon = option.icon;

    if (option.visual === "upi") {
      return (
        <div className="flex h-14 w-[76px] shrink-0 items-center justify-center gap-1 rounded-xl border border-[#e9e5dc] bg-white">
          <span className="text-xl font-black italic tracking-tight text-[#5f3dc4]">
            U
          </span>
          <span className="text-lg font-black italic tracking-tight text-[#4285f4]">
            P
          </span>
          <span className="text-xl font-black italic tracking-tight text-[#ea4335]">
            I
          </span>
        </div>
      );
    }

    if (option.visual === "card") {
      return (
        <div className="flex h-14 w-[76px] shrink-0 items-center justify-center rounded-xl border border-[#e9e5dc] bg-white">
          <div className="relative flex items-center">
            <div className="h-6 w-6 rounded-full bg-[#df514b]" />
            <div className="-ml-2 h-6 w-6 rounded-full bg-[#e7a23c]/90" />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`flex h-14 w-[76px] shrink-0 items-center justify-center rounded-xl border border-[#e9e5dc] bg-white ${option.iconColor}`}
      >
        <Icon size={28} strokeWidth={1.8} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Navigation */}
        <motion.button
          type="button"
          onClick={() => navigate(-1)}
          disabled={loading}
          whileHover={{ x: -3 }}
          className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#537064] transition-colors hover:text-[#174638] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={18} />
          Back to order review
        </motion.button>

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-9 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#174638]/10 text-[#174638]">
            <CreditCard size={27} strokeWidth={1.8} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#668373]">
            Secure checkout
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#174638] sm:text-4xl">
            Payment Method
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#69736c] sm:text-base">
            Choose how you'd like to pay for your ShopNest order.
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
                <Package size={18} />
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

            {/* Payment */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#174638] bg-[#174638]/10 text-[#174638]">
                <CreditCard size={18} />
              </div>

              <span className="mt-2 text-xs font-bold text-[#174638] sm:text-sm">
                Payment
              </span>
            </div>

          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1fr_350px]">

          {/* LEFT: Payment Methods */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_5px_25px_rgba(23,70,56,0.04)]"
          >
            {/* Section Heading */}
            <div className="border-b border-[#e9e5dc] px-5 py-5 sm:px-7">
              <h2 className="text-lg font-bold text-[#174638] sm:text-xl">
                Select Payment Method
              </h2>

              <p className="mt-1 text-sm text-[#7a827b]">
                Choose one of the available payment options below.
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-4 p-5 sm:p-7">
              {paymentOptions.map((option, index) => {
                const selected =
                  option.enabled && paymentMethod === option.id;

                return (
                  <motion.label
                    key={option.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.08,
                      duration: 0.35,
                    }}
                    whileHover={option.enabled ? { y: -2 } : {}}
                    className={`relative flex items-center gap-3 rounded-2xl border p-4 transition-all duration-200 sm:gap-4 sm:p-5 ${
                      selected
                        ? "border-[#174638] bg-[#f1f5ef] shadow-[0_0_0_1px_rgba(23,70,56,0.08)]"
                        : option.enabled
                          ? "cursor-pointer border-[#e9e5dc] bg-white hover:border-[#b8c9bd] hover:bg-[#fcfaf6]"
                          : "cursor-not-allowed border-[#eeeae2] bg-[#faf9f6] opacity-70"
                    }`}
                  >
                    {/* Radio */}
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      disabled={!option.enabled || loading}
                      checked={selected}
                      onChange={() => {
                        setPaymentMethod(option.id);
                        setErrorMessage("");
                      }}
                      className="h-4 w-4 shrink-0 accent-[#174638]"
                    />

                    {/* Payment Icon / Brand Visual */}
                    {renderPaymentVisual(option)}

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-[#263b30] sm:text-base">
                          {option.title}
                        </p>

                        {selected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#174638] px-2 py-1 text-[10px] font-bold text-white">
                            <Check size={11} />
                            SELECTED
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-[#7a827b] sm:text-sm">
                        {option.description}
                      </p>

                      {!option.enabled && (
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#f0ede5] px-2.5 py-1 text-[10px] font-semibold text-[#81765d]">
                          <Clock size={11} />
                          Coming Soon
                        </div>
                      )}

                      {option.id === "COD" && (
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#eaf4e9] px-2.5 py-1 text-[10px] font-semibold text-[#174638]">
                          <CheckCircle2 size={12} />
                          Available now
                        </div>
                      )}
                    </div>

                    {/* Selected Indicator */}
                    {selected && (
                      <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#174638] text-white sm:right-4 sm:top-4">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </motion.label>
                );
              })}
            </div>

            {/* Coming Soon Message */}
            <div className="mx-5 mb-5 flex items-start gap-3 rounded-xl border border-[#eeeae2] bg-[#fcfaf6] p-4 sm:mx-7 sm:mb-7">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#537064]">
                <Smartphone size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#344b3e]">
                  More ways to pay are on the way
                </p>

                <p className="mt-1 text-xs leading-5 text-[#7a827b]">
                  UPI and credit/debit cards will become available once their
                  payment integrations are configured.
                </p>
              </div>
            </div>
          </motion.section>

          {/* RIGHT: Order Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_5px_25px_rgba(23,70,56,0.04)] lg:sticky lg:top-6"
          >
            <div className="border-b border-[#e9e5dc] px-5 py-5">
              <h2 className="text-lg font-bold text-[#174638]">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-[#7a827b]">
                Your payment breakdown
              </p>
            </div>

            <div className="space-y-4 p-5">

              {/* Subtotal */}
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-[#69736c]">Subtotal</span>

                <span className="font-semibold text-[#344b3e]">
                  {Number(totalPrice - taxPrice - shippingPrice).toLocaleString(
                    "en-IN",
                    {
                      style: "currency",
                      currency: "INR",
                    }
                  )}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-[#69736c]">Tax</span>

                <span className="font-semibold text-[#344b3e]">
                  ₹{Number(taxPrice).toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-[#69736c]">Shipping</span>

                <span className="font-semibold text-[#174638]">
                  {Number(shippingPrice) === 0
                    ? "FREE"
                    : `₹${Number(shippingPrice).toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-dashed border-[#dedbd2] pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-[#174638]">
                    Total Payable
                  </span>

                  <span className="text-2xl font-bold text-[#174638]">
                    ₹{Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <p className="mt-2 text-xs text-[#7a827b]">
                  Final amount for your order.
                </p>
              </div>

              {/* Payment Selected */}
              <div className="rounded-xl bg-[#f1f5ef] p-3">
                <div className="flex items-center gap-2">
                  <Wallet size={18} className="text-[#174638]" />

                  <div>
                    <p className="text-xs text-[#69736c]">
                      Selected payment method
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-[#174638]">
                      {paymentOptions.find(
                        (option) => option.id === paymentMethod
                      )?.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                onClick={handlePlaceOrder}
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#174638] px-5 py-4 font-bold text-white shadow-sm transition-colors hover:bg-[#205b49] focus:outline-none focus:ring-4 focus:ring-[#174638]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    />

                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight size={19} />
                  </>
                )}
              </motion.button>

              {/* Trust Message */}
              <div className="flex items-start justify-center gap-2 pt-1 text-center">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-[#537064]"
                />

                <p className="text-xs leading-5 text-[#7a827b]">
                  Your order details are submitted securely to ShopNest.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Delivery / COD Information */}
        {paymentMethod === "COD" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 flex items-start gap-4 rounded-2xl border border-[#dce5da] bg-[#f1f5ef] p-5 sm:p-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#174638]">
              <Truck size={22} />
            </div>

            <div>
              <h3 className="font-bold text-[#174638]">
                Pay at your doorstep
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#69736c]">
                You've selected Cash on Delivery. Pay the delivery amount
                when your order arrives, according to the delivery
                arrangements.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-semibold">Order could not be placed</p>

              <p className="mt-1 text-sm leading-5">
                {errorMessage}
              </p>
            </div>
          </motion.div>
        )}

        {/* Bottom Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#7a827b]">
          <div className="flex items-center gap-2">
            <LockKeyhole size={15} className="text-[#537064]" />
            Secure checkout
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-[#537064]" />
            Trusted shopping experience
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#537064]" />
            Order confirmation after placement
          </div>
        </div>

      </div>
    </div>
  );
}

export default Payment;