import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const MyAccount = () => {
  // Fetch user data from API or Redux store
  const myProfile = useSelector((state) => state.user.myProfile);
  const { firstName, lastName, email } = myProfile;

  // console.log(myProfile);
  // console.log(firstName, lastName, email)

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Account</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Name:</span>
                  <span className="text-gray-900">
                    {firstName} {lastName}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Email:</span>
                  <span className="text-gray-900">{email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Phone:</span>
                  <span className="text-gray-900">+1 234 567 890</span>
                </div>
                <a href="#" className="text-blue-500 hover:underline">
                  Edit Profile
                </a>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order History
              </h2>
              <ul className="space-y-4">
                <li className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-800 font-semibold">
                        Order #12345
                      </p>
                      <p className="text-sm text-gray-600">
                        Placed on Oct 20, 2024
                      </p>
                    </div>
                    <div className="text-green-600">Delivered</div>
                  </div>
                  <a href="#" className="text-blue-500 hover:underline text-sm">
                    View Details
                  </a>
                </li>
                <li className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-800 font-semibold">
                        Order #12344
                      </p>
                      <p className="text-sm text-gray-600">
                        Placed on Oct 15, 2024
                      </p>
                    </div>
                    <div className="text-yellow-600">In Transit</div>
                  </div>
                  <a href="#" className="text-blue-500 hover:underline text-sm">
                    View Details
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Addresses
              </h2>
              <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                  <p className="text-gray-800">Home</p>
                  <p className="text-gray-600 text-sm">
                    1234 Elm Street, Springfield, IL 62704
                  </p>
                  <a href="#" className="text-blue-500 hover:underline text-sm">
                    Edit Address
                  </a>
                </div>
                <div className="border p-4 rounded-lg">
                  <p className="text-gray-800">Office</p>
                  <p className="text-gray-600 text-sm">
                    4321 Maple Avenue, Chicago, IL 60616
                  </p>
                  <a href="#" className="text-blue-500 hover:underline text-sm">
                    Edit Address
                  </a>
                </div>
                <a href="#" className="text-blue-500 hover:underline">
                  Add New Address
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Account Settings
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-blue-500 transition"
                >
                  Change Password
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-blue-500 transition"
                >
                  Manage Payment Methods
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-blue-500 transition"
                >
                  Newsletter Preferences
                </a>
              </li>
              <li>
                <a href="#" className="text-red-500 hover:underline transition">
                  Delete Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
