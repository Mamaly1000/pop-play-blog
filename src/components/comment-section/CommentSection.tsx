import { commentType } from "@/types/comment-type";
import CommentComponent from "./CommentComponent";
import { useState } from "react";
import CommentForm from "./CommentForm";
import ReplyComment from "./ReplyComment";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "src/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";

const CommentSection = ({
  postID,
  comments,
}: {
  postID: string;
  comments: commentType[];
}) => {
  const theme = useThemeContext();
  const userAuth = useAuth();
  return (
    <motion.div
      animate={{
        background: theme?.cardBg,
        border: `1px solid ${theme?.btnColor}`,
      }}
      className="min-w-full    rounded-lg p-5 flex flex-col gap-3 items-start justify-start drop-shadow-2xl"
    >
      <span
        style={{ color: theme?.header }}
        className="text-section-header-min capitalize   font-semibold"
      >
        comment section
      </span>
      <CommentForm
        responseTo={null}
        postID={postID}
        title={`what is your idea ?`}
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
                    postID={postID}
                  />
                </AnimatePresence>
                <ReplyComment
                  Comments={comments}
                  parentCommentId={comment._id}
                  postID={postID}
                />
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default CommentSection;
