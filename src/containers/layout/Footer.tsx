import { useThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const theme = useThemeContext();
  return (
    <motion.div
      animate={{ background: theme?.mainBg }}
      style={{ color: theme?.header }}
      className="footer-container capitalize font-semibold flex items-center justify-center"
    >
      for observing the source code, check out my repo{" "}
      <Link href="https://github.com/Mamaly1000/pop-play-blog" legacyBehavior>
        <a
          style={{ color: theme?.btnColor }}
          className="font-bold capitalize underline"
        >
          <FaGithub className="w-[40px] h-[40px]" />
        </a>
      </Link>
    </motion.div>
  );
};

export default Footer;
