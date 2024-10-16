import { useDispatch, useSelector } from "react-redux";
import { handleCheckOut } from "../Redux/crudSlice";

const OrderSummary = () => {
  const { subtotal, total, shipping, tax } = useSelector(
    (state) => state.crud.orderDetails
  );
  const dispatch = useDispatch();
  return (
    <div className="md:w-1/4">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-800">${shipping}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-800">${tax}</span>
        </div>

        <div className="border-t pt-4 flex justify-between">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-gray-800">${total}</span>
        </div>

        <button
          onClick={() => dispatch(handleCheckOut())}
          className="w-full bg-blue-500 text-white font-bold mt-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
