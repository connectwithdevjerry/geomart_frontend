import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.user);
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">GeoMART </Link>
          </div>
          <nav className="flex space-x-4">
            <Link to="/shop" className="text-gray-800 hover:text-gray-600">
              Shop
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-gray-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600">
              Contact
            </Link>
            {isAuth ? (
              <>
                <Link
                  to="/account"
                  className="text-gray-800 hover:text-gray-600"
                >
                  Account
                </Link>
                <Link
                  to="/mycart"
                  className="text-gray-800 hover:text-gray-600"
                >
                  Cart
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-800 hover:text-gray-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-800 hover:text-gray-600"
                >
                  Sign Up
                </Link>
              </>
            )}
            {isAuth && (
              <div className="relative">
                <button className="focus:outline-none">
                  <svg
                    className="w-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 00-9.33-5A1 1 0 009 4v.73A6 6 0 003 11v3c0 .571-.195 1.11-.552 1.553L1 17h5m4 0v1a3 3 0 006 0v-1m-6 0h6"
                    ></path>
                  </svg>
                  <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
