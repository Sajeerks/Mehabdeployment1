import React, { Fragment } from 'react'
import Metadata from '../layout/Metadata/Metadata'
import './OrderSuccess.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <Fragment>
        <Metadata title="Payment success"/>
           <div className='orderSuccess'>
            <CheckCircleIcon/>

            <Typography>Your Order has been placed successfully</Typography>
            <Link to="/myorders">Your Orders</Link>


           </div>


    </Fragment>
  )
}

export default OrderSuccess