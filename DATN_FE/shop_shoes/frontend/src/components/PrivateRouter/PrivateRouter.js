import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";

export default function PrivateRouter() {

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
