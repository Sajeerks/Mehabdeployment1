import "./EditProduct2.css";
import {
  Formik,
  Form,
  Field,
  useFormik,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";

import React, { Fragment, useRef, useState } from "react";
import { Container } from "@mui/system";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextareaAutosize,
  OutlinedInput,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import TextError from "../TextError";

// import { string,object } from "yup";

const INITAIL_FORM_STATE = {
  name: "",
  description: "",
  price: "",
  images: [],
  category: "",
  stock: "",
  numOfReviews: "",
  reviews: [],
  createdAt: "",
  ratings: "",
};
const intialValuesForForm = {
  name: "sample name",
  description: "sample descpription",
  price: 555555,
  // category:"sample catefory",
  category: "",
  address: "sample address",
  social: {
    facebook: "sameple facebook",
    twitter: "sameple  twitter",
  },
  phoneNumbers: ["primaryPhoneNo", "secondaryPhoneNo"],
  companyNumber: [""],
  comments: "sample comments",
};

const savedDataForm = {
  name: "sajeer",
  description: "sajeer is a great man",

  price: 555555,
  address: "sajerer live son coci",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  companyNumber: [""],
  comments: "sajeers sexy comments",
};

const FORM_VALIDATION = Yup.object().shape({});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const EditProduct2 = () => {
  const categorySelect = useRef(null);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
      color: personName.indexOf(name) === -1 ? "red" : "blue",
    };
  }
  const handleChangeforSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    console.log("personName===" + personName);
  };

  //   const formik = useFormik({
  //   initialValues:{intialValuesForForm},

  // //    validate :values=>{
  // //     const errors = {};
  // //     if(values.name ==="kkk"){
  // //       errors.name ="kk is not valid name"
  // //     }
  // //     if(values.name ==="111"){
  // //       errors.name ="111 is not valid name"
  // //     }
  // //     return errors
  // //   }
  // // ,

  // onSubmit:(values) => {

  //   // values.category = personName.toString()
  //   // if(values.category === ""){
  //   //   categorySelect.current.style.backgroundColor = "red"
  //   //   categorySelect.current.value = "Please select a category for product"
  //   //   return
  //   // }

  //   console.log(values);
  //   // formikHelpers.resetForm();

  // },
  // validationSchema = Yup.object().shape({
  //   name:Yup.string().required("please enter a product name").min(2,"name too short"),
  //   description:Yup.string().required("please enter a product description").min(10,"name too short"),
  //   price:Yup.number().required("please enter a product price").positive("number must be greateer than zerp"),
  //   category:Yup.string().required("please enter a product category").min(5,"category too short"),

  // })
  //   })

  // console.log("formik   +", formik)

  const [formValues, setFormValues] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (values.name === "kkk") {
      errors.name = "kk is not valid name";
    }
    if (values.name === "111") {
      errors.name = "111 is not valid name";
    }
    console.log("values.phoneNumbers===", values.phoneNumbers);
    console.log("values.phoneNumbers[0]===", values.phoneNumbers[0]);

    if (values.phoneNumbers[0].length !== 3) {
      errors.phoneNumbers = "phoneNumbers lengtj is not equal to  3";
    }
    for (let index = 0; index < values.companyNumber.length; index++) {
      if (values.companyNumber[index].length !== 3) {
        errors.companyNumber = `companyNumber  is not equal to  3`;
      }
    }

    return errors;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("please enter a product name")
      .min(2, "name too short"),
    description: Yup.string()
      .required("please enter a product description")
      .min(10, "description too short"),
    price: Yup.number()
      .required("please enter a product price")
      .positive("number must be greateer than zerp"),
    address: Yup.string()
      .required("please enter a product address")
      .min(5, "address too short"),
    social: Yup.object().shape({
      facebook: Yup.number()
        .typeError("must be a number")
        .transform((value, originalValue) =>
          originalValue.toString().trim() === "" ? null : value
        )
        .nullable(true),
    }),
    phoneNumbers: Yup.array(),
    comments: Yup.string().required("please enter a product comments"),
    // 'phoneNumbers[0]':Yup.string().test('len', 'Must be exactly 3 characters', val =>val && val.toString().length === 3),
    // 'phoneNumbers[1]':Yup.number().test('len', 'Must be exactly 2 characters', val =>val && val.toString().length === 2),
  });

  return (
    <Fragment>
      <h1>edit profile sing formik and yup</h1>
      <div className="formikFomrMaster">
        <Container>
          <Formik
            initialValues={formValues || intialValuesForForm}
            validationSchema={validationSchema}
            onSubmit={(values, onSubmitProps) => {
              console.log({ onSubmitProps });
              console.log({ values });
              onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();
            }}
            validate={validate}
            // validateOnChange={false}
            // validateOnBlur={false}
            // validateOnMount
            enableReinitialize
          >
            {(formik) => {
              console.log("formik props ", formik);
              return (
                <Form>
                  <div className="FormControl">
                    <label htmlFor="name">name </label>

                    <Field
                      id="name"
                      type="text"
                      //  as={TextField}
                      name="name"
                      variant="outlined"
                      label="Product Name"
                      color="primary"
                      //  fullWidth
                      // errors={Boolean(errors.name) && Boolean(touched.name)}
                    ></Field>
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                  <div className="FormControl">
                    <label htmlFor="comments">comments </label>

                    <Field
                      id="comments"
                      type="text"
                      //  as={TextField}
                      name="comments"
                      variant="outlined"
                      label="Product Name"
                      color="primary"
                      //  fullWidth
                      // errors={Boolean(errors.name) && Boolean(touched.name)}
                    ></Field>
                    <ErrorMessage name="comments" component={TextError} />
                  </div>

                  <div className="FormControl">
                    <label htmlFor="description">description </label>

                    <Field
                      id="description"
                      type="text"
                      as="textarea"
                      name="description"
                      variant="outlined"
                      label="Product description"
                      color="primary"
                      //  fullWidth
                      style={{ width: "30vw" }}
                    ></Field>
                    {/* <ErrorMessage name="description" component={TextError} /> */}
                    <ErrorMessage name="description">
                      {(errorMsg) => (
                        <div className="errorMsggg">{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="FormControl">
                    <label htmlFor="address">address </label>

                    <FastField type="text" name="address">
                      {(props) => {
                        const { field, form, meta } = props;
                        // console.log("filed render");
                        // console.log("render props ", props);
                        return (
                          <div>
                            <input id="address" {...field} />
                            {meta.touched && meta.error ? (
                              <div className="errorMsggg">{meta.error}</div>
                            ) : null}
                          </div>
                        );
                      }}
                    </FastField>
                    {/* <ErrorMessage name="address" component={TextError} /> */}
                  </div>
                  <div className="FormControl">
                    <label htmlFor="facebook">facebook profile </label>

                    <Field
                      id="facebook"
                      type="text"
                      //  as={TextField}
                      name="social.facebook"
                      variant="outlined"
                      label="Product social.facebook"
                      color="primary"
                      //  fullWidth
                    ></Field>
                    <ErrorMessage
                      name="social.facebook"
                      component={TextError}
                    />
                  </div>
                  <div className="FormControl">
                    <label htmlFor="twitter">twitter profile </label>
                    <Field
                      id="twitter"
                      type="text"
                      //  as={TextField}
                      name="social.twitter"
                      variant="outlined"
                      label="Product social.twitter"
                      color="primary"
                      //  fullWidth
                    ></Field>
                    <ErrorMessage name="social.twitter" component={TextError} />
                  </div>

                  <div className="FormControl">
                    <label htmlFor="primaryPH">primary phone </label>
                    <Field
                      id="primaryPH"
                      type="text"
                      //  as={TextField}
                      name="phoneNumbers[0]"
                      variant="outlined"
                      label="Product social.twitter"
                      color="primary"
                      //  fullWidth
                    ></Field>
                    <ErrorMessage name="phoneNumbers" component={TextError} />
                  </div>

                  <div className="FormControl">
                    <label htmlFor="secondaryPH">secondary phone </label>
                    <Field
                      id="secondaryPH"
                      type="text"
                      //  as={TextField}
                      name="phoneNumbers[1]"
                      variant="outlined"
                      label="Product social.twitter"
                      color="primary"
                      //  fullWidth
                    ></Field>
                    <ErrorMessage name="phoneNumbers" component={TextError} />
                  </div>
                  <div className="FormControl">
                    <label htmlFor="companyNumber">
                      List of companyNumber{" "}
                    </label>
                    <FieldArray name="companyNumber">
                      {(fieldArrayProps) => {
                        // console.log({fieldArrayProps});
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        // console.log("form.errror--", form.errors)

                        const { companyNumber } = values;
                        return (
                          <div>
                            {companyNumber.map((singleCompanyNumber, index) => (
                              <div key={index}>
                                <Field name={`companyNumber[${index}]`} />
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
                    <ErrorMessage name="companyNumber" component={TextError} />
                  </div>

                  <button
                    type="button"
                    onClick={() => formik.validateField("comments")}
                  >
                    validate comments
                  </button>
                  <button type="button" onClick={() => formik.validateForm()}>
                    validate all
                  </button>

                  <button
                    type="button"
                    onClick={() => formik.setFieldTouched("comments")}
                  >
                    visit comments
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      formik.setTouched({
                        name: true,
                        description: true,

                        address: true,
                        social: {
                          facebook: true,
                          twitter: true,
                        },
                        phoneNumbers: true,
                        companyNumber: true,
                        comments: true,
                      })
                    }
                  >
                    visited fields
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormValues(savedDataForm)}
                  >
                    Load Saved Data
                  </button>
                  <button type="reset">RESET FORM</button>

                  <button
                    type="submit"
                    // variant="contained"
                    // color="primary"
                    // size="large"
                    // disabled={ !formik.isValid || !formik.dirty}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    EDIT PRODUCT
                  </button>
                </Form>
              );
            }}
          </Formik>

          {/* <Formik> */}
          {/* {({errors, isValid, touched, dirty, values,handleBlur, handleChange, validate}) => ( */}
          {/* <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="name"
                  type="text"
                  // as={TextField}
                  variant="outlined"
                  label="Product Name"
                  color="primary"
                  fullWidth
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText = {Boolean(formik.touched.name) &&formik.errors.name}
                   onChange ={formik.handleChange}
                   onBlur ={formik.handleBlur}
                   value = {formik.values.name}
                />
                <TextField
                  name="description"
                  type="text"
                 
                  variant="outlined"
                  label="Product description"
                  color="primary"
                  fullWidth
                  error={Boolean(formik.errors.description) && Boolean(formik.touched.description)}
                  helperText = {Boolean(formik.touched.description) &&formik.errors.description}
                  // onChange ={handleChange}
                  // onBlur ={handleBlur}
                            />
                  <TextField
                  name="category"
                  type="text"
                  // as={TextField}
                  variant="outlined"
                  label="Product category"
                  color="primary"
                  fullWidth
                  // disabled
                  // value ={personName}
                  error={Boolean(formik.errors.category) && Boolean(formik.touched.category)}
                  helperText = {Boolean(formik.touched.category) && formik.errors.category}
                  // onChange ={handleChange}
                  // onBlur ={handleBlur}
                            />
                            
    
 
                  <FormControl sx={{ m: 1, width: "50vw" }} >
                    <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                    <Select  ref={categorySelect}
                 
                    name ="categoryselect"
                    fullWidth
                    // as={Select}
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      
                      value={personName}
                      onChange={handleChangeforSelect}
                      input={<OutlinedInput label="Category" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      // error={Boolean(errors.category) && Boolean(touched.category)}
                      // helperText = {Boolean(touched.category) &&errors.category}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}    

                          
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

           



                <TextField
                  name="price"
                  type="number"
                  // as={TextField}
                  variant="outlined"
                  label="Product price"
                  color="primary"
                  fullWidth
                  error={Boolean(formik.errors.price) && Boolean(formik.touched.price)}
                  helperText = {Boolean(formik.touched.price) &&formik.errors.price}
                  // onChange ={handleChange}
                  // onBlur ={handleBlur}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!formik.dirty || !formik.isValid}
                >
                  EDIT PRODUCT
                </Button>
              </form> */}
          {/* )} */}
          {/* </Formik> */}
        </Container>
      </div>
    </Fragment>
  );
};

export default EditProduct2;
