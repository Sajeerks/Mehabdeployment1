import React from "react";
import { useField, useFormikContext } from "formik";
import { Box, Checkbox } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from '@mui/material/FormHelperText';

const FormikMuiRadioTwo = ({ name, label, radioOptions, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const handleChangeer = (e) => {
    setFieldValue(name, e.target.value);
  };
   
  const configRadio = {
    ...otherProps,
    ...field,

  }
  if(meta&&meta.touched&& meta.error){
    configRadio.error= true
    configRadio.helperText = meta.error
  }
  

  return (
    <Box>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="female"
          name="radio-buttons-group"
        >
          {radioOptions.map((singleOpt, index) => {
            return (
              <FormControlLabel
                onChange={handleChangeer}
                key={index}
                value={singleOpt}
                control={<Radio />}
                label={singleOpt}
              />
            );
          })}
        </RadioGroup>
        <FormHelperText sx={{color:"red",fontWeight:800}}>{(meta&&meta.touched&& meta.error)?meta.error:null}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default FormikMuiRadioTwo;
