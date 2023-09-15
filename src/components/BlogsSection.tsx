import React from "react";
import BlogCard from "./BlogCard";

const BlogsSection = () => {
  return (
    <div className=" col-span-12 md:col-span-10 md:row-span-2 h-fit  w-full flex items-start justify-start gap-5 flex-wrap p-1 capitalize">
      {[
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 1",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 2",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 3",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 4",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 5",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 6",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 7",
          reading_duration: "3.5min",
        },
        {
          img: "https://wallpapercave.com/wp/wp4238016.png",
          name: "a simple blog 8",
          reading_duration: "3.5min",
        },
      ].map((blog) => {
        return <BlogCard blog={blog} key={blog.name} />;
      })}
    </div>
  );
};

export default BlogsSection;
