import { NextRouter } from "next/router";

export const routerPush = (router: NextRouter) => {
  router.push(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    { scroll: false }
  );
};
