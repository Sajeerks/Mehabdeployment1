import { Button } from '@mui/material'
import React from 'react'
import { useFormikContext } from 'formik'

const FormikMuiButton = ({
    children,
    ...otherProps
}) => {
    const {submitForm} = useFormikContext()
    const handleSubmit =()=>{
        submitForm()
    }

    const config={
        onClick:handleSubmit,
        variant:"container",
        // color:"primary",
    
        fullWidth:true,
    }
  return (
    <Button {...config} sx={{backgroundColor:"red",  '&:hover': { backgroundColor: 'green' },}}>
    {children}
    </Button>
  )
}

export default FormikMuiButton