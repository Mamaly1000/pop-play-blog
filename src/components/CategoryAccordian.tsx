import { categoryType } from "@/types/category-type";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

const CategoryAccordian = ({
  categoriesData,
}: {
  categoriesData: categoryType[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div className="hidden sm:flex col-span-12 md:col-span-3 md:row-span-3 h-fit overflow-hidden w-full   flex-col items-start justify-start gap-2 p-2 rounded-lg bg-gray-600 capitalize font-semibold">
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
              className={`w-full border-[1px] text-gray-300 rounded-lg p-2 hover:border-x-gray-300 drop-shadow-2xl hover:scale-[1.05] hover:border-t-gray-300 ${
                router.query.category_slug
                  ? "border-gray-500 border-x-transparent border-t-transparent"
                  : "bg-gray-800 "
              }`}
            >
              <Link href={`/blogs`} legacyBehavior>
                <a className="w-full whitespace-nowrap overflow-hidden flex items-center justify-start gap-1 ">
                  all categories
                </a>
              </Link>
            </li>
            {categoriesData.map((category) => {
              return (
                <motion.li
                  className={`w-full border-[1px] border-x-transparent border-t-transparent  rounded-lg hover:border-x-gray-300 drop-shadow-2xl hover:scale-[1.05] hover:border-t-gray-300 ${
                    router.query.category_slug === category.englishTitle
                      ? "  text-white border-white "
                      : "border-gray-300"
                  }`}
                  key={category._id}
                  animate={{
                    border:
                      router.query.category_slug === category.englishTitle
                        ? `1px solid #ffffff`
                        : "",
                    background:
                      router.query.category_slug === category.englishTitle
                        ? category.color
                        : "",
                  }}
                >
                  <Link
                    href={`/blogs/${category.englishTitle}`}
                    key={category._id}
                    legacyBehavior
                  >
                    <a className="w-full p-2 whitespace-nowrap overflow-hidden flex items-center justify-start gap-1 ">
                      {category.englishTitle}
                    </a>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex sm:hidden min-w-full p-2 rounded-lg bg-gray-600  max-w-fit col-span-12 row-span-1 gap-2 my-2 mx-1 overflow-auto capitalize text-gray-400">
        <div className="cursor-default min-w-fit px-3 py-2 whitespace-nowrap overflow-hidden flex items-center justify-center gap-1 border border-white text-white bg-gray-700 hover:scale-110 rounded-s-lg p-1">
          categories
        </div>
        <Link href={`/blogs`} legacyBehavior>
          <a
            className={`min-w-fit px-3 py-2 whitespace-nowrap overflow-hidden flex items-center justify-center gap-1 border border-white text-white ${
              !router.query.category_slug ? "bg-gray-800" : "bg-transparent"
            } hover:scale-110 rounded-lg p-1`}
          >
            all categories
          </a>
        </Link>
        {categoriesData.map((category) => {
          return (
            <Link
              href={`/blogs/${category.englishTitle}`}
              key={category._id}
              legacyBehavior
            >
              <motion.a
                animate={{
                  border:
                    router.query.category_slug === category.englishTitle
                      ? `1px solid #ffffff`
                      : "",
                  background:
                    router.query.category_slug === category.englishTitle
                      ? category.color
                      : "",
                }}
                className="cursor-pointer min-w-fit px-3 py-2 whitespace-nowrap overflow-hidden flex items-center justify-center gap-1 border border-white text-white bg-gray-500 hover:scale-110 rounded-lg p-1"
              >
                {category.englishTitle}
              </motion.a>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CategoryAccordian;
