import Link from "next/link";

const Header = () => {
  return (
    <div className="header-container">
      <div className="min-h-full max-w-[50%] flex items-center justify-end gap-3 ">
        <Link href="/login" legacyBehavior>
          <a>login</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a>sign up</a>
        </Link>
        <Link href="/profile" legacyBehavior>
          <a>profile</a>
        </Link>
      </div>
      <div className="min-h-full max-w-[40%] flex items-center justify-start gap-3 ">
        <Link href="/blogs" legacyBehavior>
          <a>blogs</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a>home</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
