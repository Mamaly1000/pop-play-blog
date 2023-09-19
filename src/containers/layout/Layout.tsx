import React from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container  ">
      <Header />
      <div className="children-container">{children}</div>
      <Footer />
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
    </div>
  );
};

export default Layout;
