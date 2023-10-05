import { routerPush } from "@/utils/routerPush";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const CategorySort = () => {
  const router = useRouter();
  const [sort, setSort] = useState<string | string[]>(
    router?.query?.sort || "newest"
  );
  const sortHandler = (id: string) => {
    setSort(id);
    router.query.sort = id;
    routerPush(router);
  };

  return (
    <div className="overflow-auto min-w-full max-w-fit col-span-12 md:col-span-9 md:row-span-1   h-fit   capitalize font-semibold flex flex-row items-start justify-start gap-2 p-2 bg-gray-600 rounded-lg ">
      <div className="w-fit p-2 rounded-s-lg rounded-e-none bg-gray-700 whitespace-nowrap flex items-center justify-center gap-2">
        sort by{" "}
        <AdjustmentsHorizontalIcon className=" w-[25px] h-[25px] stroke-white" />
      </div>
      <div className="w-full flex flex-row items-center justify-start gap-2 ">
        {["newest", "popular", "most viewed"].map((s) => {
          return (
            <button
              key={s}
              onClick={() => sortHandler(s)}
              className={`w-fit p-2 border-b-[1px]  hover:px-10 rounded-lg  whitespace-nowrap ${
                sort === s
                  ? "px-10 bg-gray-200 text-gray-800 border-gray-800 shadow-inner shadow-gray-900 font-semibold"
                  : "border-gray-200"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySort;
