import React from 'react'
import { Checkbox,FormControlLabel ,FormControl,FormGroup, FormLabel ,  } from '@mui/material'
import { useField, useFormikContext,ErrorMessage } from 'formik'
import TextError from '../TextError'

const FormikUICheckBox = ({
    name,
    label,
    legend,
    ...otherProps
}) => {
   
  const [field,meta] = useField(name)
  const {setFieldValue} = useFormikContext()
  const handleChange =(e)=>{
    const {checked} = e.target
    setFieldValue(name,checked)
  }
    const configCheckBox ={
        ...field,
        ...otherProps,
        onChange:handleChange
    }
    const configFormControl ={}
    if(meta && meta.touched && meta.error){
        configFormControl.error = true
    }

    
  return (
    <>
    <FormControl {...configFormControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
             <FormControlLabel
             control={<Checkbox {...configCheckBox}/>}
             label ={label}
             />
        </FormGroup>
    </FormControl>
    <ErrorMessage name={name} component={TextError} />
    </>
    
  )
}

export default FormikUICheckBox