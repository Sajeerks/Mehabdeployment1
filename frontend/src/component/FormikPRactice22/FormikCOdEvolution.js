import React, { Fragment, useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import TextError from "../TextError";

const intialValues = {
  firstName: "sample firstName",
  lastName: "asmple last naem",
  age: "22",
  email: "ss@gmail.com",
  social: {
    facebook: "sampale faceboc",
    twitter: "sample twitter",
  },
  phoneNumbers: ["phoneNumbers[0]", "phoneNumbers[1]"],
  companyNumbers: [""],
};

const savedValues = {
  firstName: "savedValues firstName",
  lastName: "savedValues last naem",
  age: "22222",
  email: "savedValues@gmail.com",
  social: {
    facebook: "savedValues faceboc",
    twitter: "savedValues twitter",
  },
  phoneNumbers: ["phoneNumbers[0]", "phoneNumbers[1]"],
  companyNumbers: [""],
};

const validationSchema2 = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  age: Yup.number().required("required"),
  email: Yup.string().email().required("required email"),
  social: Yup.object({
    facebook: Yup.string().required("required"),
    twitter: Yup.string().required("required"),
  }),
  phoneNumbers: Yup.array().of(Yup.number().required("rquired phoen umebrs")),
});
const validatorForValues = (values) => {
  let errors = {};
  if (values.firstName === "111") {
    errors.firstName = "111  shall not be a fist name";
  }
  return errors;
};
const FormikCOdEvolution = () => {
  const [formValues, setformValues] = useState(null)
  return (
    <Fragment>
      <Formik
        // validateOnMount={true}
        enableReinitialize={true}
        initialValues={formValues || intialValues}
        validationSchema={validationSchema2}
        onSubmit={(values, onSubmitProps) => {
          console.log("value in FormikMaterilUIFormPractice==", values);
          console.log("onSubmitProps in the on su bmit ", onSubmitProps);
          onSubmitProps.setSubmitting(false); // for set submitting to false
          onSubmitProps.resetForm();
        }}
        validate={validatorForValues}
      >
        {(formik) => {
          console.log("formik in the JSc ", formik);
          return (
            <Form>
              <div>
                <label htmlFor="firstName">firstName</label>
                <Field type="text" name="firstName" id="firstName" />
                <ErrorMessage name="firstName" component={TextError} />
              </div>
              <div>
                <label htmlFor="lastName">lastName</label>

                <Field type="text" name="lastName" id="lastName" />
                <ErrorMessage name="lastName" component={TextError} />
              </div>
              <div>
                <label htmlFor="age">age</label>

                <Field type="number" name="age" id="age" />
                <ErrorMessage name="age" component={TextError} />
              </div>
              <div>
                <label htmlFor="email">email</label>

                <Field type="email" name="email" id="email" />
                <ErrorMessage name="email">
                  {(errorMessageRenderChild) => (
                    <div className="errorForFromCreated">
                      {errorMessageRenderChild}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="lastName">facebook</label>

                <Field type="text" name="social.facebook" id="facebook" />
                <ErrorMessage name="social.facebook" component={TextError} />
              </div>
              <div>
                <label htmlFor="twitter">twitter</label>

                <Field type="text" name="social.twitter" id="facebook" />
                <ErrorMessage name="social.twitter" component={TextError} />
              </div>

              <div>
                <label htmlFor="landline">landline</label>

                <Field type="number" name="phoneNumbers[0]" id="landline" />
                <ErrorMessage name="phoneNumbers" component={TextError} />
              </div>
              <div>
                <label htmlFor="mobilephone">mobile phone</label>

                <Field type="number" name="phoneNumbers[1]" id="mobilephone" />
                <ErrorMessage name="phoneNumbers" component={TextError} />
              </div>

              <div>
                <label htmlFor="companyNumbers">companyNumbers phone</label>

                <FieldArray name="companyNumbers">
                  {(fieldArrayProps) => {
                    // console.log("Filed array piros--", fieldArrayProps);
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    // console.log("values==",values)

                    const { companyNumbers } = values;
                    // console.log("companyNumbers==",companyNumbers)
                    return (
                      <div>
                        {companyNumbers.map((singleCompanyNumber, index) => (
                          <div key={index}>
                            <Field name={`companyNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}

                            <button type="button" onClick={() => push("")}>
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <ErrorMessage name="companyNumbers" component={TextError} />
              </div>

              <button
                type="button"
                onClick={() => formik.validateField("phoneNumbers")}
              >
                validate phone numbers
              </button>
              <button type="button" onClick={() => formik.validateForm()}>
                validate ALL
              </button>

              <button
                type="button"
                onClick={() => formik.setFieldTouched("phoneNumbers")}
              >
                touch phone numbers
              </button>
              <button
                type="button"
                onClick={() =>
                  formik.setTouched({
                    firstName: true,
                    lastName: true,
                    age: true,
                    email: true,
                    social: {
                      facebook: true,
                      twitter: true,
                    },
                    phoneNumbers: true,
                    companyNumbers: true,
                  })
                }
              >
                Touch ALL
              </button>
              <button type="reset" >reset ALL</button>

              <button type="button" onClick={()=>{setformValues(savedValues)}}>Load saved values</button>

              <Button
                // disabled={!(formik.isValid && formik.dirty)  }
                disabled={!formik.isValid && !formik.isSubmitting}
                variant="outlined"
                sx={{ backgroundColor: "lightgreen" }}
                type="submit"
              >
                SuBmit{" "}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default FormikCOdEvolution;
