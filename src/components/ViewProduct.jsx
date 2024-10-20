import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { searchAsync, handleAddToCart } from "../Redux/crudSlice";
import Loading from "./Loading";
import Navbar from "./Navbar";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const {
    products,
    loading: isLoading,
    inappLoading,
    prevPath,
  } = useSelector((state) => ({
    products: state.crud.products,
    loading: state.crud.loading,
    inappLoading: state.crud.inappLoading,
    prevPath: state.crud.prevPath,
  }));

  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();

  const blankProductImg =
    "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp";

  const initialFilter = {
    searchWord: params.search,
    price_range: "all_prices",
    category: "all_categories",
    limit: 20,
    grade: "best_selling",
  };

  const [filter, setFilter] = useState(initialFilter);

  const timeOut = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let cancel = false;
    const handleWait = async () => {
      await timeOut(500);
      if (!cancel) {
        dispatch(searchAsync(filter));
      }
    };
    handleWait();

    return () => {
      cancel = true;
    };
  }, [filter]);

  const addToCart = (productId) => {
    dispatch(handleAddToCart(productId));
  };

  if (isLoading) return <Loading />;

  // if no products are found
  if (!products?.length)
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-xl font-bold text-gray-900">
            No products found.
          </div>
          <div>
            <button
              onClick={() => {
                navigate(prevPath);
                return window.location.reload();
              }}
            >
              GO BACK
            </button>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <header className="bg-white shadow">
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={filter.searchWord}
                onChange={(e) =>
                  setFilter({ ...filter, searchWord: e.target.value })
                }
              />
            </div>
            <h2 className="font-bold py-6 text-gray-800">
              Search Results for '{filter.searchWord}'
            </h2>
          </div> */}
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Filter by</h2>
            <div className="flex flex-wrap gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={filter.category}
                  onChange={(e) =>
                    setFilter({ ...filter, category: e.target.value })
                  }
                  name="category"
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={"all_categories"}>All Categories</option>
                  <option value={"electronics"}>Electronics</option>
                  <option value={"fashion"}>Fashion</option>
                  <option value={"home_and_garden"}>Home & Garden</option>
                  <option value={"physical"}>Physical</option>
                  <option value={"digital"}>Digital</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price Range
                </label>
                <select
                  id="price"
                  value={filter.price_range}
                  onChange={(e) =>
                    setFilter({ ...filter, price_range: e.target.value })
                  }
                  name="price_range"
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={"all_prices"}>All</option>
                  <option value={"0_50"}>$0 - $50</option>
                  <option value={"50_100"}>$50 - $100</option>
                  <option value={"100_200"}>$100 - $200</option>
                  <option value={">200"}>Above $200</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sort by
                </label>
                <select
                  id="sort"
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filter.grade}
                  onChange={(e) =>
                    setFilter({ ...filter, grade: e.target.value })
                  }
                >
                  <option value={"best_selling"}>Best Selling</option>
                  <option value={"low_to_high"}>Price: Low to High</option>
                  <option value={"high_to_low"}>Price: High to Low</option>
                </select>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={product.productImage}
                  alt="Product 3"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {product.description?.slice(0, 100)}
                  </p>
                  <div className="mt-4">
                    <span className="text-gray-900 font-bold">
                      ${product.productPrice}
                    </span>
                  </div>
                  <button
                    className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
                    onClick={() => addToCart(product._id)}
                    disabled={inappLoading}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </section>
        </main>
        <select
          id="category"
          value={filter.limit}
          onChange={(e) => setFilter({ ...filter, limit: e.target.value })}
          name="limit"
          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={70}>70</option>
          <option value={100}>100</option>
        </select>
      </div>
    </>
  );
};

export default ViewProduct;
