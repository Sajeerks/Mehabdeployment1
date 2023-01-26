import React from 'react'
import { MenuItem, TextField, } from '@mui/material'
import {useField, useFormikContext} from 'formik'

const FomikMuiSelect = ({
    name,
    options,
    ...otherProps
}) => {
//   console.log("options--",options)
   const {setFieldValue} = useFormikContext()
   const [field,meta] = useField(name)

    const handleChange =evt=>{
      const {value}= evt.target
      setFieldValue(name, value)
    }
    const configSelect ={
        ...field,
        ...otherProps,
        select:true,
        variant :"outlined",
        fullWidth:true,
        onChange:handleChange

    }

    if(meta && meta.touched && meta.error){
        configSelect.error = true
        configSelect.helperText= meta.error
    }



  return (


    <TextField {...configSelect}>
        {
            Object.keys(options).map((item, pos)=>{
                return <MenuItem key={pos} value={item}>
                {options[item]}
                </MenuItem>
            })
        }

    </TextField>
    
  )
}

export default FomikMuiSelect