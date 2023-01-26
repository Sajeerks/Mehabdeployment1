import React, { Fragment } from 'react'
import './CheckoutSteps.css'
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {
          label: <Typography>Shipping Details</Typography>,
          icon: <LocalShippingIcon />,
        },
        {
          label: <Typography>Confirm Order</Typography>,
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: <Typography>Payment</Typography>,
          icon: <AccountBalanceIcon />,
        },
      ];
      const stepStyles = {
        boxSizing: "border-box",
        width:"80vw",
    
      };
  return (
    <Fragment>
      <Stepper activeStep={activeStep} style={stepStyles} 
   
      >
        {steps.map((item, index)=>(
            <Step key={index}
            active={activeStep === index?true:false}
            completed={activeStep >= index?true:false}
            >
                  <StepLabel 
                   style={{color:activeStep>=index?"tomato":"rgba(0,0,0,.64)"}}
                  icon={item.icon}>{item.label}</StepLabel>
            </Step>
        ))}

      </Stepper>

    </Fragment>
  )
}

export default CheckoutSteps