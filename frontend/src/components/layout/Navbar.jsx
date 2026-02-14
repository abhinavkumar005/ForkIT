import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-white/80 backdrop-blur-sm shadow-md py-4" // Always visible on home page
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="relative">
                <div
                  className={`absolute -inset-2 rounded-full blur-xl opacity-75 transition-all duration-300 ${
                    isScrolled
                      ? "bg-gradient-to-r from-purple-500 to-teal-500"
                      : "bg-gradient-to-r from-purple-300 to-teal-300"
                  }`}
                />
                <div
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center ${
                    isScrolled
                      ? "bg-gradient-to-br from-purple-600 to-teal-500"
                      : "bg-white"
                  }`}
                >
                  <span
                    className={`text-2xl font-bold ${
                      isScrolled ? "text-white" : "text-purple-600"
                    }`}
                  >
                    🍲
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-2xl font-bold ${
                    isScrolled ? "text-gray-900" : "text-gray-900"
                  }`}
                >
                  Flavor<span className="text-purple-600">Boost</span>
                </span>
                <span
                  className={`text-xs font-medium ${
                    isScrolled ? "text-purple-600" : "text-purple-200"
                  }`}
                >
                  2.0
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  label={link.name}
                  isScrolled={isScrolled}
                  isActive={location.pathname === link.path}
                />
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "bg-purple-50 text-purple-600 hover:bg-purple-100"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                title="Search recipes"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.button>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`p-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    isScrolled
                      ? "bg-purple-50 text-purple-600 hover:bg-purple-100"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span
                    className={`hidden md:block font-medium ${
                      isScrolled ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Abhishek
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50"
                    >
                      <ProfileMenuItem
                        icon="👤"
                        label="My Profile"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate("/profile");
                        }}
                      />
                      <ProfileMenuItem
                        icon="❤️"
                        label="Favorites"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate("/favorites");
                        }}
                      />
                      <ProfileMenuItem
                        icon="⚙️"
                        label="Settings"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate("/settings");
                        }}
                      />
                      <div className="border-t border-gray-100 my-1" />
                      <ProfileMenuItem
                        icon="🚪"
                        label="Logout"
                        onClick={() => setIsProfileOpen(false)}
                        className="text-red-600 hover:bg-red-50"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Get Started Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                    : "bg-white text-purple-600 hover:bg-purple-50"
                }`}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${
                  isScrolled ? "bg-purple-50 text-purple-600" : "text-white"
                }`}
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <MobileNavLink
                      key={link.path}
                      to={link.path}
                      label={link.name}
                      index={index}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">A</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Abhishek</p>
                        <p className="text-sm text-gray-500">
                          abhishek@example.com
                        </p>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/favorites");
                      }}
                      className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                    >
                      <span className="text-2xl">❤️</span>
                      <span className="text-sm font-medium text-gray-700">
                        Favorites
                      </span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/settings");
                      }}
                      className="flex flex-col items-center gap-2 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
                    >
                      <span className="text-2xl">⚙️</span>
                      <span className="text-sm font-medium text-gray-700">
                        Settings
                      </span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/");
                    }}
                    className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// Reusable Navigation Link Component
function NavLink({ to, label, isScrolled, isActive }) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={to}
        className={`relative px-2 py-2 font-medium transition-all duration-300 ${
          isScrolled
            ? isActive
              ? "text-purple-600"
              : "text-gray-700 hover:text-purple-600"
            : isActive
              ? "text-white"
              : "text-purple-100 hover:text-white"
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="activeLink"
            className={`absolute bottom-0 left-0 right-0 h-0.5 ${
              isScrolled ? "bg-purple-600" : "bg-white"
            }`}
            transition={{ type: "spring", bounce: 0.25, duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

// Reusable Mobile Navigation Link Component
function MobileNavLink({ to, label, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link
        to={to}
        onClick={onClick}
        className="block w-full px-4 py-3 text-gray-700 font-medium hover:bg-purple-50 rounded-lg transition-colors"
      >
        {label}
      </Link>
    </motion.div>
  );
}

// Reusable Profile Menu Item Component
function ProfileMenuItem({ icon, label, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}
