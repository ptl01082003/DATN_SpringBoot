import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "./components/Layout/Layout";
import { KEY_STORAGE, PATH_ROUTER } from "./constants";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Oders from "./pages/Order/Order";
import Payment from "./pages/payment/Payment";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import OderDetails from "./pages/UserFeature/Components/OderDetails";
import PaymentInfo from "./pages/UserFeature/Components/PaymentInfo";
import ProfileLogout from "./pages/UserFeature/Components/ProfileLogout";
import UserInfo from "./pages/UserFeature/Components/UserInfo";
import UserFeature from "./pages/UserFeature/UserFeature";
import { io } from "socket.io-client";
import Supporter from "./pages/UserFeature/Components/Supporter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changelstOnlineUsers } from "./redux/slices/usersSlice";

export const socket = io.connect("http://localhost:6500", {
  auth: {
    token: localStorage.getItem(KEY_STORAGE.TOKEN),
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("changelstOnlineUsers", (data) => {
        dispatch(changelstOnlineUsers(data));
    });
  }, []);
  
  return (
    <div className="font-bodyFont">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router basename="/">
        <Routes>
          <Route path={PATH_ROUTER.SIGN_UP} element={<SignUp />} />
          <Route path={PATH_ROUTER.SIGN_IN} element={<SignIn />} />
          <Route path="/*" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="users/*" element={<UserFeature />}>
              <Route path="" element={<UserInfo />} />
              <Route path="payment" element={<PaymentInfo />} />
              <Route path="orders" element={<OderDetails />} />
              <Route path="supports" element={<Supporter />} />
              <Route path="logout" element={<ProfileLogout />} />
            </Route>
            <Route path="shop" element={<Shop />} />
            <Route path="payment" element={<PaymentStatus />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="journal" element={<Journal />} />
            <Route path="category/:category" element={<Offer />} />
            <Route path="product/:code" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="create-orders" element={<Oders />} />
            <Route path="paymentgateway" element={<Payment />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
