import Link from "next/link";
import { ReactNode } from "react";
import {
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
  motion,
} from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";

const CustomLink = ({
  href,
  text,
  linkClassName,
  children,
  textClassName,
  animate,
}: {
  href: string;
  text: string;
  linkClassName: string;
  children?: ReactNode;
  textClassName: string;
  animate?:
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | undefined;
}) => {
  const theme = useThemeContext();
  return (
    <Link href={href} legacyBehavior>
      <motion.a
        animate={
          animate || {
            background: theme?.cardBg,
            border: `1px solid ${theme?.btnColor}`,
            color: theme?.header,
          }
        }
        className={linkClassName}
      >
        <span className={textClassName}>{text}</span>
        {children}
      </motion.a>
    </Link>
  );
};

export default CustomLink;
