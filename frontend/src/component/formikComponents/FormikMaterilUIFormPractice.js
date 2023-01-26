import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as Yup from "yup";

import { Formik, Form } from "formik";
import { green, lightBlue, orange, red, yellow } from "@mui/material/colors";
import {
  Button,
  Paper,
  Typography,
  CssBaseline,
  Grid,
  Container,
} from "@mui/material";
import FromikMuiTextField from "./FromikMuiTextField";
import FomikMuiSelect from "./FomikMuiSelect";
import countries from "./countriesAlone.json";
import FormikMUIDATETimePicker from "./FormikMUIDATETimePicker";
import FormikUICheckBox from "./FormikUICheckBox";
import FormikMuiButton from "./FormikMuiButton";
import FormikMUIRadioButton from "./FormikMUIRadioButton";
import FormikMuiCheckBoxTRY22 from "./FormikMuiCheckBoxTRY22";

const FormikMaterilUIFormPractice = () => {
  // console.log("countries==",countries);
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: lightBlue[500],
      },

      colorRizer: {
        ddark: green[800],
        dmed: red[500],
        dlight: red[100],
      },
    },
  });

  const IntialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    arrivalDate: "",
    departureDate: "",
    message: "",
    termsOfService:false,
    gender:"",
    familyMembers:"",

  };
  const valdiationSchema = Yup.object().shape({
    firstName: Yup.string().required("required "),
    lastName: Yup.string().required("required "),
    email: Yup.string().email("invalid email").required("required "),
    phone: Yup.number()
      .integer()
      .typeError("please enter a valid phone number")
      .required("rquiredd"),
    addressLine1: Yup.string().required("required "),
    addressLine2: Yup.string(),
    city: Yup.string().required("required "),
    state: Yup.string().required("required "),
    country: Yup.string().required("required "),
    arrivalDate: Yup.date().required("required"),
    departureDate: Yup.date().required("required"),
    message: Yup.string(),
    termsOfService:Yup.boolean().oneOf([true],"terms must be accepted").required("terms must be required"),
    gender:Yup.string().required("reuired"),
    familyMembers:Yup.string().required("reuired"),
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} align="center" justifyContent="center">
          <Typography variant="h3"> Edit form for products</Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div className="formClassForEDitFormMUi">
              <Formik
                initialValues={IntialFormState}
                validationSchema={valdiationSchema}
                onSubmit={(values) => {
                  console.log("value in FormikMaterilUIFormPractice==", values);
                }}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>your details</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FromikMuiTextField name="firstName" label="First Name" />
                    </Grid>
                    <Grid item xs={6}>
                      <FromikMuiTextField name="lastName" label="Last Name" />
                    </Grid>

                    <Grid item xs={12}>
                      <FromikMuiTextField name="email" label="EMAIL" />
                    </Grid>
                    <Grid item xs={12}>
                      <FromikMuiTextField name="phone" label="PHONE" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Address</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FromikMuiTextField
                        name="addressLine1"
                        label="addressLine 1"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FromikMuiTextField
                        name="addressLine2"
                        label="addressLine 2"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FromikMuiTextField name="city" label="City" />
                    </Grid>
                    <Grid item xs={6}>
                      <FromikMuiTextField name="state" label="State" />
                    </Grid>
                    <Grid item xs={12} name="country">
                      <FomikMuiSelect
                        name="country"
                        label="Country"
                        options={countries}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Booking information</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUIDATETimePicker
                        name="arrivalDate"
                        label="Arrival Date"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUIDATETimePicker
                        name="departureDate"
                        label="Departure Date"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FromikMuiTextField
                        name="message"
                        label="Message"
                        multiline={true}
                        row={10}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikUICheckBox 
                      name="termsOfService"
                      legend="Terms of service"
                      label=" I Agree to terms "
                      />

                    </Grid>

                    <Grid item xs={12} >
                    <FormikMUIRadioButton
                     label="GENder"
                     name="gender"
                     radioOptions={["male","female","non binary", "transgender male", "trans female", "other"]}
                    >
                     

                    </FormikMUIRadioButton>

                    </Grid>

                    <Grid item xs={12} >
                       <FormikMuiCheckBoxTRY22
                       name="familyMembers"
                       legend="familyMembers"
                       label="familyMembers coming "
                       optionsForCheckBox={["son", "daughter", "son in law", "daughter in law", "father", "mother", "wife", ]}
                       >

                       </FormikMuiCheckBoxTRY22>
                       </Grid>
                     <Grid item xs={12}>
                      <FormikMuiButton   sx={{bgcolor: 'colorRizer.dmed',}}  >
                        submitButton
                      </FormikMuiButton>
                      
                     </Grid>


                  </Grid>


                </Form>
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>

      {/* <Typography variant='h3'>theming  example</Typography>
        <Typography color="primary" sx={{color:"colorRizer.ddark",fontWeight:"900"}}>hello codesanbox</Typography>
        <h3>Start addint ot see the magic happens</h3>
        <Button variant='contained' color="primary" > Hi there</Button>

     */}
    </ThemeProvider>
  );
};

export default FormikMaterilUIFormPractice;
