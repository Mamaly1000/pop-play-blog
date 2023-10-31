import CreateBlogForm from "@/components/form-components/CreateBlogForm";
import { useThemeContext } from "@/context/ThemeContext";
import Layout from "@/layout/Layout";
import React from "react";

const CreateBlog = () => {
  const theme = useThemeContext();
  return (
    <Layout>
      {" "}
      <div className="min-w-full flex items-start justify-start gap-5 flex-wrap">
        <h2
          style={{
            background: theme?.cardBg,
            color: theme?.header,
            borderColor: theme?.btnColor,
          }}
          className="border-[1px] rounded-lg p-4 min-w-full text-page-header capitalize"
        >
          lets create a new blog
        </h2>
        <CreateBlogForm />
      </div>
    </Layout>
  );
};

export default CreateBlog;
