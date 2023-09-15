import React from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container  ">
      <Header />
      <div className="children-container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
