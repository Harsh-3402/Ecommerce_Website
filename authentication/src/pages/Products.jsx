import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await getProducts(page);

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );

  if (products.length === 0)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center text-gray-300 text-xl">
        No Products Available
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-white mb-10"
      >
        Our Products
      </motion.h1>

      {/* Product Grid */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: products.length * 0.12,
        }}
        className="flex justify-center items-center gap-6 mt-10"
      >
        <motion.button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          whileHover={page !== 1 ? { scale: 1.04 } : {}}
          whileTap={page !== 1 ? { scale: 0.96 } : {}}
          transition={{ duration: 0.15 }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            page === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          ← Previous
        </motion.button>

        <p className="text-white font-semibold text-lg">
          Page {page} of {totalPages}
        </p>

        <motion.button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          whileHover={page !== totalPages ? { scale: 1.04 } : {}}
          whileTap={page !== totalPages ? { scale: 0.96 } : {}}
          transition={{ duration: 0.15 }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            page === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Next →
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Products;
