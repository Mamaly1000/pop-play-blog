import { useFormik } from "formik";
import * as Yup from "yup";
import Input_components from "./Input-Component";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "src/context/AuthContext";
const initialValues = {
  email: "",
  password: "",
};

const Login_Form = () => {
  const auth = useAuth();
  console.log(auth?.user);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (val) => {
      axios
        .post("http://localhost:5000/api/user/signin", val, {
          withCredentials: true,
        })
        .then((res) => toast.success(res.data.message))
        .catch((err) => toast.error(err?.response?.data?.message));
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
