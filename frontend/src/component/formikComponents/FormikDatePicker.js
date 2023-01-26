import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../TextError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MUiDatepicker } from '@mui/x-date-pickers/DatePicker';


const FormikDatePicker = (props) => {
  const { label, name, ...rest } = props;


  const [value, setValue] = React.useState(null);

  return (
    <div className="formController ">

{/* 
<LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUiDatepicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}


      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest} >
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => {setFieldValue(name, val)
                
              }}
            />

           
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
      {/* <input type="date"/>
      <input type="time"/>
      <input type="color"/> */}


    </div>
  );
};

export default FormikDatePicker;
