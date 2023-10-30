import React from "react";
import BlogCard from "./BlogCard";
import { AnimatePresence } from "framer-motion";
import { postType } from "@/types/Post-type"; 
import { useRouter } from "next/router";
import Pagination_Component from "./pagination-component/Pagination_Component";
const BlogsSection = ({
  blogs,
  paginationData,
}: {
  blogs: postType[];
  paginationData: {
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    page: number | null;
    pagingCounter: number | null;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}) => {
  const router = useRouter();
  return (
    <div className=" col-span-12 md:col-span-9 md:row-span-2 h-fit  w-full flex items-start justify-start gap-5 flex-wrap p-1 capitalize">
      {blogs.map((blog, index) => {
        return (
          <AnimatePresence>
            <BlogCard blog={blog} index={index} key={blog._id} />
          </AnimatePresence>
        );
      })}
      <Pagination_Component
        page={paginationData.page || 1}
        router={router}
        totalPage={paginationData.totalPages}
      />
    </div>
  );
};

export default BlogsSection;
