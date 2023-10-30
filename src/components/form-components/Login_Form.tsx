import { useFormik } from "formik";
import * as Yup from "yup";
import Input_components from "./Input-Component";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/app/Auth/AuthReducer";
import { FetchUserAuthentication } from "@/app/Auth/AuthActions";
import { useThemeContext } from "@/context/ThemeContext";
const initialValues = {
  email: "",
  password: "",
};

const Login_Form = () => {
  const router = useRouter();
  const theme = useThemeContext();
  const userData = useSelector(selectAuth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (val) => {
      dispatch(
        FetchUserAuthentication("login", "POST", "/user/signin", {
          email: val.email,
          password: val.password,
        }) as any
      );
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email is required")
        .email("email is not valid"),
      password: Yup.string()
        .required("password is required")
        .min(8, "password must be more than 8 character"),
    }),
  });
  useEffect(() => {
    if (userData.istrusted) {
      router.push("/profile");
    }
  }, [userData]);
  return (
    <form
      style={{
        background: theme?.cardBg,
        color: theme?.header,
        border: `1px solid ${theme?.btnColor}`,
      }}
      onSubmit={formik.handleSubmit}
    >
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

      <button
        className="mx-auto mt-3 w-full h-fit px-3 py-2 rounded-lg text-[1rem] bg-green-700 text-white capitalize font-semibold"
        type="submit"
      >
        Login
      </button>
      <p
        style={{
          color: theme?.plainText,
        }}
        className="p-1 mt-3 min-w-full text-[.9rem] capitalize"
      >
        you dont have an account?{" "}
        <Link href="/signup" legacyBehavior>
          <a
            style={{ color: theme?.btnColor }}
            className="  font-semibold capitalize"
          >
            Sign up
          </a>
        </Link>
      </p>
    </form>
  );
};

export default Login_Form;
