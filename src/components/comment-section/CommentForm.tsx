import { useThemeContext } from "@/context/ThemeContext";
import http from "@/services/httpService";
import { routerPush } from "@/utils/routerPush";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
const CommentForm = ({
  title,
  postID,
  responseTo,
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  postID: string;
  responseTo: string | null;
}) => {
  const theme = useThemeContext();
  const router = useRouter();
  const [myComment, setMyComment] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        http
          .post(`/post-comment/save-comment`, {
            content: myComment,
            postId: postID,
            responseTo,
          })
          .then((res) => {
            toast.success(res.data.message);
            setMyComment("");
            routerPush(router);
            setOpen && setOpen(false);
          })
          .catch((err) => toast.error(err.response.data.message));
      }}
      style={{
        background: theme?.cardBg,
        border: `1px solid ${theme?.btnColor}`,
        color: theme?.header,
      }}
      className="w-full flex flex-wrap items-start justify-start gap-3 rounded-lg   p-5 [&>textarea]:min-w-full  [&>input]:px-3 [&>input]:py-2 [&>input]:rounded-lg [&>input]:capitalize [&>input:hover]:scale-110 [&>input]:cursor-pointer [&>input]:font-semibold drop-shadow-2xl"
    >
      {title.length > 0 && (
        <span className="capitalize animate-pulse">{!!title ? title : ""}</span>
      )}
      <textarea
        value={myComment}
        onChange={(e) => setMyComment(e.target.value)}
        placeholder="write your comment here ...."
        className="bg-gray-600 p-3 rounded-lg capitalize text-paragraph-max font-semibold max-h-[300px] min-h-[100px]"
      />
      <input type="submit" value="submit" className="bg-green-700" />
      <input
        type="reset"
        value="reset"
        onClick={() => setMyComment("")}
        className="bg-red-700"
      />
    </form>
  );
};

export default CommentForm;
