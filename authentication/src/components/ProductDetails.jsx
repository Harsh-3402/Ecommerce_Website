import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { getProductById } from "../services/productService";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addToCart } from "../services/cartService";
import {
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle2,
  Package,
  RefreshCw,
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartError, setCartError] = useState("");

  // Fetch product details
  async function fetchProduct() {
    setLoading(true);
    setError("");
    setProduct(null);
    setQuantity(1);

    try {
      const response = await getProductById(id);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("We couldn't load this product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, Number(product.stock)));
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Add product to cart
  const handleAddToCart = async () => {
    if (!product || product.stock <= 0 || addingToCart) return;

    if (quantity > product.stock) {
      setCartError("The requested quantity is no longer available.");
      return;
    }

    setAddingToCart(true);
    setCartError("");

    try {
      await addToCart({
        productId: product._id,
        quantity,
      });

      navigate("/cart");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      setCartError(
        error.response?.data?.message ||
          "Failed to add this product to your cart. Please try again."
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#fcfaf6]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={30} className="text-[#174638]" />
        </motion.div>

        <p className="text-sm font-medium text-[#537064]">
          Finding something special for you...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#fcfaf6] px-5 text-center"
      >
        <p className="text-lg font-semibold text-[#19372f]">{error}</p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={fetchProduct}
            className="rounded-lg bg-[#174638] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#205b49]"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/products")}
            className="rounded-lg border border-[#d9e2d9] px-5 py-3 text-sm font-semibold text-[#174638] transition hover:bg-[#e9eee6]"
          >
            Browse Products
          </button>
        </div>
      </motion.div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#fcfaf6] px-5 text-center"
      >
        <Package size={48} className="text-[#8b9b8e]" />

        <h1 className="text-2xl font-semibold text-[#19372f]">
          Product not found
        </h1>

        <p className="max-w-sm text-sm leading-6 text-[#69736c]">
          This product may have been removed or is no longer available.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="rounded-lg bg-[#174638] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#205b49]"
        >
          Browse Products
        </button>
      </motion.div>
    );
  }

  const imageUrl =
    typeof product.image === "string" ? product.image : product.image?.url;

  const stock = Math.max(0, Number(product.stock) || 0);
  const price = Number(product.price) || 0;
  const isInStock = stock > 0;

  return (
    <main className="min-h-screen bg-[#fcfaf6] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb navigation */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/products")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#537064] transition hover:text-[#104534]"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </button>

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
          >
            <Link
              to="/"
              className="text-[#7b817a] transition hover:text-[#174638] hover:underline"
            >
              Home
            </Link>

            <span className="text-[#b3b7ae]">/</span>

            <Link
              to="/products"
              className="text-[#7b817a] transition hover:text-[#174638] hover:underline"
            >
              Products
            </Link>

            <span className="text-[#b3b7ae]">/</span>

            <span
              aria-current="page"
              className="max-w-full break-words font-medium text-[#19372f]"
            >
              {product.title}
            </span>
          </nav>
        </motion.div>

        {/* Product details */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Product image */}
          <div className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white">
            {imageUrl ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={imageUrl}
                alt={product.title}
                className="aspect-square w-full object-cover sm:aspect-[5/4] lg:aspect-square"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-[#f1eee6]">
                <Package size={64} className="text-[#9ba99b]" />
              </div>
            )}
          </div>

          {/* Product information */}
          <div className="rounded-2xl border border-[#e9e5dc] bg-white p-5 sm:p-8 lg:p-10">
            {/* Category */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64806e]">
              {product.category || "ShopNest Collection"}
            </p>

            {/* Title */}
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#19372f] sm:text-4xl lg:text-[42px]">
              {product.title}
            </h1>

            {/* Rating */}
            {Number(product.averageRating) > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span
                  aria-label={`${product.averageRating} out of 5 stars`}
                  className="tracking-wide text-[#e99a42]"
                >
                  ★★★★★
                </span>

                <span className="font-semibold text-[#19372f]">
                  {Number(product.averageRating).toFixed(1)}
                </span>

                <span className="text-[#8c928a]">
                  ({product.numReviews ?? 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-bold text-[#174b3b]">
                ₹{price.toLocaleString("en-IN")}
              </p>

              <span className="text-xs text-[#8c928a]">
                Inclusive of applicable taxes
              </span>
            </div>

            <div className="my-7 h-px bg-[#eeeae2]" />

            {/* Description */}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-[#19372f]">
                Product Description
              </h2>

              <p className="whitespace-pre-line text-sm leading-7 text-[#69736c]">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Product information */}
            <div className="mt-7 space-y-4 border-t border-[#eeeae2] pt-6 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#7b817a]">Category</span>

                <span className="text-right font-medium capitalize text-[#19372f]">
                  {product.category || "General"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#7b817a]">Availability</span>

                <span
                  className={`font-medium ${
                    isInStock ? "text-[#26714e]" : "text-red-600"
                  }`}
                >
                  {isInStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Quantity selector */}
            {isInStock && (
              <div className="mt-7">
                <label
                  htmlFor="product-quantity"
                  className="mb-3 block text-sm font-semibold text-[#19372f]"
                >
                  Quantity
                </label>

                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#d9e2d9]">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1 || addingToCart}
                      aria-label="Decrease quantity"
                      className="p-3 text-[#174638] transition hover:bg-[#e9eee6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={16} />
                    </button>

                    <input
                      id="product-quantity"
                      type="number"
                      min="1"
                      max={stock}
                      value={quantity}
                      disabled={addingToCart}
                      onChange={(event) => {
                        const value = Number(event.target.value);

                        if (event.target.value === "") {
                          setQuantity("");
                          return;
                        }

                        if (Number.isFinite(value)) {
                          setQuantity(Math.min(stock, Math.max(1, value)));
                        }
                      }}
                      onBlur={() => {
                        setQuantity((current) =>
                          Math.min(stock, Math.max(1, Number(current) || 1))
                        );
                      }}
                      className="w-14 appearance-none bg-transparent text-center text-sm font-semibold text-[#19372f] outline-none"
                    />

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= stock || addingToCart}
                      aria-label="Increase quantity"
                      className="p-3 text-[#174638] transition hover:bg-[#e9eee6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-[#8c928a]">
                    {stock} {stock === 1 ? "item" : "items"} available
                  </p>
                </div>
              </div>
            )}

            {/* Cart error */}
            {cartError && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {cartError}
              </p>
            )}

            {/* Add to cart */}
            <motion.button
              type="button"
              disabled={!isInStock || addingToCart}
              onClick={handleAddToCart}
              whileHover={isInStock && !addingToCart ? { scale: 1.01 } : {}}
              whileTap={isInStock && !addingToCart ? { scale: 0.98 } : {}}
              className={`mt-7 flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 text-sm font-semibold transition ${
                isInStock && !addingToCart
                  ? "bg-[#104534] text-white shadow-sm hover:bg-[#1b5b46] hover:shadow-md"
                  : "cursor-not-allowed bg-[#e8e6df] text-[#999b94]"
              }`}
            >
              <ShoppingCart size={18} />

              {!isInStock
                ? "Out of Stock"
                : addingToCart
                  ? "Adding to Cart..."
                  : `Add ${quantity || 1} to Cart`}
            </motion.button>

            {/* Trust message */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#7b817a]">
              <CheckCircle2 size={15} className="shrink-0 text-[#64806e]" />

              <span>Thoughtfully selected for your everyday lifestyle.</span>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default ProductDetails;