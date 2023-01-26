import React from 'react'

import { ErrorMessage, useField, useFormikContext } from 'formik'
import TextError from '../TextError';
import { Button } from '@mui/material';



const MuiFileUploaderButton = ({
  name,
  label,
  ...otherProps
}) => {
  const [value, setValue] = React.useState(null);

  const {setFieldValue} = useFormikContext(name)
  const [field, meta] = useField(name)

  
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
    
   <input hidden accept="image/*" multiple type="file" name={name} {...configDate}/>
    
    
    
    </>
  )
}

export default MuiFileUploaderButton