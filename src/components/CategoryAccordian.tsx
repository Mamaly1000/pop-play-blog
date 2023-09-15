import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const CategoryAccordian = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="col-span-12 md:col-span-2 md:row-span-3 h-fit overflow-hidden w-full flex flex-col items-start justify-start gap-2 p-2 rounded-lg bg-gray-600 capitalize font-semibold">
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
          {[
            {
              name: "films",
              href: "#",
            },
            {
              name: "games",
              href: "#",
            },
            {
              name: "musics",
              href: "#",
            },
          ].map((category) => {
            return (
              <li
                className="w-full border-[1px] border-x-transparent border-t-transparent border-gray-300 rounded-lg p-2 hover:border-x-gray-300 drop-shadow-2xl hover:scale-[1.05] hover:border-t-gray-300"
                key={category.name}
              >
                <Link href={category.href} legacyBehavior>
                  <a className="w-full whitespace-nowrap overflow-hidden flex items-center justify-start gap-1 ">
                    {category.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CategoryAccordian;
