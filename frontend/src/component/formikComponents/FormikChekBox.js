import React from 'react'
import { ErrorMessage, Field } from "formik";
import TextError from "../TextError";

const FormikChekBox = (props) => {
    const { label, name, options, ...rest } = props;
  return (
    <div className="formController withRadioFormik">
    <label>{label}</label>
    <Field id={name} name={name} {...rest} as="checkbox">
      {({ field }) => {
        //   console.log("field in FormikChekBox ==",field)
        return options.map((option) => {
          return (
            <React.Fragment key={option.key}>
              <input
                type="checkbox"
                id={option.value}
                {...field}
                value={option.value}
                checked={field.value.includes(option.value)}
              />
              <label htmlFor={option.value}>{option.key}</label>
            </React.Fragment>
          );
        });
      }}
    </Field>
    <ErrorMessage name={name} component={TextError} />
  </div>
  )
}

export default FormikChekBox