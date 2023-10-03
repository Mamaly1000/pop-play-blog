import Signup_Form from "@/components/form-components/Signup_Form";
import Layout from "@/layout/Layout";

const signup = () => {
  return (
    <Layout>
      <h1 className=" min-w-[90%] whitespace-nowrap md:min-w-[400px] bg-gray-600 capitalize text-[2rem] text-center font-bold mx-auto p-2 drop-shadow-2xl rounded-lg">
        signup
      </h1>
      <Signup_Form />
    </Layout>
  );
};

export default signup;
