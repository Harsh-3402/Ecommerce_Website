import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { getProductById } from "../services/productService";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProduct() {
    setLoading(true);
    setError("");

    try {
      const response = await getProductById(id);
      setProduct(response.data.product);
    } catch (error) {
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

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

  // =============================
  // Loading
  // =============================

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );

  // =============================
  // Error
  // =============================

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-950 flex justify-center items-center text-red-500 text-xl"
      >
        {error}
      </motion.div>
    );

  // =============================
  // Product Not Found
  // =============================

  if (!product)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-950 flex justify-center items-center text-gray-300 text-xl"
      >
        Product Not Found
      </motion.div>
    );

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-6 py-10">

      {/* Main Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="max-w-6xl w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden grid md:grid-cols-2 gap-10 p-8"
      >

        {/* ============================= */}
        {/* Product Image */}
        {/* ============================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="flex items-center justify-center"
        >

          <motion.img
            src={product.image}
            alt={product.title}
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              duration: 0.4,
            }}
            className="w-full max-h-[450px] object-contain bg-gray-800 rounded-lg"
          />

        </motion.div>

        {/* ============================= */}
        {/* Product Information */}
        {/* ============================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="flex flex-col justify-center"
        >

          {/* Product Title */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.25,
            }}
            className="text-4xl font-bold text-white mb-6"
          >
            {product.title}
          </motion.h1>

          {/* Price */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.3,
            }}
            className="text-green-400 text-3xl font-bold mb-5"
          >
            ₹{product.price}
          </motion.p>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.35,
            }}
            className="text-gray-300 leading-7 mb-6"
          >
            {product.description}
          </motion.p>

          {/* Product Information */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
            }}
            className="space-y-3 text-gray-300 text-lg"
          >

            <p>
              <span className="font-semibold text-white">
                Category:
              </span>{" "}
              {product.category}
            </p>

            <p>
              <span className="font-semibold text-white">
                Stock:
              </span>{" "}
              {product.stock}
            </p>

            <p
              className={`font-semibold ${
                product.stock > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? "Available"
                : "Out Of Stock"}
            </p>

          </motion.div>

          {/* Add To Cart */}

          <motion.button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            whileHover={
              product.stock > 0
                ? {
                    scale: 1.02,
                  }
                : {}
            }
            whileTap={
              product.stock > 0
                ? {
                    scale: 0.97,
                  }
                : {}
            }
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.5,
            }}
            className={`mt-8 w-full py-3 rounded-xl text-lg font-semibold transition ${
              product.stock > 0
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.stock > 0
              ? "Add To Cart"
              : "Out Of Stock"}
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
}

export default ProductDetails;