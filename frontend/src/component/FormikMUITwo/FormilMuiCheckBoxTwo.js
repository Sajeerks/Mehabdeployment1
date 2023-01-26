import React from 'react'
import { useField, useFormikContext } from 'formik'
import { Box, Checkbox } from '@mui/material'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';



let resultArr = []
const FormilMuiCheckBoxTwo = ({
    name,
    checkBOxOptions,
    ...otherProps

}) => {
  
    const [field, meta] =useField(name)

    const {setFieldValue} = useFormikContext()
   const configCheclBox ={
    ...otherProps,
    ...field

   }
   console.log({field, meta});
   const handleChange=(e)=>{
    console.log(e.target)
    
    
    console.log("e.target.value++"+e.target.value)
   
    if(!resultArr.includes(e.target.value) ){
        resultArr.push(e.target.value)
    }else{
        let indexPos = resultArr.indexOf(e.target.value)
        resultArr.splice(indexPos,1)
    }
    setFieldValue(name,resultArr)

   }

    if(meta && meta.touched && meta.error){
        configCheclBox.error = true
        configCheclBox.helperText = meta.error
    }

  return (
   <Box sx={{ flexDirection: 'row' , maxWidth:'auto',display:"flex",flexWrap:"wrap" ,
  
   
   }} >
  <FormControl sx={{ m: 3  }} component="fieldset" variant="standard" >
        <FormLabel component="legend">Relavitive accompnay</FormLabel>
        <FormGroup sx={{flexDirection: 'row'}}>

        {
            checkBOxOptions.map((singleOpt, index)=>{
                return (
           <FormControlLabel key={index}
            control={
              <Checkbox    onChange={handleChange} name={singleOpt}  value={singleOpt}/>
            }
            label={singleOpt}
          />
                )
            })

        }
          
       
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
        <FormHelperText sx={{color:"red"}}>{(meta && meta.touched && meta.error)?meta.error:null}</FormHelperText>

      </FormControl>

   </Box>


  
  )
}

export default FormilMuiCheckBoxTwo