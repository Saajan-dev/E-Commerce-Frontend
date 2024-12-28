import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { navItems } from "../../utils/constants";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { cookie_user_data, siteLogo } from "../../config";
import Subnavbar from "./Subnavbar";
import Footer from "./Footer";
import ChatBot from "./ChatBots";
import { deleteCookie } from "../../utils/helpers";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative">
      <nav className="bg-gray-100 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img className="h-8 w-auto" src={siteLogo} alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {[...navItems]?.map((item) => (
                    <button
                      type="button"
                      key={item?.id}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        location.pathname === item.navLink
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-700 hover:text-white text-black"
                      }`}
                      onClick={() => navigate(item?.navLink)}
                    >
                      {item?.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute z-5o inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`relative rounded-full p-1  hover:text-red-600 ${
                    location.pathname === "/home-page/wishlists"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                  onClick={() => navigate("/home-page/wishlists")}
                >
                  <FaHeart className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-600 "
                  onClick={() => navigate("/home-page/addtocart")}
                >
                  <IoCartOutline className="h-6 w-6" />
                </button>
              </div>
              <div className="relative ml-3">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>

                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <button
                      type="button"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      onClick={() => (
                        navigate("/home-page/order-history"),
                        setProfileMenuOpen(false)
                      )}
                    >
                      Order History
                    </button>
                    <button
                      type="button"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      onClick={() => (
                        deleteCookie(cookie_user_data),
                        navigate("/"),
                        setProfileMenuOpen(false)
                      )}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {[...navItems]?.map((item) => (
                <button
                  type="button"
                  key={item?.id}
                  className={`block w-full rounded-md px-3 py-2 text-start font-medium text-white ${
                    location.pathname === item.navLink
                      ? "bg-gray-900 text-white"
                      : "hover:bg-gray-700 text-black"
                  }`}
                  onClick={() => navigate(item?.navLink)}
                >
                  {item?.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="sticky top-[4rem] z-40">
        <Subnavbar />
      </div>

      <Outlet />

      <Footer />

      <ChatBot />
    </div>
  );
};

export default Navbar;
