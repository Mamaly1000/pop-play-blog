import {
  BookmarkIcon,
  CalendarDaysIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import Image from "next/image";
import React from "react";
export type headertype = {
  author: string;
  profession: string;
  created_at: Date;
  reading_time: string;
  isBookmarked: boolean;
  blogTitle: string;
};
const PostHeader = ({ header }: { header: headertype }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start justify-center sm:justify-between gap-5">
      <div className="bg-gray-300 drop-shadow-2xl p-5 rounded-lg w-full sm:w-fit flex flex-col sm:flex-row gap-3 items-center sm:items-start justify-center sm:justify-start ">
        <div className="aspect-video relative w-[100px] object-contain">
          <Image
            alt={header.author + " profile pic"}
            className="ring-gray-900 w-full object-contain rounded-full"
            width={100}
            height={100}
            loader={() =>
              "https://avatars.githubusercontent.com/u/105161078?v=4"
            }
            src="https://avatars.githubusercontent.com/u/105161078?v=4"
            unoptimized
            sizes="30px"
          />
        </div>
        <div className="w-fit flex items-center justify-center gap-1 flex-col">
          <div className="w-full flex-wrap justify-center items-center min-w-[100px] flex  sm:justify-start gap-2">
            <span className="font-bold text-section-header-min capitalize text-gray-700 ">
              {header.author}
            </span>
            <span className="px-3 py-2 rounded-lg border-[1px] border-gray-800 text-gray-800 capitalize text-paragraph-max">
              {header.profession}
            </span>
          </div>
          <div className="w-full flex-wrap justify-center items-center min-w-[100px] flex sm:items-start text-gray-600 font-semibold sm:justify-start gap-2">
            {header.profession}
          </div>
          <div className="w-full flex-wrap justify-center items-center [&>span]:font-semibold text-gray-600  min-w-[100px] flex sm:items-start  sm:justify-start gap-2">
            <span>
              {moment(header.created_at).format("dddd YYYY/MM/DD HH:MM")}
            </span>
            <CalendarDaysIcon className="w-[20px] h-[20px] stroke-gray-600" />
            <span>{header.reading_time}min for reading</span>
          </div>
        </div>
      </div>
      <div className="w-fit p-5 rounded-lg bg-gray-300 drop-shadow-2xl flex flex-wrap items-start justify-start gap-5">
        <button className="text-paragraph-min text-gray-100 capitalize active:scale-90 hover:scale-110 font-bold flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
          {header.isBookmarked ? "Bookmarked" : "bookmark"}
          <BookmarkIcon
            className={`stroke-gray-100 ${
              header.isBookmarked ? "fill-gray-100" : "fill-transparent"
            } w-[20px] h-[20px] `}
          />
        </button>
        <button
          onClick={() =>
            navigator.share({
              text: `share ${header.blogTitle} blog with your friends`,
              title: header.blogTitle,
              url: location.href,
            })
          }
          className="text-paragraph-max text-gray-100 capitalize active:scale-90 hover:scale-110 font-bold flex items-center gap-2 bg-gray-800 p-3 rounded-lg"
        >
          <LinkIcon className="stroke-gray-100 w-[20px] h-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
