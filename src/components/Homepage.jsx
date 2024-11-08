import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "../Redux/userSlice";
import { getAllProducts, handleAddToCart } from "../Redux/crudSlice";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, myProfile } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.crud);
  const location = useLocation();

  console.log({ myProfile });

  useEffect(() => {
    dispatch(getAllProducts({ limit: 1000 }));
  }, []);

  const handleSearch = () => {
    navigate(`/viewproduct/${search}`);
  };

  const addToCart = (values) => {
    if (!isAuth) {
      dispatch(setCurrentPath(location.pathname));
      return navigate("/signin");
    }
    dispatch(handleAddToCart(values));
  };

  const bgcImage =
    "https://images.pexels.com/photos/12582201/pexels-photo-12582201.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";

  return (
    <div className="bg-gray-50">
      <Navbar />
      <section
        className="bg-gray-100"
        style={{
          backgroundImage: `url(${bgcImage})`,
          color: "white",
          height: "70vh",
        }}
      >
        <div className="container mx-auto px-6 py-16 pt-20 text-center">
          <h1 className="text-5xl font-bold text-gray-100 transpare">
            Find the Perfect Outfit
          </h1>
          <p className="mt-4 text-gray-300">
            Explore our exclusive collection of clothing and accessories for all
            occasions.
          </p>
          <div className="flex items-center justify-center mt-10 p-5">
            <div className="rounded-lg bg-gray-200">
              <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="pointer-events-none absolute w-5 fill-gray-500 transition"
                  >
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0 text-black"
                  placeholder="total station"
                  id=""
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  disabled={search ? false : true}
                  onClick={handleSearch}
                  className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          What we sell
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={bgcImage}
              alt="Product 1"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={bgcImage}
              alt="Product 1"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={bgcImage}
              alt="Product 1"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-500 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white">Limited Time Offer</h2>
          <p className="text-blue-200 mt-4">
            Get 20% off on all orders! Use code "SALE20" at checkout.
          </p>
          <a
            to=""
            className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200"
          >
            Shop Now
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 py-6 mt-16">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 YourShop. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
