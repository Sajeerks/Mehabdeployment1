import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import { useField, useFormikContext } from 'formik'

const FormilMuiSelectTwo = ({
    name,
    selectOptions,
    ...otherProps
}) => {
  
     const {setFieldValue} = useFormikContext()
    const [field, meta] = useField(name)


    const handleChange =(e)=>{
      console.log("e int he muiformil select two", e);
    const {value} = e.target
    
    //  let valuetoBeRepersented = selectOptions[value]
    //  e.target.value =  valuetoBeRepersented
   setFieldValue(name, value)

    }

    const configSelect ={
        ...field,
        ...otherProps,
        select:true,
        variant:"outlined",
        fullWidth:true,
        onChange:handleChange

    }
    if(meta && meta.touched && meta.error){
        configSelect.error = true
        configSelect.helperText = meta.error
    }
  return (
        <>
          <TextField {...configSelect} >
            {Object.keys(selectOptions).map((item, pos)=>{
                return (
                    <MenuItem key={pos} value={selectOptions[item]}>
                        {selectOptions[item]}
                   
                    </MenuItem>
                )
            })}
          </TextField>
        
        </>


  )
}

export default FormilMuiSelectTwo