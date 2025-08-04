import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLogOut,
  FiUser,
  FiEdit2,
  FiLock,
  FiMenu,
  FiX,
  FiBell,
  FiMessageSquare,
  FiHome,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import { getProfile } from "../../../api/apiHandler";
import { getImageUrl } from "../../../utils/getImageUrl";
import { useAuth } from "../../../hooks/auth/useAuth";
import { toast } from "react-toastify";

export default function ProfessionalNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getProfile,
    staleTime: 0,
  });

  const user = data?.user;
  const imageUrl = getImageUrl(user?.profilePic);
  const userInitial = user?.name?.[0]?.toUpperCase();

  // Working navigation links with minimal required routes
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome className="mr-2" />,
      visible: true,
    },
    {
      name: "Network",
      path: "/network",
      icon: <FiUsers className="mr-2" />,
      visible: true,
      onClick: () => {
        // Example: You can add custom behavior
        if (!user) {
          navigate("/login");
          return;
        }
        navigate("/network");
      },
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: <FiBriefcase className="mr-2" />,
      visible: true,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <FiMessageSquare className="mr-2" />,
      visible: !!user, // Only show if logged in
      onClick: () => {
        if (!user) {
          navigate("/login");
          return;
        }
        navigate("/messages");
      },
    },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);

    const comingSoonPages = ["/jobs", "/network", "/messages"];
    if (comingSoonPages.includes(link.path)) {
      toast.info(`${link.name} feature coming soon! 🚧`);
      return;
    }

    if (link.onClick) {
      link.onClick();
    } else {
      navigate(link.path);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-[#0A66C2] rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-[#0A66C2] hidden md:block">
                <span className="text-gray-800">ro</span>Connect
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-2">
              {navLinks
                .filter((link) => link.visible)
                .map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-[#E6F0F8] transition-colors"
                  >
                    {link.icon}
                    {link.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toast.info("Notifications feature coming soon! 🚧");
                  }}
                  className="p-1 text-gray-700 hover:text-[#0A66C2] relative"
                >
                  <FiBell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile dropdown */}
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    {imageUrl ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={imageUrl}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#0A66C2]"
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-8 h-8 bg-[#0A66C2] text-white rounded-full flex items-center justify-center text-sm font-semibold"
                      >
                        {userInitial}
                      </motion.div>
                    )}
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      >
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              navigate(`/profile/${user._id}`);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FiUser className="mr-2" /> View Profile
                          </button>
                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              navigate("/edit-profile");
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FiEdit2 className="mr-2" /> Edit Profile
                          </button>
                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              navigate("/change-password");
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FiLock className="mr-2" /> Change Password
                          </button>
                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              logout.mutate();
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <FiLogOut className="mr-2" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {!user && (
              <div className="hidden md:flex space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-[#0A66C2] hover:bg-[#E6F0F8] rounded-full text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-[#0A66C2] text-white hover:bg-[#004182] rounded-full text-sm font-medium transition-colors"
                >
                  Join Now
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#0A66C2] hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navLinks
                .filter((link) => link.visible)
                .map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link)}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
                  >
                    {link.icon}
                    {link.name}
                  </button>
                ))}

              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-3 text-[#0A66C2] hover:bg-[#E6F0F8]"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/register");
                    }}
                    className="block w-full text-left px-4 py-3 bg-[#0A66C2] text-white hover:bg-[#004182] mx-4 rounded text-center"
                  >
                    Join Now
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(`/profile/${user._id}`);
                    }}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    <FiUser className="mr-2" /> Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout.mutate();
                    }}
                    className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-gray-50"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
