import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ErrorMessage, useField, useFormikContext } from 'formik'
import TextError from '../TextError';
import { useEffect } from 'react';




const MuiDatePickerEdit = ({
    name,
    label,
    givenValue,
    ...otherProps
  

}) => {
    const [value, setValue] = React.useState(null);

    const {setFieldValue} = useFormikContext(name)
    const [field, meta] = useField(name)
    // console.log({field, meta});
    // console.log({givenValue});
      // setValue(givenValue)
   


      const configDate ={
        ...otherProps,
        ...field,

      }

      if(meta && meta.touched && meta.error){
        configDate.error = true
        configDate.helperText = meta.error
      }


    //   console.log(meta.error)
    //   console.log(meta.touched)

    useEffect(() => {
      givenValue&& setValue(givenValue)
    
      return () => { }
    }, [givenValue])
    

  return (
<>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
    sx={{m:1}}
    {...configDate}
      label={label}
      value={value}
      inputFormat="DD-MM-YYYY"
      mask="__-__-____"
      onChange={(newValue) => {
        setValue(newValue);
        setFieldValue(name,newValue)
        
      }}
      renderInput={(params) => <TextField {...params} 
      helperText={(meta && meta.touched && meta.error)?meta.error:null}
    //   helperText={(meta && meta.error)?meta.error:null}

    //   helperText={meta.error}

      
     
      
      />}
    />
  </LocalizationProvider>
 <ErrorMessage name={name} component={TextError}/>

  </>
  )
}

export default MuiDatePickerEdit