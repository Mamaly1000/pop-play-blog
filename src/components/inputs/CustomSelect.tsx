import { useThemeContext } from "@/context/ThemeContext";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

export type selectValueType = {
  text: string;
  value: string;
  bg: string | undefined;
  id: string | undefined;
};

const Div = styled.div`
  min-width: 100%;
  padding: 0;
  margin: 0;
  * {
    color: ${(props: any) => props.theme.header} !important;
  }
  .css-llrb4p-MuiInputBase-root-MuiFilledInput-root-MuiSelect-root::after {
    border-bottom: 2px solid ${(props: any) => props.theme.btnColor} !important;
  }
`;

const CustomSelect = ({
  label,
  values,
  setValue,
  formik,
  name,
}: {
  name: string;
  formik: any;
  label: string;
  values: selectValueType[];
  setValue: (val: selectValueType) => void;
}) => {
  const [text, setText] = useState("");
  const theme = useThemeContext();
  const handleChange = (event: SelectChangeEvent) => {
    setText(event.target.value);
  };
  const menuItems: selectValueType[] = [
    {
      text: "none",
      value: "",
      bg: theme?.mainBg,
      id: "",
    },
    ...values,
  ];

  return (
    <Div theme={theme || undefined}>
      <FormControl
        variant="filled" 
        error={formik.errors[name] && formik.touched[name] ? true : false}
        {...formik.getFieldProps(name)}
        fullWidth
      >
        <InputLabel
          style={{ textTransform: "capitalize" }}
          id="demo-simple-select-filled-label"
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={text}
          onChange={handleChange}
        >
          {menuItems.map((item) => {
            return (
              <MenuItem
                onClick={() => {
                  setValue(item);
                }}
                style={{
                  border: `1px solid ${theme?.btnColor}`,
                  background: item.bg,
                  color: theme?.header,
                  textTransform: "capitalize",
                }}
                value={item.value}
              >
                <em>{item.text}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Div>
  );
};

export default CustomSelect;
