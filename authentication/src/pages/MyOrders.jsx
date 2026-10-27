import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  ShoppingBag,
  CalendarDays,
  MapPin,
  CreditCard,
  Truck,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Receipt,
  ShieldCheck,
  Ban,
} from "lucide-react";

import {
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../services/orderService";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [cancelSuccess, setCancelSuccess] = useState("");
  const [notification, setNotification] = useState("");

  // Fetch the logged-in user's order history.
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyOrders();

      const fetchedOrders = response.data.orders;

      setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);

      setError(
        err.response?.data?.message ||
          "We couldn't load your orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Automatically hide success notifications.
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  // Format a date for display.
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format currency in Indian Rupees.
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // Normalize status text for consistent styling.
  const normalizeStatus = (status) => {
    return String(status || "Pending").toLowerCase();
  };

  const getOrderStatusStyle = (status) => {
    const value = normalizeStatus(status);

    if (value.includes("deliver")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (value.includes("cancel")) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (value.includes("ship")) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getPaymentStatusStyle = (status) => {
    const value = normalizeStatus(status);

    if (
      value === "paid" ||
      value === "completed" ||
      value === "successful"
    ) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (value.includes("fail")) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  // Handle products whose image is either a string or an object.
  const getProductImage = (product) => {
    if (typeof product?.image === "string") {
      return product.image;
    }

    return product?.image?.url || "";
  };

  // Calculate an order's subtotal from its saved order items.
  const getOrderSubtotal = (order) => {
    return (order.orderItems || []).reduce((total, item) => {
      const price = Number(item.price ?? item.product?.price ?? 0);
      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    }, 0);
  };

  // Open or close an order's details.
  const handleViewDetails = async (order) => {
    if (expandedOrder === order._id) {
      setExpandedOrder(null);
      setSelectedOrder(null);
      return;
    }

    setExpandedOrder(order._id);
    setSelectedOrder(order);
    setDetailsLoading(order._id);

    try {
      const response = await getOrderById(order._id);

      const detailedOrder = response.data.order;

      // Only update the details if this order is still expanded.
      setSelectedOrder((current) =>
        current?._id === order._id ? detailedOrder : current
      );
    } catch (err) {
      console.error("Failed to fetch order details:", err);

      setNotification(
        err.response?.data?.message ||
          "Unable to load additional order details."
      );
    } finally {
      setDetailsLoading(null);
    }
  };

  // Open the cancellation confirmation modal.
  const handleCancelClick = (order) => {
    setCancelError("");
    setCancelSuccess("");
    setSelectedOrder(order);
  };

  // Cancel an order after confirmation.
  const handleConfirmCancel = async () => {
    if (!selectedOrder || cancelling) return;

    setCancelling(true);
    setCancelError("");

    try {
      await cancelOrder(selectedOrder._id);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, orderStatus: "Cancelled" }
            : order
        )
      );

      setSelectedOrder(null);
      setExpandedOrder(null);
      setCancelSuccess("Your order has been cancelled successfully.");

      // Refresh from the backend to show the latest order information.
      await fetchOrders();
    } catch (err) {
      console.error("Failed to cancel order:", err);

      setCancelError(
        err.response?.data?.message ||
          "Unable to cancel this order. Please try again."
      );
    } finally {
      setCancelling(false);
    }
  };

  // Decide whether an order can be cancelled.
  const canCancelOrder = (order) => {
    const status = normalizeStatus(order.orderStatus);

    return status !== "delivered" && status !== "cancelled";
  };

  const getOrderId = (id) => {
    if (!id) return "Unavailable";

    return String(id).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2 rounded-full border border-[#e9e5dc] bg-white px-4 py-2.5 text-sm font-semibold text-[#174638] transition hover:border-[#174638] hover:bg-[#174638] hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </button>

          <button
            type="button"
            onClick={fetchOrders}
            disabled={loading}
            aria-label="Refresh orders"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9e5dc] bg-white text-[#174638] transition hover:bg-[#eaf4e9] disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf4e9] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#174638]">
              <Package size={14} />
              Your Shopping Journey
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#174638] sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#69736c] sm:text-base">
              Track your purchases, review order details, and manage your
              recent orders in one place.
            </p>
          </div>

          {!loading && !error && (
            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#e9e5dc] bg-white px-5 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4e9] text-[#174638]">
                <ShoppingBag size={21} />
              </div>

              <div>
                <p className="text-2xl font-bold leading-none text-[#174638]">
                  {orders.length}
                </p>
                <p className="mt-1 text-xs text-[#69736c]">
                  {orders.length === 1 ? "Total order" : "Total orders"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Success notification */}
        <AnimatePresence>
          {cancelSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800"
            >
              <CheckCircle2 size={20} className="shrink-0" />
              <span>{cancelSuccess}</span>

              <button
                type="button"
                onClick={() => setCancelSuccess("")}
                className="ml-auto"
                aria-label="Dismiss notification"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        {loading && (
          <div className="space-y-5">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white p-5 sm:p-6"
              >
                <div className="mb-5 h-5 w-40 rounded bg-[#eeeae2]" />

                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-xl bg-[#eeeae2]" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-[#eeeae2]" />
                    <div className="h-4 w-1/3 rounded bg-[#eeeae2]" />
                    <div className="h-4 w-1/4 rounded bg-[#eeeae2]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle size={26} />
            </div>

            <h2 className="text-xl font-bold text-[#174638]">
              Couldn't load your orders
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#69736c]">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchOrders}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174638] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#205b49]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#e9e5dc] bg-white px-6 py-14 text-center sm:py-20"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf4e9] text-[#174638]">
              <ShoppingBag size={36} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold text-[#174638]">
              No orders yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#69736c]">
              Your order history will appear here once you place your first
              order. Explore our collection and find something you love.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#174638] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#205b49]"
            >
              Explore Products
              <ArrowRight size={17} />
            </button>
          </motion.div>
        )}

        {/* Order list */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order, index) => {
              const isExpanded = expandedOrder === order._id;

              const orderItems = order.orderItems || [];

              const orderSubtotal = getOrderSubtotal(order);

              const isCancelled =
                normalizeStatus(order.orderStatus) === "cancelled";

              return (
                <motion.article
                  key={order._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_5px_24px_rgba(23,70,56,0.035)] transition-shadow hover:shadow-[0_8px_30px_rgba(23,70,56,0.07)]"
                >
                  {/* Order header */}
                  <div className="border-b border-[#eeeae2] px-5 py-5 sm:px-7">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#69736c]">
                            Order ID
                          </span>

                          <span className="break-all font-mono text-sm font-bold text-[#174638]">
                            #{getOrderId(order._id)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#69736c] sm:text-sm">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            Placed on {formatDate(order.createdAt)}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Package size={15} />
                            {orderItems.length}{" "}
                            {orderItems.length === 1 ? "product" : "products"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getOrderStatusStyle(order.orderStatus)}`}
                        >
                          {normalizeStatus(order.orderStatus).includes("deliver") ? (
                            <CheckCircle2 size={13} />
                          ) : normalizeStatus(order.orderStatus).includes("cancel") ? (
                            <Ban size={13} />
                          ) : (
                            <Clock size={13} />
                          )}

                          {order.orderStatus || "Processing"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product preview and order total */}
                  <div className="px-5 py-5 sm:px-7 sm:py-6">
                    <div className="space-y-4">
                      {orderItems.slice(0, 2).map((item, itemIndex) => {
                        const product = item.product || {};

                        const imageUrl = getProductImage(product);

                        const itemPrice = Number(
                          item.price ?? product.price ?? 0
                        );

                        return (
                          <div
                            key={item._id || `${order._id}-${itemIndex}`}
                            className="flex gap-4"
                          >
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eeeae2] bg-[#fcfaf6] sm:h-24 sm:w-24">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={product.title || "Product"}
                                  className="h-full w-full object-contain p-2"
                                  loading="lazy"
                                />
                              ) : (
                                <Package
                                  size={28}
                                  className="text-[#9aa59d]"
                                />
                              )}
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col justify-center">
                              <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[#174638] sm:text-base">
                                {product.title || "Product information unavailable"}
                              </h3>

                              <p className="mt-1 text-xs text-[#69736c] sm:text-sm">
                                Quantity: {item.quantity || 0}
                              </p>

                              <p className="mt-2 text-sm font-bold text-[#174638]">
                                {formatPrice(itemPrice)}
                                <span className="ml-1 font-normal text-[#69736c]">
                                  per item
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {orderItems.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleViewDetails(order)}
                          className="text-sm font-semibold text-[#174638] underline decoration-[#a6b8aa] underline-offset-4 hover:text-[#537064]"
                        >
                          + {orderItems.length - 2} more{" "}
                          {orderItems.length - 2 === 1 ? "product" : "products"}
                        </button>
                      )}
                    </div>

                    {/* Price and actions */}
                    <div className="mt-6 flex flex-col justify-between gap-4 border-t border-dashed border-[#e5e1d8] pt-5 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs font-medium text-[#69736c]">
                          Total Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-[#174638]">
                          {formatPrice(order.totalPrice)}
                        </p>

                        <p className="mt-1 text-xs text-[#69736c]">
                          {order.paymentMethod || "Payment method unavailable"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleViewDetails(order)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#dce5dc] bg-white px-4 py-3 text-sm font-semibold text-[#174638] transition hover:bg-[#f2f7f1] sm:flex-none"
                        >
                          View Details

                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>

                        {canCancelOrder(order) && (
                          <button
                            type="button"
                            onClick={() => handleCancelClick(order)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:flex-none"
                          >
                            <Ban size={15} />
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded order details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#e9e5dc] bg-[#faf9f5] px-5 py-6 sm:px-7">
                          {detailsLoading === order._id ? (
                            <div className="flex items-center justify-center gap-3 py-8 text-sm text-[#69736c]">
                              <RefreshCw
                                size={18}
                                className="animate-spin"
                              />
                              Loading order details...
                            </div>
                          ) : (
                            <>
                              <div className="mb-6 flex items-center gap-2">
                                <Receipt
                                  size={19}
                                  className="text-[#174638]"
                                />

                                <h3 className="text-lg font-bold text-[#174638]">
                                  Order Details
                                </h3>
                              </div>

                              {/* All products */}
                              <div className="space-y-3">
                                {(selectedOrder?._id === order._id
                                  ? selectedOrder.orderItems || []
                                  : orderItems
                                ).map((item, itemIndex) => {
                                  const product = item.product || {};

                                  const imageUrl = getProductImage(product);

                                  const price = Number(
                                    item.price ?? product.price ?? 0
                                  );

                                  const quantity = Number(item.quantity || 0);

                                  return (
                                    <div
                                      key={item._id || `${order._id}-detail-${itemIndex}`}
                                      className="flex items-center gap-3 rounded-xl border border-[#e9e5dc] bg-white p-3 sm:gap-4"
                                    >
                                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#fcfaf6] sm:h-16 sm:w-16">
                                        {imageUrl ? (
                                          <img
                                            src={imageUrl}
                                            alt={product.title || "Product"}
                                            className="h-full w-full object-contain p-1"
                                          />
                                        ) : (
                                          <Package
                                            size={22}
                                            className="text-[#9aa59d]"
                                          />
                                        )}
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-semibold text-[#174638]">
                                          {product.title || "Product information unavailable"}
                                        </p>

                                        <p className="mt-1 text-xs text-[#69736c]">
                                          Qty: {quantity} × {formatPrice(price)}
                                        </p>
                                      </div>

                                      <p className="shrink-0 text-sm font-bold text-[#174638]">
                                        {formatPrice(price * quantity)}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Shipping address */}
                              <div className="mt-6 rounded-xl border border-[#e9e5dc] bg-white p-4 sm:p-5">
                                <div className="mb-3 flex items-center gap-2">
                                  <MapPin
                                    size={18}
                                    className="text-[#174638]"
                                  />

                                  <h4 className="font-bold text-[#174638]">
                                    Shipping Address
                                  </h4>
                                </div>

                                {(() => {
                                  const address =
                                    selectedOrder?._id === order._id
                                      ? selectedOrder.shippingAddress
                                      : order.shippingAddress;

                                  if (!address) {
                                    return (
                                      <p className="text-sm text-[#69736c]">
                                        Shipping address unavailable.
                                      </p>
                                    );
                                  }

                                  return (
                                    <div className="space-y-1 text-sm leading-6 text-[#69736c]">
                                      <p className="font-semibold text-[#174638]">
                                        {address.fullName}
                                      </p>

                                      <p>{address.address}</p>

                                      <p>
                                        {address.city}, {address.state}{" "}
                                        {address.postalCode}
                                      </p>

                                      <p>{address.country}</p>

                                      <p>Phone: {address.phone}</p>
                                    </div>
                                  );
                                })()}
                              </div>

                              {/* Payment and price breakdown */}
                              <div className="mt-5 grid gap-5 md:grid-cols-2">
                                <div className="rounded-xl border border-[#e9e5dc] bg-white p-4 sm:p-5">
                                  <div className="mb-4 flex items-center gap-2">
                                    <CreditCard
                                      size={18}
                                      className="text-[#174638]"
                                    />

                                    <h4 className="font-bold text-[#174638]">
                                      Payment Information
                                    </h4>
                                  </div>

                                  <div className="space-y-3 text-sm">
                                    <div className="flex justify-between gap-3">
                                      <span className="text-[#69736c]">
                                        Method
                                      </span>

                                      <span className="text-right font-semibold text-[#174638]">
                                        {selectedOrder?.paymentMethod ||
                                          order.paymentMethod ||
                                          "N/A"}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-[#69736c]">
                                        Payment Status
                                      </span>

                                      <span
                                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getPaymentStatusStyle(selectedOrder?.paymentStatus ?? order.paymentStatus)}`}
                                      >
                                        {selectedOrder?.paymentStatus ||
                                          order.paymentStatus ||
                                          "Pending"}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-[#69736c]">
                                        Order Status
                                      </span>

                                      <span
                                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getOrderStatusStyle(selectedOrder?.orderStatus ?? order.orderStatus)}`}
                                      >
                                        {selectedOrder?.orderStatus ||
                                          order.orderStatus ||
                                          "Processing"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-xl border border-[#e9e5dc] bg-white p-4 sm:p-5">
                                  <div className="mb-4 flex items-center gap-2">
                                    <Receipt
                                      size={18}
                                      className="text-[#174638]"
                                    />

                                    <h4 className="font-bold text-[#174638]">
                                      Price Summary
                                    </h4>
                                  </div>

                                  <div className="space-y-3 text-sm">
                                    <div className="flex justify-between gap-3">
                                      <span className="text-[#69736c]">
                                        Items Subtotal
                                      </span>

                                      <span className="font-medium text-[#174638]">
                                        {formatPrice(orderSubtotal)}
                                      </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                      <span className="text-[#69736c]">
                                        Tax
                                      </span>

                                      <span className="font-medium text-[#174638]">
                                        {formatPrice(order.taxPrice)}
                                      </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                      <span className="text-[#69736c]">
                                        Shipping
                                      </span>

                                      <span className="font-medium text-[#174638]">
                                        {Number(order.shippingPrice) === 0
                                          ? "FREE"
                                          : formatPrice(order.shippingPrice)}
                                      </span>
                                    </div>

                                    <div className="flex justify-between gap-3 border-t border-dashed border-[#e5e1d8] pt-3">
                                      <span className="font-bold text-[#174638]">
                                        Total
                                      </span>

                                      <span className="text-lg font-bold text-[#174638]">
                                        {formatPrice(order.totalPrice)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Footer trust message */}
        {!loading && !error && orders.length > 0 && (
          <div className="mt-7 flex flex-col items-center justify-center gap-2 pb-4 text-center text-xs text-[#69736c] sm:flex-row sm:gap-3">
            <ShieldCheck size={16} className="text-[#537064]" />

            <p>
              Your order information is retrieved through your authenticated
              account.
            </p>
          </div>
        )}
      </div>

      {/* Cancel order confirmation modal */}
      <AnimatePresence>
        {selectedOrder &&
          expandedOrder !== selectedOrder._id &&
          !detailsLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#102c22]/50 px-4 py-6 backdrop-blur-sm"
              onClick={(event) => {
                if (event.target === event.currentTarget && !cancelling) {
                  setSelectedOrder(null);
                  setCancelError("");
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                className="w-full max-w-md rounded-2xl border border-[#e9e5dc] bg-[#fcfaf6] p-6 shadow-2xl sm:p-7"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cancel-order-title"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Ban size={23} />
                  </div>

                  <button
                    type="button"
                    disabled={cancelling}
                    onClick={() => {
                      setSelectedOrder(null);
                      setCancelError("");
                    }}
                    className="rounded-full p-2 text-[#69736c] transition hover:bg-white hover:text-[#174638] disabled:opacity-50"
                    aria-label="Close dialog"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h2
                  id="cancel-order-title"
                  className="text-xl font-bold text-[#174638]"
                >
                  Cancel this order?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#69736c]">
                  Are you sure you want to cancel order{" "}
                  <span className="font-semibold text-[#174638]">
                    #{getOrderId(selectedOrder._id)}
                  </span>
                  ? This action may not be reversible.
                </p>

                <div className="mt-4 rounded-xl border border-[#e9e5dc] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-[#69736c]">
                      Order total
                    </span>

                    <span className="font-bold text-[#174638]">
                      {formatPrice(selectedOrder.totalPrice)}
                    </span>
                  </div>
                </div>

                {cancelError && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />

                    <p>{cancelError}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    disabled={cancelling}
                    onClick={() => {
                      setSelectedOrder(null);
                      setCancelError("");
                    }}
                    className="flex-1 rounded-xl border border-[#dce5dc] bg-white px-4 py-3 text-sm font-semibold text-[#174638] transition hover:bg-[#f2f7f1] disabled:opacity-50"
                  >
                    Keep Order
                  </button>

                  <button
                    type="button"
                    disabled={cancelling}
                    onClick={handleConfirmCancel}
                    className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancelling ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <RefreshCw size={16} className="animate-spin" />
                        Cancelling...
                      </span>
                    ) : (
                      "Yes, Cancel Order"
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

export default MyOrders;