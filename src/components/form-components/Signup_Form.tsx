import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Input_components from "./Input-Component";
import Link from "next/link";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Signup_Form = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {},
    validationSchema: Yup.object({
      name: Yup.string()
        .required("your name is required")
        .min(5, "your name must has more than 5 character"),
      phone: Yup.string()
        .required("your phone number is required")
        .matches(
          RegExp("^(\\+98|0)?9\\d{9}$"),
          "your phone number is not valid"
        ),
      email: Yup.string()
        .required("email is required")
        .email("email is not valid"),
      password: Yup.string()
        .required("password is required")
        .min(8, "password must be more than 8 character"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("you must confirm your password"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input_components formik={formik} label="name" name="name" type="text" />
      <Input_components formik={formik} label="phone" name="phone" type="tel" />
      <Input_components
        formik={formik}
        label="email"
        name="email"
        type="email"
      />
      <Input_components
        formik={formik}
        label="password"
        name="password"
        type="password"
      />
      <Input_components
        formik={formik}
        label="confirmPassword"
        name="confirmPassword"
        type="password"
      />
      <button
        className="mt-3 mx-auto w-full h-fit px-3 py-2 rounded-lg text-[1rem] bg-green-700 text-white capitalize font-semibold"
        type="submit"
      >
        signup
      </button>
      <p className="p-1 mt-3 min-w-full text-[.9rem]">
        Already have an account?{" "}
        <Link href="/login" legacyBehavior>
          <a className="text-yellow-200 font-semibold capitalize">Sign in</a>
        </Link>
      </p>
    </form>
  );
};

export default Signup_Form;
