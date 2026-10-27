import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";

import PageTransition from "./components/PageTransition";
import MainLayout from "./components/layout/MainLayout";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

function App() {
  const location = useLocation();

  // Common layout containing the existing Header and Footer
  const withLayout = (page) => <MainLayout>{page}</MainLayout>;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={
            <PageTransition>
              {withLayout(<Home />)}
            </PageTransition>
          }
        />

        {/* Authentication */}
        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignUp />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <PageTransition>
              {withLayout(<Products />)}
            </PageTransition>
          }
        />

        <Route
          path="/products/:id"
          element={
            <PageTransition>
              {withLayout(<ProductDetails />)}
            </PageTransition>
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <PageTransition>
              {withLayout(<Cart />)}
            </PageTransition>
          }
        />

        {/* About Us */}
        <Route
          path="/about"
          element={
            <PageTransition>
              {withLayout(<About />)}
            </PageTransition>
          }
        />

        {/* Contact Us */}
        <Route
          path="/contact"
          element={
            <PageTransition>
              {withLayout(<Contact />)}
            </PageTransition>
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <PageTransition>
              {withLayout(<Checkout />)}
            </PageTransition>
          }
        />

        {/* Order Review */}
        <Route
          path="/order"
          element={
            <PageTransition>
              {withLayout(<Order />)}
            </PageTransition>
          }
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={
            <PageTransition>
              {withLayout(<Payment />)}
            </PageTransition>
          }
        />

        {/* Order Success */}
        <Route
          path="/ordersuccess"
          element={
            <PageTransition>
              {withLayout(<OrderSuccess />)}
            </PageTransition>
          }
        />

        {/* My Orders */}
        <Route
          path="/my-orders"
          element={
            <PageTransition>
              {withLayout(<MyOrders />)}
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;