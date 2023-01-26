import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const FormikRegistrationFrom = () => {
  const options = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const intialValue = {
    email: "",
    password: "",
    confirmPassword: "",
    modeOfContact: "",
    phone: "",
  };
  const vaidationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("requiired password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    modeOfContact: Yup.string().required("requiired "),
    phone: Yup.string().when("modeOfContact", {
      is: "telephonemoc",
      then: Yup.string().required("rquireed phone number"),
    }),
  });
  const onSubmit = (values) => {
    console.log("values forom  FormikLoginForm", values);
  };
  return (
    <Formik
      initialValues={intialValue}
      validationSchema={vaidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log("formik---", formik);
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="EMAIL"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="password"
              name="password"
            />
              <FormikControl
              control="input"
              type="password"
              label="confirmPassword"
              name="confirmPassword"
            />
                 <FormikControl
              control="radio"
              type="text"
              label="modeOfContact"
              name="modeOfContact"
              options={options}
            />
               <FormikControl
              control="input"
              type="text"
              label="Phone Number"
              name="phone"
          
            />

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikRegistrationFrom;
