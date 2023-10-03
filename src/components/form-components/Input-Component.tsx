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
  return (
    <div className="min-w-full flex flex-wrap justify-between my-2 items-center gap-2">
      <label
        className="max-w-[48%] capitalize font-semibold text-gray-200 text-start"
        htmlFor={name}
      >
        {label}
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <span className=" min-w-full md:min-w-fit h-fit max-w-[48%] rounded-lg bg-red-500 text-white capitalize animate-pulse drop-shadow-2xl px-3 py-2 text-[.7rem]">
          {formik.errors[name]}
        </span>
      )}
      <input
        {...formik.getFieldProps(name)}
        id={name}
        type={type}
        name={name}
        className=" outline-none   p-2   min-w-full min-h-[50px] rounded-lg drop-shadow-2xl text-white capitalize font-semibold backdrop-blur-md bg-gray-500  border-[1px] border-gray-300 autofill:bg-gray-500"
        value={formik.values[name]}
        autoComplete={type === "password" ? "current-password" : ""}
      />
    </div>
  );
};

export default Input_components;
