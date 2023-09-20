import { commentType } from "@/types/comment-type";
import CommentComponent from "./CommentComponent";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { userType } from "@/types/user-type";
import ReplyComment from "./ReplyComment";
import { AnimatePresence } from "framer-motion";

const CommentSection = ({
  //   userData,
  comments,
}: {
  //   userData: userType;
  comments: commentType[];
}) => {
  const [myComment, setMyComment] = useState<{
    name?: string;
    emailId?: string;
    message?: string;
  }>({ emailId: "", message: "", name: "" });
  return (
    <div className="min-w-full  bg-gray-300 rounded-lg p-5 flex flex-col gap-3 items-start justify-start drop-shadow-2xl">
      <span className="text-section-header-min capitalize text-gray-600 font-semibold">
        comment section
      </span>
      <CommentForm
        onsubmit={(e) => {
          e.preventDefault();
        }}
        myComment={myComment}
        setMyComment={setMyComment}
        title={`what is your idea mamaly ?`}
      />
      <div className="min-w-full flex flex-wrap items-start justify-start gap-5">
        {comments
          .filter((comment) => {
            return !comment.responseTo && comment.status === 2;
          })
          .map((comment, index) => {
            return (
              <div className="w-full flex items-start justify-start gap-2 flex-col">
                <AnimatePresence>
                  <CommentComponent
                    comment={comment}
                    index={index}
                    key={comment._id}
                  />
                </AnimatePresence>
                <ReplyComment
                  Comments={comments}
                  parentCommentId={comment._id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
