import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { motion } from "motion/react";
import { ArrowRight, ShoppingCart } from "lucide-react";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });

      navigate("/cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  const imageUrl =
    typeof product.image === "string" ? product.image : product.image?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-lg border border-[#e9e5dc] bg-[#f1e9dd] shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={
            typeof product.image === "string"
              ? product.image
              : product.image?.url
          }
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="p-4">
        {/* Category */}
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#858a82]">
          {product.category}
        </p>

        {/* Product Title */}
        <h2
          title={product.title}
          className="truncate text-sm font-semibold text-[#19372f] sm:text-base"
        >
          {product.title}
        </h2>

        {/* Rating */}
        {product.averageRating > 0 && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="tracking-wide text-[#e99a42]">★★★★★</span>

            <span className="text-[#69746d]">
              {Number(product.averageRating).toFixed(1)}
            </span>

            <span className="text-[#9a9d96]">
              ({product.numReviews ?? 0} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <p className="mt-2 text-lg font-bold text-[#174b3b]">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* Stock Quantity */}
        <p
          className={`mt-1 text-xs ${
            product.stock > 0 ? "text-[#26714e]" : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `● In Stock (${product.stock})`
            : "● Out of Stock"}
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-[#d9e2d9] bg-white px-3 py-2.5 text-xs font-semibold text-[#174638] transition hover:bg-[#f5f7f2]"
          >
            View Details
            <ArrowRight size={14} />
          </motion.button>

          <motion.button
            whileHover={product.stock > 0 ? { scale: 1.01 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold transition ${
              product.stock > 0
                ? "bg-[#104534] text-white hover:bg-[#1b5b46]"
                : "cursor-not-allowed bg-[#e8e6df] text-[#999b94]"
            }`}
          >
            <ShoppingCart size={15} />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
