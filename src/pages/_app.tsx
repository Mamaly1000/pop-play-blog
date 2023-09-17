import { AppProps } from "next/app";
import "../../styles/tailwind.scss";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence
      onExitComplete={() => window.scrollTo(0, 0)}
      mode="wait"
      initial={false}
    >
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
