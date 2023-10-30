import { useThemeContext } from "@/context/ThemeContext";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const Div = styled.div`
  .MuiFormLabel-root {
    color: ${(props: any) => props.theme.header} !important;
    text-transform: capitalize;
  } 
  input,
  p {
    color: ${(props: any) => props.theme.header} !important;
  }
  p {
    padding: 5px;
    background: #fc2947 !important;
  }
  .css-2y464i-MuiInputBase-root-MuiFilledInput-root::after {
    border-bottom: 2px solid ${(props: any) => props.theme.btnColor} !important;
  }
`;

const Input_components = ({
  type,
  label,
  formik,
  name,
}: {
  type: React.HTMLInputTypeAttribute;
  label: string;
  formik: any;
  name: string;
}) => {
  const theme = useThemeContext();
  return (
    <Div
      theme={theme || undefined}
      className="min-w-full flex flex-wrap justify-between my-2 items-center gap-2"
    >
      <TextField
        name={name}
        type={type}
        {...formik.getFieldProps(name)}
        id={name}
        fullWidth
        label={label}
        variant="filled"
        value={formik.values[name]}
        autoComplete={type === "password" ? "current-password" : ""}
        error={formik.errors[name] && formik.touched[name] ? true : false}
        helperText={
          formik.errors[name] && formik.touched[name] && formik.errors[name]
        }
      />
    </Div>
  );
};

export default Input_components;
