import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ErrorMessage, useField, useFormikContext } from 'formik'
import TextError from '../TextError';



const FormikMuiDateTwo = ({
    name,
    label,
    ...otherProps

}) => {
    const [value, setValue] = React.useState(null);

    const {setFieldValue} = useFormikContext(name)
    const [field, meta] = useField(name)
    // console.log({field, meta});


      const configDate ={
        ...otherProps,
        ...field,

      }

      if(meta && meta.touched && meta.error){
        configDate.error = true
        configDate.helperText = meta.error
      }

   

  return (
    <>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
    sx={{m:1}}
    {...configDate}
      label={label}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        setFieldValue(name,newValue)
      }}
      renderInput={(params) => <TextField {...params} helperText={(meta && meta.touched && meta.error)?meta.error:null}
      
     
      
      />}
    />
  </LocalizationProvider>
 <ErrorMessage name={name} component={TextError}/>
 {/* <ErrorMessage name={name}/> */}

  </>
  
  )
}

export default FormikMuiDateTwo