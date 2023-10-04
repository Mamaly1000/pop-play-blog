import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Input_components from "./Input-Component";
import Link from "next/link";
import { useAuth, useAuthActions } from "src/context/AuthContext";
import { useRouter } from "next/router";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  profilePic: "",
  biography: "",
  expertise: "",
};

const Signup_Form = () => {
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useAuthActions();
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      dispatch!.dispatchUser({
        type: "SIGN_UP",
        payload: {
          name: val.name,
          email: val.email,
          phoneNumber: val.phone,
          password: val.password,
          profilePicURL: val.profilePic,
          expertise: val.expertise,
          biography: val.biography,
        },
      });
    },
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
      profilePic: Yup.string().required("profile pic is required"),
      biography: Yup.string().required("biography is required"),
      expertise: Yup.string().required("expertise is required"),
    }),
  });
  useEffect(() => {
    if (auth?.user.istrusted) {
      router.push("/profile");
    }
  }, [auth?.user]);
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
      />{" "}
      <Input_components
        formik={formik}
        label="expertise"
        name="expertise"
        type="text"
      />
      <Input_components
        formik={formik}
        label="biography"
        name="biography"
        type="text"
      />
      <Input_components
        formik={formik}
        label="profile pic url"
        name="profilePic"
        type="text"
      />
      <div
        style={{ backgroundImage: `url(${formik.values.profilePic})` }}
        className="max-w-[200px] bg-gray-300 mx-auto bg-center bg-contain ring-1 ring-gray-500 drop-shadow-2xl min-w-[200px] object-contain rounded-full min-h-[200px] max-h-[200px] "
      ></div>
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
