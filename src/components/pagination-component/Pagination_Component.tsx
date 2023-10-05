import { Pagination } from "@mui/material";
import { NextRouter } from "next/router";
import React from "react";

const Pagination_Component = ({
  totalPage,
  router,
  page,
}: {
  totalPage: number | null;
  page: number;
  router: NextRouter;
}) => {
  return (
    totalPage &&
    totalPage > 0 && (
      <div className="pagination-component min-w-full max-w-fit bg-gray-600 p-2 drop-shadow-2xl rounded-lg flex items-center justify-center">
        <Pagination
          count={totalPage || 3}
          shape="rounded"
          defaultPage={1}
          onChange={(e, page) => {
            router.query.page = page + "";
            router.push(router);
          }}
          page={page || 1}
        />
      </div>
    )
  );
};

export default Pagination_Component;
