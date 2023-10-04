import { useFormik } from "formik";
import * as Yup from "yup";
import Input_components from "./Input-Component";
import Link from "next/link";
import { useAuth, useAuthActions } from "src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
const initialValues = {
  email: "",
  password: "",
};

const Login_Form = () => {
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useAuthActions();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (val) => {
      dispatch!.dispatchUser({ type: "LOGIN", payload: val }) as any;
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
    if (auth?.user.istrusted) {
      router.push("/profile");
    }
  }, [auth?.user]);
  return (
    <form onSubmit={formik.handleSubmit}>
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
      <p className="p-1 mt-3 min-w-full text-[.9rem]">
        you dont have an account?{" "}
        <Link href="/signup" legacyBehavior>
          <a className="text-yellow-200 font-semibold capitalize">Sign up</a>
        </Link>
      </p>
    </form>
  );
};

export default Login_Form;
