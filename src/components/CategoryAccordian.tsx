import { categoryType } from "@/types/category-type";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";
import CustomLink from "./inputs/CustomLink";

const CategoryAccordian = ({
  categoriesData,
}: {
  categoriesData: categoryType[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const theme = useThemeContext();
  return (
    <>
      <div
        style={{
          background: theme?.cardBg,
          border: `1px solid ${theme?.btnColor}`,
        }}
        className="hidden sm:flex col-span-12 md:col-span-3 md:row-span-3 h-fit overflow-hidden w-full   flex-col items-start justify-start gap-2 p-2 rounded-lg bg-gray-600 capitalize font-semibold"
      >
        <div
          onClick={() => setOpen((pre) => !pre)}
          className={`w-full  bg-gray-700 p-1 ${
            !open ? "rounded-t-lg" : "rounded-lg"
          }   flex items-center gap-2 justify-center cursor-pointer`}
        >
          Blogs Categories{" "}
          <ArrowDownCircleIcon
            className={`stroke-white w-[25px] h-[25px] ${
              !open ? "rotate-180" : ""
            }`}
          />
        </div>
        {!open && (
          <ul className="flex items-start justify-start gap-2 p-1 w-full flex-col">
            <li
              className={`w-full    rounded-lg   drop-shadow-2xl hover:scale-[1.05] `}
            >
              <CustomLink
                text="all categories"
                href="/blogs"
                linkClassName="w-full rounded-lg cursor-pointer p-2 whitespace-nowrap overflow-hidden flex items-center justify-start gap-1 "
                textClassName=""
                animate={{
                  border: !!router.query.category_slug
                    ? `1px solid ${theme?.btnColor}`
                    : `1px solid #ffffff`,
                  background: !!router.query.category_slug
                    ? theme?.mainBg
                    : theme?.cardBg,
                }}
              />
            </li>
            {categoriesData.map((category) => {
              return (
                <motion.li
                  className={`w-full    rounded-lg   drop-shadow-2xl hover:scale-[1.05] `}
                  key={category._id}
                >
                  <CustomLink
                    text={category.englishTitle}
                    href={`/blogs/${category.englishTitle}`}
                    linkClassName="w-full rounded-lg cursor-pointer p-2 whitespace-nowrap overflow-hidden flex items-center justify-start gap-1 "
                    textClassName=""
                    animate={{
                      border:
                        router.query.category_slug === category.englishTitle
                          ? `1px solid #ffffff`
                          : `1px solid ${theme?.btnColor}`,
                      background:
                        router.query.category_slug === category.englishTitle
                          ? category.color
                          : theme?.mainBg,
                    }}
                  />
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
      <div
        style={{
          background: theme?.cardBg,
          border: `1px solid ${theme?.btnColor}`,
        }}
        className="flex sm:hidden min-w-full p-2 rounded-lg bg-gray-600  max-w-fit col-span-12 row-span-1 gap-2 my-2 mx-1 overflow-auto capitalize text-gray-400"
      >
        <div className="cursor-default min-w-fit px-3 py-2 whitespace-nowrap overflow-hidden flex items-center justify-center gap-1     bg-gray-700 hover:scale-110 rounded-s-lg p-1">
          categories
        </div>
        <CustomLink
          text="all categories"
          href="/blogs"
          linkClassName={`min-w-fit px-3 py-2 whitespace-nowrap overflow-hidden flex items-center justify-center gap-1   hover:scale-110 rounded-lg p-1`}
          textClassName=""
          animate={{
            border: !router.query.category_slug
              ? `1px solid #ffffff`
              : `1px solid ${theme?.btnColor}`,
            background: !router.query.category_slug
              ? theme?.cardBg
              : theme?.mainBg,
            color: theme?.header,
          }}
        />
        {categoriesData.map((category) => {
          return (
            <CustomLink
              href={`/blogs/${category.englishTitle}`}
              animate={{
                border:
                  router.query.category_slug === category.englishTitle
                    ? `1px solid #ffffff`
                    : `1px solid ${theme?.btnColor}`,
                background:
                  router.query.category_slug === category.englishTitle
                    ? category.color
                    : theme?.mainBg,
              }}
              linkClassName="cursor-pointer min-w-fit px-3 py-2 whitespace-nowrap overflow-hidden flex items-center justify-center gap-1 border border-white text-white bg-gray-500 hover:scale-110 rounded-lg p-1"
              text={category.englishTitle}
              textClassName=""
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryAccordian;
