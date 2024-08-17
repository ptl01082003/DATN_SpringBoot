import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { KEY_STORAGE } from "../../constants";
import { fetchGetLstCarts } from "../../redux/thunks/cartThunk";
import { fetchGetUserInfo } from "../../redux/thunks/userThunk";
import Footer from "../home/Footer/Footer";
import Header from "../home/Header/Header";

export default function Layout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(KEY_STORAGE.TOKEN);
    if (token) {
      dispatch(fetchGetUserInfo());
      dispatch(fetchGetLstCarts());
    }
  }, []);
  
  return (
    <>
      <Header />
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
