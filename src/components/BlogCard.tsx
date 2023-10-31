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
import InterActions from "./interactionButtons/InterActions";
import { useThemeContext } from "@/context/ThemeContext";
const BlogCard = ({ blog, index }: { blog: postType; index: number }) => {
  const theme = useThemeContext();
  return (
    <motion.div
      initial={{
        opacity: 0,
        background: theme?.cardBg,
        border: `1px solid ${theme?.btnColor}`,
        color: theme?.header,
      }}
      animate={{
        opacity: 1,
        background: theme?.cardBg,
        border: `1px solid ${theme?.btnColor}`,
        color: theme?.header,
      }}
      transition={{ duration: 1, delay: index / 10 + 0.1, type: "tween" }}
      className="w-full  sm:w-[320px] h-fit rounded-lg drop-shadow-2xl bg-gray-600 flex items-start flex-wrap justify-between gap-2 p-2 cursor-pointer hover:-translate-y-2"
    >
      <Link href={`/posts/${blog.hashId}/${blog.slug}`} legacyBehavior>
        <a className="relative w-full aspect-video rounded-t-lg overflow-hidden">
          <Image
            unoptimized
            loader={() => blog.coverImage}
            fill
            src={blog.coverImage}
            alt="blog image"
            loading="lazy"
            placeholder="blur"
            blurDataURL={blog.coverImage}
          />
        </a>
      </Link>
      <Link href={`/posts/${blog.hashId}/${blog.slug}`} legacyBehavior>
        <a className="font-semibold hover:font-bold   line-clamp-1 text-group-header-min       hover:line-clamp-2">
          {blog.title}
        </a>
      </Link>
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
          {blog.author?.name}
        </div>
        {blog.category && (
          <Link legacyBehavior href={"/blogs/" + blog.category.title}>
            <a className="bg-gray-700 py-1 px-2 font-bold rounded-lg ">
              {blog.category.title}
            </a>
          </Link>
        )}
      </div>
      <div className=" w-full   text-paragraph-min flex flex-wrap sm:flex-nowrap items-center justify-between gap-2  py-1">
        <div className="w-fit whitespace-nowrap flex items-center gap-2">
          <p>{blog.readingTime}min to read</p>
          <ClockIcon className="w-[20px] h-[20px] stroke-gray-300" />
        </div>
        <InterActions btnGap={2} blog={blog} iconSize="20" />
      </div>
    </motion.div>
  );
};

export default BlogCard;
