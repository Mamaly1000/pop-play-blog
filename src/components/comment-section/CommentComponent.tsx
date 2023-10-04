import { commentType } from "@/types/comment-type";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineReply } from "react-icons/hi";
import CommentForm from "./CommentForm";
import { LuReply } from "react-icons/lu";
const CommentComponent = ({
  comment,
  index,
}: {
  comment: commentType;
  index: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [myComment, setMyComment] = useState<{
    name?: string;
    emailId?: string;
    message?: string;
  }>({ emailId: "", message: "", name: "" });
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1, delay: index / 10 + 0.1 }}
      className="bg-gray-800 p-4 rounded-lg drop-shadow-2xl w-full h-fit overflow-hidden"
    >
      <div className="w-fit flex items-start justify-start gap-3 flex-wrap">
        {comment.responseTo && (
          <LuReply
            width={10}
            height={10}
            stroke="#fff"
            className="rotate-180"
          />
        )}
        <Image
          alt="sender image"
          width={50}
          height={50}
          loader={() => "https://avatars.githubusercontent.com/u/105161078?v=4"}
          src="https://avatars.githubusercontent.com/u/105161078?v=4"
          unoptimized
          className="rounded-full ring-gray-400 ring-[1px]"
        />
        <div className="w-fit text-paragraph-min text-start flex items-start justify-start gap-3 flex-col capitalize text-gray-300">
          <span>{comment.writer?.name}</span>
          <span>
            {moment(comment.createdAt).format("dddd YYYY/MM/DD HH:MM")}
          </span>
        </div>
        <p className="min-w-full text-paragraph-min font-semibold capitalize">
          {comment.content}
        </p>
        <button
          onClick={() => {
            if (open) {
              setOpen(false);
              setMyComment({ emailId: "", message: "", name: "" });
            } else {
              setOpen(true);
            }
          }}
          className={`flex items-center gap-2 w-fit px-3 py-2 rounded-lg border-[1px] drop-shadow-2xl hover:scale-110 active:scale-90 capitalize float-right font-semibold ${
            !open
              ? "bg-green-700 border-transparent "
              : "border-gray-300 bg-transparent text-gray-300"
          }`}
        >
          {open ? (
            "anyway"
          ) : (
            <>
              reply to <HiOutlineReply />
            </>
          )}
        </button>
        <AnimatePresence>
          {open && (
            <CommentForm
              myComment={myComment}
              onsubmit={(e) => {
                e.preventDefault();
              }}
              setMyComment={setMyComment}
              title=""
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommentComponent;
