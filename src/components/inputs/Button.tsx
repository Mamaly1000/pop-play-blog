import { ReactNode } from "react";
import {
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
  motion,
} from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";

const Button = ({
  text,
  children,
  onclick,
  disabled,
  className,
  animate,
}: {
  animate?:
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | undefined;

  text: string;
  children?: ReactNode;
  onclick: () => void;
  disabled: boolean;
  className: string;
}) => {
  const theme = useThemeContext();
  return (
    <motion.button
      animate={
        animate || {
          background: theme?.cardBg,
          border: `1px solid ${theme?.btnColor}`,
          color: theme?.header,
        }
      }
      onClick={onclick}
      disabled={disabled}
      className={className}
    >
      {text}
      {children}
    </motion.button>
  );
};

export default Button;
