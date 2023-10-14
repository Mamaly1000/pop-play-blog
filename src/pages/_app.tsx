import { AppProps } from "next/app";
import "../../styles/tailwind.scss";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import Wrapper from "@/app/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const { props, store } = Wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <AnimatePresence
        onExitComplete={() => window.scrollTo(0, 0)}
        mode="wait"
        initial={false}
      >
        <Component {...props} />
      </AnimatePresence>
    </Provider>
  );
}

export default Wrapper.withRedux(MyApp);
