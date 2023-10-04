import Layout from "@/layout/Layout";
import React from "react";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { postType } from "@/types/Post-type";
import PostHeader from "@/components/PostPageComponents/PostHeader";
import InterActions from "@/components/interactionButtons/InterActions";
import SocialMediaComponent from "@/components/socials/SocialMediaComponent";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { useRouter } from "next/router";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import CommentSection from "@/components/comment-section/CommentSection";
import { commentType } from "@/types/comment-type";

const SinglePostpage = ({
  postData,
}: // userData,
{
  // userData: userType;
  postData: postType;
}) => {
  const [copy, setCopy] = useState<boolean>(false);
  const location = useRouter();
  const url = `http://localhost:3000/${location.asPath}`;
  const copyHnadler = () => {
    setCopy(true);
    toast.success("copied successfuly !");
    setTimeout(() => {
      setCopy(false);
    }, 4000);
  };
  return (
    <Layout>
      <div className="py-[25%] sm:py-[20%] md:py-10 flex justify-start flex-wrap items-start gap-5 w-full min-h-[500px]">
        <PostHeader
          header={{
            author: postData.author?.name,
            created_at: new Date(postData.createdAt),
            profession: postData.author?.expertize,
            reading_time: postData.readingTime,
            isBookmarked: postData.isBookmarked,
            blogTitle: postData.title,
          }}
        />
        <div className="bg-gray-300 rounded-lg min-w-full p-5 drop-shadow-2xl flex flex-wrap gap-5 items-center justify-between ">
          <main className="prose prose-headings:capitalize prose-headings:text-gray-700 prose-h1:text-page-header prose-h2:text-section-header-max min-w-full text-gray-600 prose-p:text-paragraph-max prose-p:leading-8 flex flex-col gap-2">
            <div className="w-full p-5 rounded-lg drop-shadow-2xl  rounded-t-lg overflow-hidden   flex items-center justify-center aspect-video relative object-contain mb-5">
              <Image
                src={postData.coverImage}
                alt={postData.title}
                unoptimized
                loader={() => postData.coverImage}
                className=" h-full rounded-lg"
                fill
              />
            </div>
            <h1>{postData.title}</h1>
            <p>{postData.titleBrief}</p>
            <h2>this is the sub header</h2>
            <p>{postData.text}</p>
          </main>
          <InterActions blog={postData} btnGap={5} iconSize="20" />
          <SocialMediaComponent />
          <CopyToClipboard onCopy={copyHnadler} text={url}>
            <button
              className={`flex items-center gap-2 hover:scale-110 active:scale-90 px-3 py-2 rounded-lg bg-gray-700 ${
                copy ? "text-green-500" : "text-gray-100"
              }`}
            >
              copy link{" "}
              <DocumentDuplicateIcon
                className={`${
                  copy ? "stroke-green-500" : "stroke-gray-100"
                } w-[20px] h-[20px]`}
              />
            </button>
          </CopyToClipboard>
        </div>
        {postData.related.length > 0 && (
          <div className="min-w-full bg-gray-300 rounded-lg p-5 drop-shadow-2xl flex flex-col items-start justify-between gap-2">
            <span className="text-section-header-min w-full capitalize font-semibold text-gray-600">
              related posts
            </span>
            <div className="min-w-full flex flex-wrap gap-5 items-start justify-start">
              {postData.related.map((blog, index) => {
                return <BlogCard blog={blog} index={index} key={blog._id} />;
              })}
            </div>
          </div>
        )}
        <CommentSection
          // userData={userData}
          comments={postData.comments as commentType[]}
        />
      </div>
    </Layout>
  );
};

export default SinglePostpage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query, req } = ctx;
  const { data } = await axios.get(
    `http://localhost:5000/api/posts/${query.post_slug}`,
    {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    }
  );

  return {
    props: {
      postData: data.data,
    },
  };
}
