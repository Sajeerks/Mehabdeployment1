import React from 'react'
import { Field, ErrorMessage, } from 'formik'
import TextError from '../TextError'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const FormikCodeEvolutionDatepicker = (props) => {
    const {name, label , selectOptions,...otherProps} = props
    // console.log("props on FormikCOdEevolutionInput==",props);
    const [value, setValue] = React.useState(null);
  return (
    <>
       <label  htmlFor={name}>{label}</label>
  <Field name={name} id={name} {...otherProps} >

    {({form, field})=>{
        console.log({form, field})
        const { setFieldValue } = form;
        return (
            <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setFieldValue(name,newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </>
            // <>
            // HI THEREWR
            // </>
        )
    }

    }
        
        </Field>
    <ErrorMessage name={name} component={TextError}/>
   </>
  )
}

export default FormikCodeEvolutionDatepicker