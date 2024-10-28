import { useDispatch, useSelector } from "react-redux";
import { signInValidationSchema } from "../formValidation";
import { useFormik } from "formik";
import { getUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FORGOT_PASSWORD } from "../paths";
import { Link } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const userMessage = useSelector((state) => state.user.userMessage);
  const isAuth = useSelector((state) => state.user.isAuth);
  // const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const { values, touched, errors, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInValidationSchema,
      onSubmit: async (values) => {
        console.log("Form submitted:", values);

        dispatch(getUser(values));

        setTimeout(() => console.log({ isAuth }), 500);

        if (isAuth) {
          navigate("/");
        } else {
          console.log({ userMessage });
          return;
        }
      },
    });

    if (isAuth) {
      navigate("/");
    }

  return (
    <section>
      <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center" />
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account? Create a free account
          </p>
          {userMessage && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4 w-full max-w-md"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{userMessage}</p>
            </div>
          )}
          {/* {renderError(touched, errors)} */}
          <form className="mt-8" method="POST" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Link
                    className="text-sm font-semibold text-black hover:underline"
                    title=""
                    to={FORGOT_PASSWORD}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {touched.password && errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  type="submit"
                >
                  Get started
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              type="button"
            >
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-rose-500"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
