import BlogsSection from "@/components/BlogsSection";
import CategoryAccordian from "@/components/CategoryAccordian";
import CategorySort from "@/components/CategorySort";
import Layout from "@/layout/Layout";
import axios from "axios";

export default function Home({ res }: { res: any }) {
  console.log(res);

  return (
    <Layout>
      <div className="p-2 py-24 md:py-2 w-full grid grid-cols-12 gap-5">
        <CategorySort />
        <CategoryAccordian />
        <BlogsSection />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
  );
  return {
    props: {
      res: data,
    },
  };
}
