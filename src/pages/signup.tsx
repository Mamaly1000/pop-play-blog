import Signup_Form from "@/components/form-components/Signup_Form";
import { useThemeContext } from "@/context/ThemeContext";
import Layout from "@/layout/Layout";

const signup = () => {
  const theme = useThemeContext();
  return (
    <Layout>
      <h1
        style={{
          background: theme?.cardBg,
          color: theme?.header,
          border: `1px solid ${theme?.btnColor}`,
        }}
        className=" min-w-[90%] whitespace-nowrap md:min-w-[400px] bg-gray-600 capitalize text-[2rem] text-center font-bold mx-auto p-2 drop-shadow-2xl rounded-lg"
      >
        signup
      </h1>
      <Signup_Form />
    </Layout>
  );
};

export default signup;
