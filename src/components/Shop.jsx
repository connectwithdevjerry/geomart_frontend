import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  handleAddToCart,
  handleProductCategories,
} from "../Redux/crudSlice";
import Loading from "./Loading";
import NoProductFound from "./NoProductFound";
import ShopItem from "./ShopItem";

const Shop = () => {
  const [search, setSearch] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productCategories: {
      physical,
      digital,
      bestselling,
      electronics,
      fashion,
      home_and_garden,
      featured,
    },
  } = useSelector((state) => state.crud);

  const [displayLimit, setDisplayLimit] = useState({
    physical: 4,
    digital: 4,
    bestselling: 4,
    electronics: 4,
    fashion: 4,
    home_and_garden: 4,
  });

  const increaseLimitBy = 8;

  useEffect(() => {
    dispatch(getAllProducts(1000));
    dispatch(handleProductCategories(displayLimit));
  }, []);

  useEffect(() => {
    dispatch(handleProductCategories(displayLimit));
  }, [displayLimit]);

  const addToCart = (productId) => {
    dispatch(handleAddToCart(productId));
  };

  const handleSearch = () => {
    navigate(`/viewproduct/${search}`);
  };

  const handleDisplayLimit = (limitType) => {
    setDisplayLimit((prev) => ({
      ...prev,
      [limitType]: prev[limitType] + increaseLimitBy,
    }));
  };

  if (!products?.length) return <NoProductFound />;

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop</h1>

          <div className="flex mb-6">
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
              placeholder="search product"
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

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Categories
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="#electronics"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Electronics
              </a>
              <a
                href="#fashion"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Fashion
              </a>
              <a
                href="#homeandgarden"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Home & Garden
              </a>
              <a
                href="#digital"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Digital
              </a>
              <a
                href="#physical"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Physical
              </a>
            </div>
          </div>

          <div id="featured">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>
          </div>

          <div id="bestselling" className="pt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Best Selling Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestselling.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => handleDisplayLimit("bestselling")}
                className="text-black py-2 px-4 rounded-lg hover:text-white hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                {"Load More >>>"}
              </button>
            </div>
          </div>

          <div id="fashion" className="pt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Fashion
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fashion.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => handleDisplayLimit("fashion")}
                className="text-black py-2 px-4 rounded-lg hover:text-white hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Load More {">>>"}
              </button>
            </div>
          </div>

          <div id="electronics" className="pt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Electronics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {electronics.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => handleDisplayLimit("electronics")}
                className="text-black py-2 px-4 rounded-lg hover:text-white hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Load More {">>>"}
              </button>
            </div>
          </div>

          <div id="homeandgarden" className="pt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Home And Garden
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {home_and_garden.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => handleDisplayLimit("home_and_garden")}
                className="text-black py-2 px-4 rounded-lg hover:text-white hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Load More {">>>"}
              </button>
            </div>
          </div>

          <div id="digital" className="pt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Digital
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {digital.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => handleDisplayLimit("digital")}
                className="text-black py-2 px-4 rounded-lg hover:text-white hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Load More {">>>"}
              </button>
            </div>
          </div>

          <div id="physical" className="pt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Physical
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {physical.map((product, ind) => (
                <ShopItem key={ind} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => handleDisplayLimit("physical")}
                className="text-black py-2 px-4 rounded-lg hover:text-white hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Load More {">>>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
