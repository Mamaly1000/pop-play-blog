import { useThemeContext } from "@/context/ThemeContext";
import http from "@/services/httpService";
import {
  BookmarkIcon,
  CalendarDaysIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { AxiosResponse } from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../inputs/Button";
export type headertype = {
  author: string;
  profession: string;
  created_at: Date;
  reading_time: string;
  isBookmarked: boolean;
  blogTitle: string;
  bio: string;
  id: string;
};
const PostHeader = ({ header }: { header: headertype }) => {
  const theme = useThemeContext();
  const [bookmark, setBookmark] = useState(header.isBookmarked);
  const HandleBookmark = async (id: string) => {
    await http
      .put(`/posts/bookmark/${id}`)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message);
        setBookmark(res.data.bookmarked);
      })
      .catch(() => toast.error("falied to save the action"));
  };
  return (
    <div className="w-full flex flex-col sm:flex-row items-start justify-center sm:justify-between gap-5">
      <div
        style={{
          background: theme?.cardBg,
          border: `1px solid ${theme?.btnColor}`,
        }}
        className="   drop-shadow-2xl p-5 rounded-lg w-full sm:w-fit flex flex-col sm:flex-row gap-3 items-center sm:items-start justify-center sm:justify-start text-center sm:text-start sm:max-w-[70%]"
      >
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
        <div className="w-fit   flex items-center justify-center gap-1 flex-col">
          <div className="w-full flex-wrap justify-center items-center min-w-[100px] flex  sm:justify-start gap-2">
            <span className="font-bold text-section-header-min capitalize   ">
              {header.author}
            </span>
            <span
              style={{ border: `1px solid ${theme?.btnColor}` }}
              className="px-3 py-2 rounded-lg border-[1px]     capitalize text-paragraph-max"
            >
              {header.profession}
            </span>
          </div>
          <div
            style={{ borderColor: theme?.btnColor }}
            className="w-full flex-wrap justify-center items-center min-w-[100px] flex sm:items-start   font-semibold sm:justify-start gap-2 border-b-[1px]   pb-2 mb-2"
          >
            {header.bio}
          </div>
          <div className="w-full flex-wrap justify-center items-center [&>span]:font-semibold    min-w-[100px] flex sm:items-start  sm:justify-start gap-2">
            <span>
              {moment(header.created_at).format("dddd YYYY/MM/DD HH:MM")}
            </span>
            <CalendarDaysIcon className="w-[20px] h-[20px]  " />
            <span>{header.reading_time}min for reading</span>
          </div>
        </div>
      </div>
      <div
        style={{
          background: theme?.cardBg,
          border: `1px solid ${theme?.btnColor}`,
        }}
        className="  w-full sm:w-fit p-5 rounded-lg  drop-shadow-2xl flex flex-wrap items-start justify-start gap-5"
      >
        <Button
          className="text-paragraph-min   capitalize active:scale-90 hover:scale-110 font-bold flex items-center gap-2 bg-gray-800 p-3 rounded-lg"
          onclick={() => HandleBookmark(header.id)}
          disabled={false}
          text={header.isBookmarked ? "Bookmarked" : "bookmark"}
        >
          <BookmarkIcon
            className={`stroke-gray-100 ${
              bookmark ? "fill-gray-100" : "fill-transparent"
            } w-[20px] h-[20px] `}
          />
        </Button>
        <Button
          onclick={() =>
            navigator.share({
              text: `share ${header.blogTitle} blog with your friends`,
              title: header.blogTitle,
              url: location.href,
            })
          }
          className="text-paragraph-max   capitalize active:scale-90 hover:scale-110 font-bold flex items-center gap-2 bg-gray-800 p-3 rounded-lg"
          disabled={false}
          text=""
        >
          <LinkIcon className="stroke-gray-100 w-[20px] h-[20px]" />
        </Button>
      </div>
    </div>
  );
};

export default PostHeader;
