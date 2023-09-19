import React from "react";
import { SiTelegram } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
const SocialMediaComponent = () => {
  const iconSize = "w-[20px] h-[20px]  ";
  const location = useRouter();
  const url = `http://localhost:3000/${location.asPath}`;

  return (
    <div className="w-fit   flex gap-5 items-center flex-wrap justify-center [&>a:hover]:scale-110   [&>a:active]:scale-90   [&>a]:rounded-lg [&>a]:bg-gray-700 [&>a]:p-[10px] ">
      <Link
        href={`https://www.linkedin.com/cws/share?url=${url}`}
        legacyBehavior
        target="_blank"
      >
        <a target="_blank">
          <BsLinkedin className={`${iconSize}`} />
        </a>
      </Link>
      <Link
        href={`https://t.me/share/url?url=${url}`}
        legacyBehavior
        target="_blank"
      >
        <a target="_blank">
          <SiTelegram className={`${iconSize}`} />
        </a>
      </Link>
      <Link
        href={`https://twitter.com/share?url=${url}`}
        legacyBehavior
        target="_blank"
      >
        <a target="_blank">
          <FaTwitter className={`${iconSize}`} />
        </a>
      </Link>
    </div>
  );
};

export default SocialMediaComponent;
