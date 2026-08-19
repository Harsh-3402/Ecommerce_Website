import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { motion } from "motion/react";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.4,
      }}
      className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800"
    >
      <motion.div className="overflow-hidden bg-gray-800" whileHover="hover">
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover"
          variants={{
            hover: {
              scale: 1.06,
            },
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        />
      </motion.div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-white mb-3">{product.title}</h2>

        <p className="text-green-400 text-xl font-semibold mb-2">
          ₹{product.price}
        </p>

        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Category:</span> {product.category}
        </p>

        <p
          className={`font-semibold mb-5 ${
            product.stock > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out Of Stock"}
        </p>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold cursor-pointer"
          >
            View Details
          </motion.button>

          <motion.button
            whileHover={product.stock > 0 ? { scale: 1.04 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              product.stock > 0
                ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`} 
            
          >
            Add To Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
