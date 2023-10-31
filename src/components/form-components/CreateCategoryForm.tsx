import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import http from "@/services/httpService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useThemeContext } from "../../context/ThemeContext";
import Input_components from "./Input-Component";
import { gradientGenerator } from "@/utils/gradientGenerator";
const init: {
  title: string;
  englishTitle: string;
  description: string;
  color: string;
} = {
  title: "",
  englishTitle: "",
  description: "",
  color: "",
};
const CreateCategoryForm = () => {
  const router = useRouter();
  const theme = useThemeContext();
  const formik = useFormik({
    initialValues: init,
    onSubmit(values) {
      http
        .post("/post-category/create", {
          ...values,
          color: gradientGenerator(),
        })
        .then((res) => {
          toast.success(res.data.message);
          router.push("/");
        })
        .catch((err) => toast.error(err.response.data.message));
    },
    validationSchema: Yup.object({
      title: Yup.string().required("your blog require a title"),
      englishTitle: Yup.string().required("your blog require a englishTitle"),
      description: Yup.string().required("your blog require a description"),
    }),
  });
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
      <Input_components
        formik={formik}
        label="englishTitle"
        name="englishTitle"
        type="text"
      />
      <Input_components
        formik={formik}
        label="description"
        name="description"
        type="text"
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

export default CreateCategoryForm;
