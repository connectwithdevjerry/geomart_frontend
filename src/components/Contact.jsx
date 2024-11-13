import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
// import { SMTPClient } from "emailjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { createTicket } from "../Redux/crudSlice";
import { contactValidationSchema } from "../formValidation";

const Contact = () => {
  const myStore = useSelector((state) => state.crud.myStoreDetails);

  const dispatch = useDispatch();

  const initialValues = {
    message: "",
    name: "",
    email: "",
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      contactValidationSchema,
      onSubmit: (values, { resetForm }) => {
        dispatch(createTicket(values));
        resetForm();
      },
    });

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-600 text-xs mt-2">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-600 text-xs mt-2">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-600 text-xs mt-2">
                      {errors.message}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Get in touch
              </h2>
              <p className="text-gray-600 mb-4">
                Have any questions? We'd love to hear from you. Reach out to us,
                and we'll respond as soon as we can.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 12V9m-6 3v10m18 0V9"
                    ></path>
                  </svg>
                  <span className="text-gray-700">{myStore.email}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12h.01M8 12h.01m-.02 8h16.02A2.986 2.986 0 0024 21.021V8.979A2.986 2.986 0 0021.979 6H6.021A2.986 2.986 0 003 8.979v12.042A2.986 2.986 0 006.021 24H8z"
                    ></path>
                  </svg>
                  <span className="text-gray-700">{myStore.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19l7-7 4 4M14 7h7v7"
                    ></path>
                  </svg>
                  <span className="text-gray-700">{myStore.address}</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Contact;
