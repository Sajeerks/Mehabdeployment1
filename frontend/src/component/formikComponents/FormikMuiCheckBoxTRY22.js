import React from 'react'
import { Checkbox,FormControlLabel ,FormControl,FormGroup, FormLabel ,  } from '@mui/material'
import { useField, useFormikContext,ErrorMessage } from 'formik'
import TextError from '../TextError'

const resultArr =[]
const FormikMuiCheckBoxTRY22 = ({
    name,
    label,
    legend,
    optionsForCheckBox,
    ...otherProps

}) => {

    const [field,meta] = useField(name)
    const {setFieldValue} = useFormikContext()
  
    const handleChange =(e)=>{
        console.log(e)
        console.log(e.target.id)
        if(!resultArr.includes(e.target.id)){
            resultArr.push(e.target.id)
        }else{
            const index = resultArr.indexOf(e.target.id);
            resultArr.splice(index, 1);
        }
       
       
      
      setFieldValue(name,resultArr.toString())

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
        <FormGroup sx={{flexDirection:"row"}}>


{optionsForCheckBox.map((opt, ind)=>(
    <FormControlLabel key={ind}
    control={<Checkbox id={opt} onChange={handleChange}/>}
    label ={opt}
    />
))}
{/*              
             <FormControlLabel
             control={<Checkbox {...configCheckBox}/>}
             label ={label}
             /> */}
        </FormGroup>
    </FormControl>
    <ErrorMessage name={name} component={TextError} />
    </>
  )
}

export default FormikMuiCheckBoxTRY22