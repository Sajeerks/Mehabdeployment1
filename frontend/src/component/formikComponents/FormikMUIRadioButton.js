import React, { useState } from 'react'
import {useField, useFormikContext,ErrorMessage} from 'formik'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextError from '../TextError';

const FormikMUIRadioButton = ({
    name,
    label,
    radioOptions,
    ...otherProps
}) => {
    // const [value, setvalue] = useState("female")
    const [value, setvalue] = useState(null)


    const [field,meta] = useField(name)
    const {setFieldValue} = useFormikContext()
    const handleChange =(e)=>{
        console.log({field})
       console.log("event=",e)
       console.log("value",value);
  
    
    
        setFieldValue(name,e.target.value)
        // setFieldValue(name,checked)
        setvalue(e.target.value)
      }
    
  
    const configRadio ={
       
        ...field,
        ...otherProps,
       
    }

    const configFormControl ={}
    if(meta && meta.touched && meta.error){
        configFormControl.error = true
    }

  return (
    <>
    <FormControl {...configFormControl}>
    <FormLabel id="demo-radio-buttons-group-label">{name}</FormLabel>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
    //   defaultValue="female"
    value={value}
      sx={{flexDirection:"row"}}
      onChange={handleChange}
    >

        {
            radioOptions.map((option, pos)=>(
                 
                   <FormControlLabel  key={pos} value={option} control={<Radio />} label={option} />
                )
            )
        }
      {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio/>} label="Male" />
      <FormControlLabel value="other" control={<Radio  />} label="Other" /> */}
    </RadioGroup>
  </FormControl>
  <ErrorMessage name={name} component={TextError} />
  </>
  )
}

export default FormikMUIRadioButton