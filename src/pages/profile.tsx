import Layout from "@/layout/Layout";
import Image from "next/image";
import { useAuth } from "src/context/AuthContext";

const profile = () => {
  const userAuth = useAuth();
  console.log(userAuth?.user.user);

  return (
    <Layout>
      <div className="bg-gray-300 text-gray-600 font-bold capitalize rounded-lg min-w-full p-5 drop-shadow-2xl flex flex-wrap gap-5 items-center justify-start ">
        <Image
          className="min-h-[200px] max-h-[200px] min-w-[200px] max-w-[200px] object-contain rounded-full ring-1 ring-gray-800 "
          src={userAuth?.user.user?.profilePicURL || ""}
          width="200"
          height="200"
          loader={() => userAuth?.user?.user?.profilePicURL || ""}
          alt="profile pic"
        />
        <div className="flex flex-col items-start justify-start gap-3 max-w-fit">
          <div className="flex items-center justify-start gap-2 ">
            {userAuth?.user!.user?.name}
            <span className="px-3 py-2 rounded-lg border-[1px] border-gray-800 text-gray-800 ">
              {userAuth?.user!.user?.expertise}
            </span>
          </div>
          <p className="text-[.8rem] text-start max-w-[200px]">
            {userAuth?.user.user?.biography}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
