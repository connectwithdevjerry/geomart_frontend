import { useDispatch } from "react-redux";
import { handleAddToCart } from "../Redux/crudSlice";

const ShopItem = ({ product }) => {
  const { productName, _id, productPrice, productImage } = product;

  const dispatch = useDispatch();

  const addToCart = (productId) => {
    dispatch(handleAddToCart(productId));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
      <p className="text-gray-600 mt-1">${productPrice}</p>
      <button
        onClick={() => addToCart(_id)}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ShopItem;
