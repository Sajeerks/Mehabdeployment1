import { TextField } from '@mui/material'
import React from 'react'
import { useField } from 'formik'


const MuitextInputEditProduct = ({
    name, 
    ...otherProps
}) => {
    const [field, meta]= useField(name)
    const configTextField={
        ...field,
        fullWidth:true,
        variant:"outlined",
        ...otherProps
    }

    if(meta && meta.touched && meta.error){
        configTextField.error =true
        configTextField.helperText =meta.error

    }

  return (
    <>

      <TextField {...configTextField}/>
      </>
  )
}

export default MuitextInputEditProduct