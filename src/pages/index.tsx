import BlogsSection from "@/components/BlogsSection";
import CategoryAccordian from "@/components/CategoryAccordian";
import CategorySort from "@/components/CategorySort";
import Layout from "@/layout/Layout";
import http from "@/services/httpService";
import { categoryType } from "@/types/category-type";
import { mainPostType } from "@/types/postMainType";
import { GetServerSidePropsContext } from "next";
import queryString from "query-string";

export default function Home({
  postsData,
  categoriesData,
}: {
  postsData: mainPostType;
  categoriesData: { data: categoryType[] };
}) {
  return (
    <Layout>
      <div className="p-2 py-24 md:py-2 w-full grid grid-cols-12 gap-5">
        <CategorySort />
        <CategoryAccordian categoriesData={categoriesData.data} />
        <BlogsSection blogs={postsData!.data!.docs} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext) {
  const { data: blogsData } = await http.get(
    `/posts?${queryString.stringify(query)}`,
    {
      headers: {
        Cookie: req.headers.cookie || "",
      },
    }
  );
  const { data: categoriesData } = await http.get("/post-category");

  return {
    props: {
      postsData: blogsData,
      categoriesData,
    },
  };
}
