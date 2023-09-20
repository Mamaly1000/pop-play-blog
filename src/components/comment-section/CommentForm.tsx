import React, { Dispatch, SetStateAction } from "react";
const CommentForm = ({
  myComment,
  setMyComment,
  onsubmit,
  title,
}: {
  title: string;
  myComment: {
    name?: string | undefined;
    emailId?: string | undefined;
    message?: string | undefined;
  };
  onsubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setMyComment: Dispatch<
    SetStateAction<{
      name?: string | undefined;
      emailId?: string | undefined;
      message?: string | undefined;
    }>
  >;
}) => {
  return (
    <form
      onSubmit={onsubmit}
      className="w-full flex flex-wrap items-start justify-start gap-3 rounded-lg bg-gray-800 p-5 [&>textarea]:min-w-full  [&>input]:px-3 [&>input]:py-2 [&>input]:rounded-lg [&>input]:capitalize [&>input:hover]:scale-110 [&>input]:cursor-pointer [&>input]:font-semibold drop-shadow-2xl"
    >
      {title.length > 0 && (
        <span className="capitalize animate-pulse">{title}</span>
      )}
      <textarea
        value={myComment.message}
        onChange={(e) =>
          setMyComment({ ...myComment, message: e.target.value })
        }
        placeholder="write your comment here ...."
        className="bg-gray-600 p-3 rounded-lg capitalize text-paragraph-max font-semibold max-h-[300px] min-h-[100px]"
      />
      <input type="submit" value="submit" className="bg-green-700" />
      <input
        type="reset"
        value="reset"
        onClick={() => setMyComment({ emailId: "", message: "", name: "" })}
        className="bg-red-700"
      />
    </form>
  );
};

export default CommentForm;
