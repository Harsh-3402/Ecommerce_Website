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

import PageTransition from "./components/PageTransition";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

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

        <Route
          path="/products"
          element={
            <PageTransition>
              <Products />
            </PageTransition>
          }
        />

        <Route
          path="/products/:id"
          element={
            <PageTransition>
              <ProductDetails />
            </PageTransition>
          }
        />

        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          }
        />

        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          }
        />

        <Route
          path="/order"
          element={
            <PageTransition>
              <Order />
            </PageTransition>
          }
        />

        <Route
          path="/payment"
          element={
            <PageTransition>
              <Payment />
            </PageTransition>
          }
        />

        <Route
          path="/ordersuccess"
          element={
            <PageTransition>
              <OrderSuccess />
            </PageTransition>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

export default App; 