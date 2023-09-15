import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const CategorySort = () => {
  return (
    <div className="overflow-hidden col-span-12 md:col-span-10 md:row-span-1   h-fit min-w-fit capitalize font-semibold flex flex-row items-start justify-start gap-2 p-2 bg-gray-600 rounded-lg ">
      <div className="w-fit p-2 rounded-s-lg rounded-e-none bg-gray-700 whitespace-nowrap flex items-center justify-center gap-2">
        sort by{" "}
        <AdjustmentsHorizontalIcon className=" w-[25px] h-[25px] stroke-white" />
      </div>
      <div className="w-full flex flex-row items-center justify-start gap-2 ">
        {["newest", "top views", "popular"].map((sort) => {
          return (
            <Link key={sort} href="#" legacyBehavior>
              <a className="w-fit p-2 border-b-[1px] border-gray-200 rounded-lg  whitespace-nowrap hover:px-10">
                {sort}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySort;
