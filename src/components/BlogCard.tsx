import Image from "next/image";
import React from "react";

const BlogCard = ({
  blog,
}: {
  blog: {
    name: string;
    img: string;
    reading_duration: string;
  };
}) => {
  return (
    <div className="w-[200px] h-fit rounded-lg drop-shadow-2xl bg-gray-600 flex items-start flex-col justify-between gap-2 p-2 cursor-pointer hover:-translate-y-2">
      <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
        <Image unoptimized loader={() => blog.img} fill src={blog.img} alt="blog image" />
      </div>
      <h3 className="font-bold text-gray-200">{blog.name}</h3>
      <p className="text-gray-300">{blog.reading_duration} to read</p>
    </div>
  );
};

export default BlogCard;
