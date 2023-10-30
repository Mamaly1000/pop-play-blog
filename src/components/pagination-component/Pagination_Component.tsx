import { useThemeContext } from "@/context/ThemeContext";
import { Pagination } from "@mui/material";
import { NextRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Div = styled.div`
  .MuiPagination-ul > li > .Mui-selected {
    background: ${(props: any) => props.theme.cardBg} !important;
    border: 1px solid ${(props: any) => props.theme.btnColor};
    color: inherit !important;
  }
`;

const Pagination_Component = ({
  totalPage,
  router,
  page,
}: {
  totalPage: number | null;
  page: number;
  router: NextRouter;
}) => {
  const theme = useThemeContext();
  return (
    totalPage &&
    totalPage > 0 && (
      <Div
        theme={theme || undefined}
        style={{
          background: theme?.cardBg,
          border: `1px solid ${theme?.btnColor}`,
          color: theme?.header,
        }}
        className="pagination-component min-w-full max-w-fit   p-2 drop-shadow-2xl rounded-lg flex items-center justify-center"
      >
        <Pagination
          count={totalPage || 3}
          shape="rounded"
          defaultPage={1}
          onChange={(_e, page) => {
            router.query.page = page + "";
            router.push(router);
          }}
          page={page || 1}
          style={{ color: "red" }}
        />
      </Div>
    )
  );
};

export default Pagination_Component;
