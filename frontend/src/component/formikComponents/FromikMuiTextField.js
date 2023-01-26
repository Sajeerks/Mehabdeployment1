import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik'

const FromikMuiTextField = ({
    name,...otherProps
}) => {
  

    const[ field,meta ]= useField(name)
    // console.log({field,meta})

    const configTextField={
        ...field,
        ...otherProps,
        fullWidth:true,
        variant:"outlined"
    }
    if(meta && meta.touched && meta.error){
        configTextField.error = true
        configTextField.helperText = meta.error
    }

  return (
   <TextField {...configTextField}/>


  )
}

export default FromikMuiTextField