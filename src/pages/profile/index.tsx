import { selectAuth } from "@/app/Auth/AuthReducer";
import Layout from "@/layout/Layout";
import Image from "next/image";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/inputs/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Wrapper from "@/app/store";
import { FetchUserAuthentication } from "@/app/Auth/AuthActions";
import http from "@/services/httpService";
import { GetServerSidePropsResult } from "next";
const profile = () => {
  const theme = useThemeContext();
  const router = useRouter();
  const userData = useSelector(selectAuth);
  return (
    <Layout>
      <motion.div
        animate={{
          background: theme?.cardBg,
          color: theme?.header,
          borderColor: theme?.btnColor,
        }}
        className=" border-[1px] font-bold capitalize rounded-lg min-w-full p-5 drop-shadow-2xl flex flex-wrap gap-5 items-center justify-start "
      >
        <Image
          className="min-h-[200px] max-h-[200px] min-w-[200px] max-w-[200px] object-contain rounded-full ring-1 ring-gray-800 "
          src={userData.user?.profilePicURL || ""}
          width="200"
          height="200"
          loader={() => userData.user?.profilePicURL || ""}
          alt="profile pic"
        />
        <div className="flex flex-col items-start justify-start gap-3 max-w-fit">
          <div className="flex items-center justify-start gap-2 ">
            {userData.user?.name}
            <span
              style={{ borderColor: theme?.btnColor, color: theme?.btnColor }}
              className="px-3 py-2 rounded-lg border-[1px]   "
            >
              {userData.user?.expertise}
            </span>
          </div>
          <p
            style={{ color: theme?.plainText }}
            className=" text-[.8rem] text-start w-full max-w-[300px]"
          >
            {userData.user?.biography}
          </p>
        </div>
      </motion.div>
      <motion.div
        animate={{
          background: theme?.cardBg,
          color: theme?.header,
          borderColor: theme?.btnColor,
        }}
        className="border-[1px] rounded-lg min-w-full p-5 flex flex-col items-start justify-start gap-3"
      >
        <h3 className="text-page-header  font-bold capitalize min-w-full text-start ">
          liked blogs
        </h3>
        <div className="min-w-full flex items-center justify-center gap-3 flex-wrap">
          {userData.user?.likedPosts.map((post, i) => (
            <BlogCard blog={post} index={i} key={post._id} />
          ))}
          <Button
            className="px-3 py-2 rounded-lg capitalize flex items-center justify-between gap-2"
            disabled={false}
            onclick={() => {
              userData.istrusted
                ? router.push("/profile/create/blog")
                : toast.error(
                    "your not authorized to create a blog.please login with your account!"
                  );
            }}
            text="add blog"
          >
            <AiOutlineAppstoreAdd />
          </Button>
        </div>
      </motion.div>{" "}
      <motion.div
        animate={{
          background: theme?.cardBg,
          color: theme?.header,
          borderColor: theme?.btnColor,
        }}
        className="border-[1px] rounded-lg min-w-full p-5 flex flex-col items-start justify-start gap-3"
      >
        <h3 className="text-page-header  font-bold capitalize min-w-full text-start ">
          bookmarked blogs
        </h3>
        <div className="min-w-full flex items-center justify-center gap-3 flex-wrap">
          {userData.user?.bookmarkedPosts.map((post, i) => (
            <BlogCard blog={post} index={i} key={post._id} />
          ))}
          <Button
            className="px-3 py-2 rounded-lg capitalize flex items-center justify-between gap-2"
            disabled={false}
            onclick={() => {
              userData.istrusted
                ? router.push("/profile/create/blog")
                : toast.error(
                    "your not authorized to create a blog.please login with your account!"
                  );
            }}
            text="add blog"
          >
            <AiOutlineAppstoreAdd />
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default profile;

export const GetServerSideProps = Wrapper.getServerSideProps(
  (store) =>
    (_ctx): any => {
      store.dispatch(FetchUserAuthentication("load", "GET", "/user/load"));
    }
);
