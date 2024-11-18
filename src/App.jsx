import { Routes, Route, useNavigate } from "react-router-dom";
import {
  AddProduct,
  ViewProduct,
  EditProduct,
  ErrorPage,
  Signin,
  Home,
  Signup,
  ResetPassword,
  ForgotPassword,
  ResetLinkSent,
  CartPage,
  MyAccount,
  ShippingAddressForm,
  PaymentSuccess,
  PaymentFailed,
  Contact,
  Shop,
  About,
} from "./components";
import {
  ADD_PRODUCT,
  VIEW_PRODUCT,
  SIGNIN,
  EDIT_PRODUCT,
  SIGNUP,
  MYACCOUNT,
  ABOUT,
  SHOP,
  CONTACT,
  PAYSUCCESS,
  MYCART,
  RESETLINKSENT,
  FORGOT_PASSWORD,
  RESET_TOKEN,
  PAYFAILED,
} from "./paths";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMyProfile } from "./Redux/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmAuthStatus = () => {
    // Implement authentication logic here and return true or false based on authentication status
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      const decoded_accessToken = jwtDecode(accessToken);
      const expirationDate = decoded_accessToken.exp * 1000;
      const currentTime = Date.now();

      // Check if access token is expired
      if (expirationDate >= currentTime) {
        console.log("Access token active!", expirationDate >= new Date());
        dispatch(setMyProfile(decoded_accessToken));
      } else {
        console.log("Access token expired!", expirationDate < new Date());
        navigate(SIGNIN);
      }
    }
  };

  useEffect(() => {
    confirmAuthStatus();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path={ADD_PRODUCT} element={<AddProduct />} />
        <Route path={VIEW_PRODUCT} element={<ViewProduct />} />
        <Route path={EDIT_PRODUCT} element={<EditProduct />} />
        <Route path={SIGNIN} element={<Signin />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={MYACCOUNT} element={<MyAccount />} />
        <Route path={ABOUT} element={<About />} />
        <Route path={SHOP} element={<Shop />} />
        <Route path={CONTACT} element={<Contact />} />
        <Route path={MYCART} element={<CartPage />} />
        <Route path={PAYSUCCESS} element={<PaymentSuccess />} />
        <Route path={PAYFAILED} element={<PaymentFailed />} />
        <Route path={RESETLINKSENT} element={<ResetLinkSent />} />
        <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={RESET_TOKEN} element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
