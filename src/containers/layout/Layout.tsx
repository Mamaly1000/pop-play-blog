import React, { useEffect } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { ToastContainer } from "react-toastify";
import { useThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeContext();
  useEffect(() => {
    if (theme?.setLocalTheme) {
      theme?.setLocalTheme({
        cardBg: theme.cardBg || "",
        header: theme.header || "",
        mainBg: theme.mainBg || "",
        plainText: theme.plainText || "",
        btnColor: theme.btnColor || "",
      });
    }
  }, []);
  return (
    <motion.div
      animate={{ background: theme?.mainBg, color: theme?.header }}
      initial={{ background: theme?.mainBg, color: theme?.header }}
      className="layout-container"
    >
      <Header />
      <motion.div className="children-container p-2 py-[25%] sm:py-[20%] md:py-10">{children}</motion.div>
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
    </motion.div>
  );
};

export default Layout;
