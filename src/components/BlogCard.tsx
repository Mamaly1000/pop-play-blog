import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { postType } from "@/types/Post-type";
import Link from "next/link";
const BlogCard = ({ blog, index }: { blog: postType; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: index / 10 + 0.1, type: "tween" }}
      className="w-full  sm:w-[320px] h-fit rounded-lg drop-shadow-2xl bg-gray-600 flex items-start flex-wrap justify-between gap-2 p-2 cursor-pointer hover:-translate-y-2"
    >
      <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
        <Image
          unoptimized
          loader={() => blog.coverImage}
          fill
          src={blog.coverImage}
          alt="blog image"
        />
      </div>
      <h3 className="font-bold text-gray-200 line-clamp-1 text-group-header-min">
        {blog.title}
      </h3>
      <div className="w-full flex items-center justify-between flex-wrap">
        <div className="w-fit flex items-center justify-start gap-2 text-paragraph-min">
          <Image
            className="ring-gray-900 w-[30px] object-contain rounded-full"
            width={30}
            height={30}
            loader={() =>
              "https://avatars.githubusercontent.com/u/105161078?v=4"
            }
            src="https://avatars.githubusercontent.com/u/105161078?v=4"
            unoptimized
            alt="author image"
          />
          {blog.author.name}
        </div>
        {blog.category && (
          <Link legacyBehavior href={"/blogs/" + blog.category.title}>
            <a className="bg-gray-700 py-1 px-2 font-bold rounded-lg ">
              {blog.category.title}
            </a>
          </Link>
        )}
      </div>
      <div className=" w-full text-gray-300 text-paragraph-min flex flex-wrap sm:flex-nowrap items-center justify-between gap-2  py-1">
        <div className="w-fit whitespace-nowrap flex items-center gap-2">
          <p>{blog.readingTime}min to read</p>
          <ClockIcon className="w-[20px] h-[20px] stroke-gray-300" />
        </div>
        <div className=" w-fit flex flex-wrap items-center justify-end gap-2">
          <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-green-600 items-center justify-center">
            <HandThumbUpIcon className="stroke-white w-[15px] h-[15px]" />
            {blog.likesCount ? blog.likesCount : 0}
          </button>{" "}
          <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-red-600 items-center justify-center">
            <ChatBubbleBottomCenterTextIcon className="stroke-white w-[15px] h-[15px]" />
            {blog.commentsCount ? blog.commentsCount : 0}
          </button>{" "}
          <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-blue-600 items-center justify-center">
            <BookmarkIcon
              className={`stroke-white ${
                blog.isBookmarked ? "fill-white" : "fill-transparent"
              } w-[15px] h-[15px]`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
