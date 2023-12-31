import { commentType } from "@/types/comment-type";
import React from "react";
import CommentComponent from "./CommentComponent";
const ReplyComment = ({
  parentCommentId,
  Comments,
  postID,
}: {
  Comments: commentType[];
  parentCommentId: string;
  postID: string;
}) => {
  return Comments.map((comment, index) => {
    return (
      parentCommentId === comment.responseTo && (
        <div
          key={comment._id}
          className="ms-2  w-auto flex flex-col items-start justify-start gap-2"
        >
          <CommentComponent postID={postID} comment={comment} index={index} />
          <ReplyComment
            postID={postID}
            Comments={Comments}
            parentCommentId={comment._id}
          />
        </div>
      )
    );
  });
};

export default ReplyComment;
