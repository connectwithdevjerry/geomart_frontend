import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <Link
      to="/"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-150 ease-in-out"
    >
      <i>Back to Home</i>
    </Link>
  );
};

export default BackToHome;
