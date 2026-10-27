import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import {
  Leaf,
  Truck,
  Search,
  UserRound,
  Heart,
  Package,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  ShieldCheck,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import api from "../../services/api";
import { logoutUser } from "../../services/authService";

function Header() {
  const navigate = useNavigate();

  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/products?category=Electronics" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Check authentication using the backend
  const checkAuthentication = async () => {
    try {
      const response = await api.get("/auth/me");

      setIsAuthenticated(Boolean(response.data.user));
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  // Search products
  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword")?.toString().trim();

    if (keyword) {
      navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  // Open logout confirmation modal
  const openLogoutModal = () => {
    setLogoutError("");
    setShowLogoutModal(true);
  };

  // Close modal without logging out
  const closeLogoutModal = () => {
    if (isLoggingOut) return;

    setShowLogoutModal(false);
    setLogoutError("");
  };

  // Logout through the backend
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutUser();

      setIsAuthenticated(false);
      setShowLogoutModal(false);

      navigate("/login", { replace: true });
    } catch (error) {
      setLogoutError(
        error.response?.data?.message ||
          "We couldn't log you out. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Announcement Bar */}
        <div className="flex h-8 items-center justify-center bg-[#103c30] px-4 text-white">
          <div className="flex w-full max-w-[1440px] items-center justify-between">
            <button
              type="button"
              aria-label="Previous announcement"
              className="hidden text-white/70 transition hover:text-white sm:block"
            >
              <ChevronLeft size={15} />
            </button>

            <p className="flex items-center gap-2 text-[11px] font-medium tracking-wide">
              <Truck size={14} />
              Free shipping on orders over ₹2999
            </p>

            <button
              type="button"
              aria-label="Next announcement"
              className="hidden text-white/70 transition hover:text-white sm:block"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-[#e8e4dc] bg-[#fcfaf6]">
          <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 lg:px-12">
            {/* Logo */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2 text-[#153a30]"
              aria-label="ShopNest home"
            >
              <Leaf
                size={31}
                strokeWidth={2}
                className="fill-[#153a30] text-[#153a30]"
              />

              <span className="text-xl font-bold tracking-[0.13em] sm:text-2xl">
                SHOPNEST
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap py-2 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "text-[#123d31] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#174b3c]"
                        : "text-[#454b47] hover:text-[#174b3c]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Search and Actions */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              {/* Desktop Search */}
              <form
                onSubmit={handleSearch}
                className="hidden w-44 items-center gap-2 rounded-full bg-[#f1f0ed] px-4 py-2.5 md:flex xl:w-52"
              >
                <Search
                  size={17}
                  className="shrink-0 text-[#68716c]"
                />

                <input
                  type="search"
                  name="keyword"
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full min-w-0 bg-transparent text-xs text-[#243d33] outline-none placeholder:text-[#818681]"
                />
              </form>

              {/* Account */}
              <NavLink
                to="/login"
                aria-label="Account"
                title="Account"
                className={({ isActive }) =>
                  `relative flex items-center py-2 transition-colors ${
                    isActive
                      ? "text-[#103c30] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#174b3c]"
                      : "text-[#193c32] hover:text-[#648b69]"
                  }`
                }
              >
                <UserRound size={21} strokeWidth={2} />
              </NavLink>

              {/* Wishlist */}
              <button
                type="button"
                aria-label="Wishlist"
                title="Wishlist"
                onClick={() => setIsWishlistActive((prev) => !prev)}
                className={`relative flex items-center py-2 transition-colors ${
                  isWishlistActive
                    ? "text-[#103c30] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#174b3c]"
                    : "text-[#193c32] hover:text-[#648b69]"
                }`}
              >
                <Heart
                  size={21}
                  strokeWidth={isWishlistActive ? 2.5 : 1.8}
                  fill={isWishlistActive ? "currentColor" : "none"}
                />
              </button>

              {/* My Orders and Logout: authenticated users only */}
              {!isCheckingAuth && isAuthenticated && (
                <>
                  {/* Order History */}
                  <NavLink
                    to="/my-orders"
                    aria-label="My Orders"
                    title="My Orders"
                    className={({ isActive }) =>
                      `relative flex items-center py-2 transition-colors ${
                        isActive
                          ? "text-[#103c30] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#174b3c]"
                          : "text-[#193c32] hover:text-[#648b69]"
                      }`
                    }
                  >
                    <Package size={21} strokeWidth={2} />
                  </NavLink>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={openLogoutModal}
                    aria-label="Log out"
                    title="Log out"
                    className="flex items-center py-2 text-[#193c32] transition-colors hover:text-red-700"
                  >
                    <LogOut size={21} strokeWidth={1.9} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex gap-6 overflow-x-auto border-t border-[#efebe4] px-5 py-3 lg:hidden">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `shrink-0 text-xs font-medium transition ${
                    isActive
                      ? "text-[#174b3c] underline decoration-2 underline-offset-4"
                      : "text-[#37483f] hover:text-[#176044]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile My Orders and Logout */}
            {!isCheckingAuth && isAuthenticated && (
              <>
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-1.5 text-xs font-medium transition ${
                      isActive
                        ? "text-[#174b3c] underline decoration-2 underline-offset-4"
                        : "text-[#37483f] hover:text-[#176044]"
                    }`
                  }
                >
                  <Package size={14} />
                  My Orders
                </NavLink>

                <button
                  type="button"
                  onClick={openLogoutModal}
                  className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#37483f] transition hover:text-red-700"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Search */}
          <div className="px-5 pb-3 md:hidden">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 rounded-full bg-[#f1f0ed] px-4 py-3"
            >
              <Search size={17} className="text-[#68716c]" />

              <input
                type="search"
                name="keyword"
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#818681]"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102b22]/55 p-4 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeLogoutModal();
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-title"
              aria-describedby="logout-description"
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#e9e5dc] bg-[#fcfaf6] p-7 shadow-2xl sm:p-9"
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLogoutModal}
                disabled={isLoggingOut}
                aria-label="Close confirmation"
                className="absolute right-5 top-5 rounded-full p-2 text-[#68716c] transition hover:bg-[#efede6] hover:text-[#174638] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={19} />
              </button>

              {/* Logout Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8efe7] text-[#174638]">
                <LogOut size={29} strokeWidth={1.8} />
              </div>

              {/* Modal Heading */}
              <div className="mt-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#65816f]">
                  ShopNest Account
                </p>

                <h2
                  id="logout-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-[#173c30] sm:text-3xl"
                >
                  Leaving so soon?
                </h2>

                <p
                  id="logout-description"
                  className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#69736c]"
                >
                  Are you sure you want to log out? You can always come back
                  and continue shopping whenever you're ready.
                </p>
              </div>

              {/* Security Information */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#e5e8df] bg-white p-4 text-left">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#47785a]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#244436]">
                    Your account stays yours
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#788078]">
                    We'll end your current browser session by clearing your
                    authentication cookie.
                  </p>
                </div>
              </div>

              {/* Logout Error */}
              {logoutError && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left text-sm text-red-700"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{logoutError}</p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                {/* Cancel Logout */}
                <button
                  type="button"
                  onClick={closeLogoutModal}
                  disabled={isLoggingOut}
                  className="flex-1 rounded-xl border border-[#dcded5] bg-white px-4 py-3 text-sm font-semibold text-[#40564a] transition hover:border-[#174638] hover:bg-[#f5f5ef] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  No, Stay Logged In
                </button>

                {/* Confirm Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#174638] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#205b49] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoggingOut ? (
                    <>
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                      Logging Out...
                    </>
                  ) : (
                    <>
                      Yes, Log Out
                      <LogOut size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Footer */}
              <p className="mt-5 text-center text-[11px] text-[#899087]">
                Thank you for shopping with ShopNest.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;