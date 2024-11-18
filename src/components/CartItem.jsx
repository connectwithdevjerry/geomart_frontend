import { useDispatch, useSelector } from "react-redux";
import { incrementDecrement, handleRemoveFromCart } from "../Redux/crudSlice";
import { useEffect, useState } from "react";

const CartItem = (item) => {
  const dispatch = useDispatch();

  const {
    _id: productId,
    productName,
    productPrice,
    quantity,
    productImage,
    quantityOrdered,
  } = item.item;

  const [newOrderValue, setNewOrderValue] = useState(quantityOrdered);
  const [hasMounted, setHasMounted] = useState(false);
  const { orderId } = useSelector((state) => ({
    orderId: state.crud.orderDetails.orderId,
  }));

  const timeOut = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let cancel = false;

    if (!hasMounted) {
      return; // Skip effect on initial load
    }

    console.log("this is useeffect cartitem");

    const handleWait = async () => {
      await timeOut(500);
      if (!cancel && orderId) {
        dispatch(incrementDecrement({ newOrderValue, orderId, productId }));
      }
    };

    handleWait();

    return () => {
      cancel = true;
    };
  }, [newOrderValue]);

  const handleNewOrderValue = async (val) => {
    setHasMounted(true);
    setNewOrderValue(val);
  };

  const removeFromCart = (values) => {
    // dispatch(handleRemove(values.productId));
    dispatch(handleRemoveFromCart(values));
  };

  return (
    <div className="flex justify-between items-center mb-6 border-b pb-4">
      <div className="flex items-center space-x-4 w-80">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src={productImage}
          alt="Product"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{productName}</h2>
          <p className="text-gray-600">Color: Black</p>
        </div>
      </div>
      <div className="w-14">
        <span className="text-lg font-bold text-gray-800">${productPrice}</span>
        <div className="flex space-x-2 mt-2">
          <button
            // onClick={() => setNewOrderValue(newOrderValue - 1)}
            onClick={() => handleNewOrderValue(newOrderValue - 1)}
            disabled={newOrderValue <= 1 ? true : false}
            className="bg-gray-200 text-gray-600 px-2 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-2">{newOrderValue}</span>
          <button
            // onClick={() => setNewOrderValue(newOrderValue + 1)}
            onClick={() => handleNewOrderValue(newOrderValue + 1)}
            disabled={newOrderValue >= quantity ? true : false}
            className="bg-gray-200 text-gray-600 px-2 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
      <div className="w-16">
        <button
          onClick={() => removeFromCart({ orderId, productId })}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
