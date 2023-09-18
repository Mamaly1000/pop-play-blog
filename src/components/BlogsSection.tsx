import React from "react";
import BlogCard from "./BlogCard";
import { AnimatePresence } from "framer-motion";
import { postType } from "@/types/Post-type";
const BlogsSection = ({ blogs }: { blogs: postType[] }) => {
  return (
    <div className=" col-span-12 md:col-span-9 md:row-span-2 h-fit  w-full flex items-start justify-start gap-5 flex-wrap p-1 capitalize">
      {blogs.map((blog, index) => {
        return (
          <AnimatePresence>
            <BlogCard blog={blog} index={index} key={blog._id} />
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default BlogsSection;
