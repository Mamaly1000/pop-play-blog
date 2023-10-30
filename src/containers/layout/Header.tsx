import Image from "next/image";
import Link from "next/link";
import { SlLogout } from "react-icons/sl";
import { AnimatePresence, motion } from "framer-motion";
import { GoHome } from "react-icons/go";
import { MdLibraryBooks } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/app/Auth/AuthReducer";
import { FetchUserAuthentication } from "@/app/Auth/AuthActions";
import { useThemeContext } from "@/context/ThemeContext";
import { themes } from "src/data/themes";
import CustomLink from "@/components/inputs/CustomLink";
import Button from "@/components/inputs/Button";
const Header = () => {
  const theme = useThemeContext();
  const dispatch = useDispatch();
  const userData = useSelector(selectAuth);
  return (
    <div className="header-container">
      <div className="min-h-full max-w-[50%] flex items-center justify-end gap-3 ">
        {!userData.istrusted && (
          <>
            <CustomLink
              href="/login"
              linkClassName=""
              textClassName=""
              text="login"
            />{" "}
            <CustomLink
              href="/signup"
              linkClassName=""
              textClassName=""
              text="sign up"
            />
          </>
        )}
        {userData.istrusted && userData.user?.profilePicURL && (
          <CustomLink
            href="/profile"
            linkClassName="profile-btn "
            textClassName="hidden sm:block"
            text={
              userData.istrusted && userData.user!.name.slice(0, 10) + " ..."
            }
          >
            <Image
              src={userData?.user!.profilePicURL || ""}
              loader={() => userData?.user!.profilePicURL || ""}
              alt="profile pic"
              width={20}
              height={20}
              className="rounded-full   ring-1 ring-gray-300 object-contain"
            />
          </CustomLink>
        )}
        <AnimatePresence>
          {userData.istrusted && (
            <Button
              onclick={() => {
                dispatch(
                  FetchUserAuthentication(
                    "logout",
                    "GET",
                    "/user/logout"
                  ) as any
                );
              }}
              className=""
              disabled={false}
              text=""
            >
              <SlLogout className="w-[20px] h-[20px]  text-red-400" />
            </Button>
          )}
        </AnimatePresence>
      </div>{" "}
      <div className="flex items-center justify-end gap-2">
        {themes.map((t) => {
          return (
            <motion.button
              animate={{
                border: `1px solid ${theme?.btnColor}`,
                background: t.mainBg,
                borderRadius: "50%",
              }}
              key={t.btnColor}
              className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] rounded-full drop-shadow-2xl outline-none "
              onClick={() => theme?.setLocalTheme(t)}
            ></motion.button>
          );
        })}
      </div>
      <div className="min-h-full max-w-[40%] flex items-center justify-start gap-3 ">
        <CustomLink
          href="/blogs"
          linkClassName=""
          textClassName="absolute hidden sm:visible"
          text="blogs"
        >
          <MdLibraryBooks className="stroke-white w-[20px] h-[20px]" />
        </CustomLink>
        <CustomLink
          href="/"
          linkClassName="flex items-center justify-center relative"
          textClassName="absolute hidden sm:visible"
          text="home"
        >
          <GoHome className="stroke-white w-[20px] h-[20px]" />
        </CustomLink>
      </div>
    </div>
  );
};

export default Header;
