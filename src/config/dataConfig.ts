import { StylesProps } from "react-select/dist/declarations/src/styles";

const select2Config = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "27px",
    height: "27px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    height: "27px",
    padding: "0 6px",
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state: any) => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    height: "27px",
  }),
};

export { select2Config };
