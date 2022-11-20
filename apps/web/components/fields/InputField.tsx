import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps & any) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor={field.name}>
        {props.label ? props.label : field.name}
      </InputLabel>
      <Input {...field} {...props} />
      {errorMessage && (
        <div style={{ marginTop: 5, color: "red" }}>{errorMessage}</div>
      )}
    </FormControl>
  );
};
