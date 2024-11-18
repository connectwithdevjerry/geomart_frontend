import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { shippingValidationSchema } from "../formValidation";
import { addShippingDetails, getPaymentStatus } from "../Redux/crudSlice";
import Paystack from "@paystack/inline-js";

const ShippingAddressForm = () => {
  const { orderId, access_code } = useSelector(
    (state) => state.crud.orderDetails
  );
  const { loading } = useSelector((state) => state.crud.loading);
  const { productsError } = useSelector((state) => state.crud.productsError);

  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        orderId,
        fullName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Australia",
      },
      validationSchema: shippingValidationSchema,

      onSubmit: (values) => {
        dispatch(addShippingDetails(values));

        setTimeout(console.log("waiting..."), 300);

        console.log({ access_code, loading });

        if (!loading && !productsError) {
          const popup = new Paystack();
          popup.resumeTransaction(access_code);
          
          dispatch(getPaymentStatus(orderId))
        } else {
          alert(productsError);
        }
      },
    });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Shipping Address
        </h2>
        <div>
          {touched.orderId && errors.orderId && <span>{errors.orderId}</span>}
        </div>
        <form action="*" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              value={values.fullName}
              onBlur={handleBlur}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div>
              {touched.fullName && errors.fullName && (
                <span>{errors.fullName}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div>
              {touched.email && errors.email && <span>{errors.email}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address-line-1"
              className="block text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div>
              {touched.street && errors.street && <span>{errors.street}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleChange}
              value={values.city}
              onBlur={handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div>
              {touched.city && errors.city && <span>{errors.city}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State/Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              onChange={handleChange}
              value={values.state}
              onBlur={handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div>
              {touched.state && errors.state && <span>{errors.state}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              Zip code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              onChange={handleChange}
              value={values.zipCode}
              onBlur={handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div>
              {touched.zipCode && errors.zipCode && (
                <span>{errors.zipCode}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              onChange={handleChange}
              value={values.country}
              onBlur={handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={"USA"}>United States</option>
              <option value={"Canada"}>Canada</option>
              <option value={"UK"}>United Kingdom</option>
              <option value={"Australia"}>Australia</option>
              {/* <option>Other</option> */}
            </select>
            <div>
              {touched.country && errors.country && (
                <span>{errors.country}</span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
