import http from "@/services/httpService";
import { postType } from "@/types/Post-type";
import { toast } from "react-toastify";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { routerPush } from "@/utils/routerPush";
import { useRouter } from "next/router";

const InterActions = ({
  blog,
  iconSize,
  btnGap,
}: {
  blog: postType;
  iconSize: string;
  btnGap: number;
}) => {
  const router = useRouter();
  const [actions, setActions] = useState<{
    bookmark: boolean;
    liked: boolean;
    likeCount: number | null;
  }>({
    bookmark: blog.isBookmarked,
    liked: blog.isLiked,
    likeCount: blog.likesCount,
  });
  const btnGaps = "gap-" + btnGap;
  const iconsize = `w-[${iconSize}px] h-[${iconSize}px]`;
  const likeHandler = async (id: string) => {
    await http
      .put(`/posts/like/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setActions({
          ...actions,
          liked: res.data.liked,
          likeCount: res.data.liked
            ? actions.likeCount
              ? actions.likeCount + 1
              : 1
            : actions.likeCount
            ? actions.likeCount - 1
            : 0,
        });
        routerPush(router);
      })
      .catch((err) => console.log(err));
  };
  const HandleBookmark = async (id: string) => {
    await http
      .put(`/posts/bookmark/${id}`)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message);
        setActions({ ...actions, bookmark: res.data.bookmarked });
        routerPush(router);
      })
      .catch(() => toast.error("falied to save the action"));
  };
  return (
    <div
      className={`max-w-fit flex flex-wrap items-center justify-end ${btnGaps}`}
    >
      <button
        onClick={() => likeHandler(blog._id)}
        className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-green-600 items-center justify-center"
      >
        <HandThumbUpIcon
          className={
            `${actions.liked ? "fill-white bg-white" : " stroke-white"}` +
            iconsize
          }
        />
        {actions.likeCount ? actions.likeCount : 0}
      </button>
      <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-yellow-600 items-center justify-center">
        <ChatBubbleBottomCenterTextIcon
          className={` stroke-white` + iconsize}
        />
        {blog.commentsCount ? blog.commentsCount : 0}
      </button>
      <button
        onClick={() => HandleBookmark(blog._id)}
        className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-blue-600 items-center justify-center"
      >
        <BookmarkIcon
          className={
            `stroke-white ${
              actions.bookmark ? "fill-white bg-white" : "fill-transparent"
            }` + iconsize
          }
        />
      </button>
    </div>
  );
};

export default InterActions;
