import BlogsSection from "@/components/BlogsSection";
import CategoryAccordian from "@/components/CategoryAccordian";
import CategorySort from "@/components/CategorySort";
import Layout from "@/layout/Layout";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import queryString from "query-string";

const SingleCategoryPage = () => {
  return (
    <Layout>
      <div className="p-2 py-24 md:py-2 w-full grid grid-cols-12 gap-5">
        <CategorySort />
        <CategoryAccordian />
        <BlogsSection />
      </div>
    </Layout>
  );
};

export default SingleCategoryPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx;
  const newQuery = queryString.stringify(query);
  const { data } = await axios.get(
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
  );
  return {
    props: {
      res: data,
    },
  };
}
