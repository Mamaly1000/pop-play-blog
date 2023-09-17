import React from "react";
import BlogCard from "./BlogCard";
import { AnimatePresence } from "framer-motion";
const BlogsSection = () => {
  return (
    <div className=" col-span-12 md:col-span-9 md:row-span-2 h-fit  w-full flex items-start justify-start gap-5 flex-wrap p-1 capitalize">
      {[
        {
          img: "https://pagepro.co/blog/wp-content/uploads/2020/03/framercover-1024x576.png",
          name: "a simple blog 1",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallup.net/wp-content/uploads/2016/03/09/53604-movies-The_Matrix.jpg",
          name: "a simple blog 2",
          reading_duration: "3.5min",
        },
        {
          img: "https://cdn.sanity.io/images/oneb1r22/production/3fe92b61658041629610f800479284a04eaf7b41-1400x928.png?auto=format&q=98&fit=max&w=1440",
          name: "a simple blog 3",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 4",
          reading_duration: "3.5min",
        },
        {
          img: "https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2021/02/framer-motion.jpg",
          name: "a simple blog 5",
          reading_duration: "3.5min",
        },
        {
          img: "https://tse2.mm.bing.net/th?id=OIP.PJ87QhnDB4G5r6GynPSEVwAAAA&pid=Api&P=0&h=220",
          name: "a simple blog 6",
          reading_duration: "3.5min",
        },
        {
          img: "https://tailwindcss.ru/_next/static/media/pocket-preview.0125ad4d.png",
          name: "a simple blog 7",
          reading_duration: "3.5min",
        },
        {
          img: "https://ded9.com/wp-content/uploads/2021/06/next.png",
          name: "a simple blog 8",
          reading_duration: "3.5min",
        },
      ].map((blog, index) => {
        return (
          <AnimatePresence>
            <BlogCard blog={blog} index={index} key={blog.name} />
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default BlogsSection;
