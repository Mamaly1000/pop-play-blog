import { postType } from "@/types/Post-type";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const InterActions = ({
  blog,
  iconSize,
  btnGap,
}: {
  blog: postType;
  iconSize: string;
  btnGap: number;
}) => {
  const btnGaps = "gap-" + btnGap;
  const iconsize = `w-[${iconSize}px] h-[${iconSize}px]`;
  return (
    <div
      className={`max-w-fit flex flex-wrap items-center justify-end ${btnGaps}`}
    >
      <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-green-600 items-center justify-center">
        <HandThumbUpIcon className={` stroke-white` + iconsize} />
        {blog.likesCount ? blog.likesCount : 0}
      </button>
      <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-red-600 items-center justify-center">
        <ChatBubbleBottomCenterTextIcon
          className={` stroke-white` + iconsize}
        />
        {blog.commentsCount ? blog.commentsCount : 0}
      </button>
      <button className="w-fit flex gap-1 p-1 rounded-lg cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-60 bg-blue-600 items-center justify-center">
        <BookmarkIcon
          className={
            `stroke-white ${
              blog.isBookmarked ? "fill-white" : "fill-transparent"
            }` + iconsize
          }
        />
      </button>
    </div>
  );
};

export default InterActions;
