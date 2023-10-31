import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Input_components from "./Input-Component";
import Image from "next/image";
import { useThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import http from "@/services/httpService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CustomSelect from "../inputs/CustomSelect";
import { categoryType } from "@/types/category-type";
const init: {
  title: string;
  titleBrief: string;
  briefText: string;
  category: string;
  text: string;
  coverImage: string;
  readingTime: string;
  slug: string;
} = {
  briefText: "",
  category: "",
  coverImage: "",
  readingTime: "",
  text: "",
  title: "",
  titleBrief: "",
  slug: "",
};
const CreateBlogForm = () => {
  const router = useRouter();
  const theme = useThemeContext();
  const [categories, setCategories] = useState<categoryType[]>([]);
  const formik = useFormik({
    initialValues: init,
    onSubmit(values) {
      http
        .post("/posts/create", values)
        .then((res) => {
          toast.success(res.data.message);
          router.push("/");
        })
        .catch((err) => toast.error(err.response.data.message));
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("your blog require a title")
        .min(5, "your title must has more than 5 character"),
      titleBrief: Yup.string().required("your blog require a title brief"),
      briefText: Yup.string().required("your blog require a brief text"),
      category: Yup.string().required("your blog require a category brief"),
      text: Yup.string().required("your blog require a text"),
      coverImage: Yup.string().required("your blog require a cover image url"),
      readingTime: Yup.string().required("your blog require a reading time"),
    }),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      await http
        .get("/post-category")
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch(() => fetchCategories());
    };
    fetchCategories();
  }, []);

  return (
    <motion.form
      animate={{
        background: theme?.cardBg,
        color: theme?.header,
        borderColor: theme?.btnColor,
      }}
      className=" border-[1px] p-4 rounded-lg min-w-full min-h-[400px] flex flex-wrap justify-start items-start gap-3"
      onSubmit={formik.handleSubmit}
    >
      <Input_components
        formik={formik}
        label="title"
        name="title"
        type="text"
      />{" "}
      <Input_components formik={formik} label="slug" name="slug" type="text" />
      <Input_components
        formik={formik}
        label="titleBrief"
        name="titleBrief"
        type="text"
      />
      <Input_components
        formik={formik}
        label="briefText"
        name="briefText"
        type="text"
      />
      <Input_components
        formik={formik}
        label="coverImage"
        name="coverImage"
        type="text"
      />
      <div className="min-w-full min-h-fit flex items-center justify-center">
        <Image
          style={{ background: theme?.cardBg, borderColor: theme?.btnColor }}
          width={200}
          height={200}
          className="rounded-full border-[1px] min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] object-cover"
          src={formik.values.coverImage}
          alt=""
          loader={() => formik.values.coverImage}
        />
      </div>
      <Input_components
        formik={formik}
        label="readingTime"
        name="readingTime"
        type="number"
      />
      <Input_components formik={formik} label="text" name="text" type="text" />
      <CustomSelect
        label="category"
        setValue={(val) => {
          formik.setFieldValue("category", val.id);
        }}
        values={categories.map((item) => {
          return {
            bg: item.color,
            text: item.title,
            value: item._id,
            id: item._id,
          };
        })}
        formik={formik}
        name="category"
      />
      <div className="min-w-full flex justify-between gap-2 items-center flex-col md:flex-row">
        <input
          type="submit"
          value="submit"
          className="w-full md:w-[45%] rounded-lg px-3 py-2 text-center capitalize font-semibold bg-green-800"
        />
        <input
          type="reset"
          value="reset"
          onClick={() => formik.resetForm()}
          className="w-full md:w-[45%] rounded-lg px-3 py-2 text-center capitalize font-semibold bg-red-800"
        />
      </div>
    </motion.form>
  );
};

export default CreateBlogForm;
