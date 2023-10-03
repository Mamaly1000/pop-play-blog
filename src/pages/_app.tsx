import { AppProps } from "next/app";
import "../../styles/tailwind.scss";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "src/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AnimatePresence
        onExitComplete={() => window.scrollTo(0, 0)}
        mode="wait"
        initial={false}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}

export default MyApp;
