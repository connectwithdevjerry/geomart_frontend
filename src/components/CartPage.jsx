import { useDispatch, useSelector } from "react-redux";
import { getMyCartItems } from "../Redux/crudSlice";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import Navbar from "./Navbar";
import ShippingAddressForm from "./ShippingAddressForm";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.crud.orderDetails);

  console.log({ cartItems });

  useEffect(() => {
    console.log("useEffect from cart page");
    dispatch(getMyCartItems());
  }, []);

  if (!cartItems?.length) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Your Shopping Cart
          </h1>

          {/* <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-3/4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Your cart is empty.
                </h2>
                <p className="text-gray-600">
                  Add items to your cart by browsing our products.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-3/4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id._id}
                  item={{ ...item.id, quantityOrdered: item.quantityOrdered }}
                />
              ))}
            </div>
          </div>

          <OrderSummary />
        </div>
      </div>
      <ShippingAddressForm />
    </>
  );
};

export default CartPage;
