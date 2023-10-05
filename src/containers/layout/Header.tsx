import Image from "next/image";
import Link from "next/link";
import { useAuth, useAuthActions } from "src/context/AuthContext";
import { SlLogout } from "react-icons/sl";
import { AnimatePresence, motion } from "framer-motion";
import { GoHome } from "react-icons/go";
import { MdLibraryBooks } from "react-icons/md";
const Header = () => {
  const userAuth = useAuth();
  const dispatch = useAuthActions();
  return (
    <div className="header-container">
      <div className="min-h-full max-w-[50%] flex items-center justify-end gap-3 ">
        {!userAuth?.user.istrusted && (
          <>
            <Link href="/login" legacyBehavior>
              <a>login</a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a>sign up</a>
            </Link>
          </>
        )}
        {userAuth?.user.istrusted && (
          <Link href="/profile" legacyBehavior>
            <motion.a
              initial={{ scale: 0, cursor: "pointer" }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.1 }}
              className="profile-btn "
            >
              <Image
                src={userAuth!.user!.user!.profilePicURL}
                loader={() => userAuth!.user!.user!.profilePicURL}
                alt="profile pic"
                width={20}
                height={20}
                className="rounded-full   ring-1 ring-gray-300 object-contain"
              />
              <span className="hidden sm:block">
                {userAuth?.user.istrusted &&
                  userAuth!.user!.user!.name.slice(0, 10)+" ..."}
              </span>
            </motion.a>
          </Link>
        )}
        <AnimatePresence>
          {userAuth?.user.istrusted && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => {
                dispatch?.dispatchUser({ type: "LOG_OUT" });
              }}
            >
              <SlLogout className="w-[20px] h-[20px]  text-red-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="min-h-full max-w-[40%] flex items-center justify-start gap-3 ">
        <Link href="/blogs" legacyBehavior>
          <a>
            <span className="absolute hidden sm:visible">blogs</span>
            <MdLibraryBooks className="stroke-white w-[20px] h-[20px]" />
          </a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className="flex items-center justify-center relative">
            <span className="absolute hidden sm:visible">home</span>
            <GoHome className="stroke-white w-[20px] h-[20px]" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
