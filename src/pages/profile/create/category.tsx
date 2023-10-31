import CreateBlogForm from "@/components/form-components/CreateBlogForm";
import CreateCategoryForm from "@/components/form-components/CreateCategoryForm";
import { useThemeContext } from "@/context/ThemeContext";
import Layout from "@/layout/Layout";

const CreateCategory = () => {
  const theme = useThemeContext();
  return (
    <Layout>
      <div className="min-w-full flex items-start justify-start gap-5 flex-wrap">
        <h2
          style={{
            background: theme?.cardBg,
            color: theme?.header,
            borderColor: theme?.btnColor,
          }}
          className="border-[1px] rounded-lg p-4 min-w-full text-page-header capitalize"
        >
          lets create a new category
        </h2>
        <CreateCategoryForm />
      </div>
    </Layout>
  );
};

export default CreateCategory;
