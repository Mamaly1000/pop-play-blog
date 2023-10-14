import { AppProps } from "next/app";
import "../../styles/tailwind.scss";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import Wrapper from "@/app/store";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchUserAuthentication } from "@/app/Auth/AuthActions";

function MyApp({ Component, pageProps }: AppProps) {
  const { props, store } = Wrapper.useWrappedStore(pageProps);

  useEffect(() => {
    store.dispatch(FetchUserAuthentication("load", "GET", "/user/load"));
  }, []);
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
