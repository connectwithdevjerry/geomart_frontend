import { signupValidationSchema } from "../formValidation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUser, handleGoogleAuth } from "../Redux/userSlice";

const Signup = () => {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  };

  const userMessage = useSelector((state) => state.user.userMessage);

  const dispatch = useDispatch();

  const renderError = (touched, errors) =>
    (touched?.email && errors?.email && (
      <span className="val-error">{errors.email}</span>
    )) ||
    (touched?.password && errors?.password && (
      <span className="val-error">{errors.password}</span>
    )) ||
    (touched?.firstName && errors?.firstName && (
      <span className="val-error">{errors.firstName}</span>
    )) ||
    (touched?.lastName && errors?.lastName && (
      <span className="val-error">{errors.lastName}</span>
    )) ||
    (touched?.username && errors?.username && (
      <span className="val-error">{errors.username}</span>
    ));

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      signupValidationSchema,
      onSubmit: (values) => {
        // console.log({ values });
        dispatch(createUser(values));
      },
    });

  return (
    <section>
      <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up as new user
          </h2>
          {userMessage && <span className="val-error">{userMessage}</span>}
          {renderError(touched, errors)}
          <form
            className="mt-8"
            method="POST"
            action="#"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-base font-medium text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  value={values.lastName}
                  onBlur={handleBlur}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
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
                    onBlur={handleBlur}
                    value={values.email}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
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
              onClick={() => dispatch(handleGoogleAuth())}
            >
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

export default Signup;
