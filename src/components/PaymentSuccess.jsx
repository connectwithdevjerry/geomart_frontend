import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
      <svg
        className="mx-auto h-20 w-20 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2l4-4m0 8.5A7.5 7.5 0 105.5 4a7.5 7.5 0 008.5 16.5z"
        ></path>
      </svg>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Thank you for your purchase!
      </h1>
      <p className="text-gray-600 mb-6">
        We appreciate your business. If you have any questions, feel free to
        reach out to us at
        <a
          href="mailto:support@example.com"
          className="text-blue-500 hover:underline"
        >
          support@example.com
        </a>
        .
      </p>
      <Link
        to={"/"}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
