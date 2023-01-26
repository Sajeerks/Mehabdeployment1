import { Button, Checkbox, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikMUITextTwo from "./FormikMUITextTwo";
import FormilMuiSelectTwo from "./FormilMuiSelectTwo";
import optionsFORSelect from "./CountriesListAloneer.json";
import FormikMuiDateTwo from "./FormikMuiDateTwo";
import FormilMuiCheckBoxTwo from "./FormilMuiCheckBoxTwo";
import FormikMuiRadioTwo from "./FormikMuiRadioTwo";

const theme1 = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

const selectOptionser = optionsFORSelect;
const intialFOrmvalues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  ArriveDay: "",
  DepartureDay: "",
  MESSAGE: "",
  RELATIVES: "",
  SEX: "",
};
const validationSchemaForFOrm = Yup.object().shape({
  firstName: Yup.string().required("requiredd firstname"),
  lastName: Yup.string().required("requiredd lastName"),
  email: Yup.string().email().required("requiredd email"),
  phone: Yup.number()
    .integer()
    .typeError("phone number must be an integer")
    .required("requiredd email"),

  addressLine1: Yup.string().required("requiredd addressLine1"),
  addressLine2: Yup.string(),
  city: Yup.string().required("requiredd city"),
  state: Yup.string().required("requiredd state"),
  country: Yup.string().required("requiredd country"),
  ArriveDay: Yup.date().required("required arrival date"),
  DepartureDay: Yup.date().required("required departure date"),
  MESSAGE: Yup.string(),
  RELATIVES: Yup.array().required("requiredd RELATIVES"),
  SEX: Yup.string().required("requiredd SEX"),
});
const onSubmitter = (values) => {
  console.log("values form FormikMuiMainFIleTwo == ", values);
};

const validatorsss = (values) => {
  let errors = {};

  if (values.RELATIVES.length === 0) {
    errors.RELATIVES = "please select at least one relative to accompany you";
  }

  return errors;
};
const checkBOxOptionsER = [
  "father",
  "mother",
  "son",
  "daughter in law",
  "son in law",
  "sister",
  "brother",
];
const radioOptionseERR = [
  "male",
  "female",
  "transmale",
  "transFemale",
  "other",
  "enuch",
];
const FormikMuiMainFIleTwo = () => {
  return (
    <ThemeProvider theme={theme1}>
      <Grid container>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            {" "}
            Product form to edit{" "}
          </Typography>
        </Grid>
        <Container maxWidth="md">
          <Formik
            initialValues={intialFOrmvalues}
            validationSchema={validationSchemaForFOrm}
            onSubmit={onSubmitter}
            validate={validatorsss}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography> your Details</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUITextTwo name="firstName" label="FIRST NAME" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUITextTwo name="lastName" label="LAST NAME" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUITextTwo name="email" label="EMAIL" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUITextTwo name="phone" label="PHONE NUMBER" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography> Address</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikMUITextTwo
                        name="addressLine1"
                        label="Address line 1"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikMUITextTwo
                        name="addressLine2"
                        label="Address line 2"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUITextTwo name="city" label="CITY" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMUITextTwo name="state" label="STATE" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormilMuiSelectTwo
                        name="country"
                        selectOptions={selectOptionser}
                        label="COUNTRY"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography> Booking Info</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMuiDateTwo name="ArriveDay" label="DAY ARRIVED" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikMuiDateTwo
                        name="DepartureDay"
                        label="DAY DEPARTURE"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormikMUITextTwo
                        name="MESSAGE"
                        label="MESSAGE"
                        multiline={true}
                        rows={5}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormilMuiCheckBoxTwo
                        name="RELATIVES"
                        label="RELATIVES"
                        checkBOxOptions={checkBOxOptionsER}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikMuiRadioTwo
                        name="SEX"
                        label="SEX"
                        radioOptions={radioOptionseERR}
                      />
                    </Grid>



                    
                  </Grid>

                  <Button
                    sx={{ mt: 2, mb: 2 }}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submittr
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default FormikMuiMainFIleTwo;
