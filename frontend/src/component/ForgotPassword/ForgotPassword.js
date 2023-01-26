import React, { Fragment, useEffect, useRef } from 'react'
import './ForgotPassword.css'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
import profilePic from "../../images/Profile.png";
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors,forgotPasswordAction,loadUser,updateUserAction } from "../../actions/userActions";
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader.js'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Metadata from '../layout/Metadata/Metadata';



const ForgotPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    // const { user} = useSelector((state)=>state.user)
    const {error, message, loading} = useSelector((state)=>state.forgotPassword)
    const [email, setEmail] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
     
        myForm.set("email", email);
   
    
        console.log("forgot password  form submitted");
        dispatch(forgotPasswordAction(myForm))
       
      };
    

    useEffect(() => {
   
        if(error){
          alert.error(error)
         
          dispatch(clearErrors())
          navigate("/login")
        }
        if(message){
            alert.success(message)
      

        }

    
    }, [navigate, error, alert,dispatch, message])
   
  return (
    <Fragment>
    {loading?(<Loader/>):(  <Fragment>
        <Metadata title="Forgot  Password"/>
    <div className="LoginSingupContainer">
        
        <div className="loginSignUpBox">
        <h3>Forgot  Password</h3>
           <form
            className="forgotPasswordForm"
          
         
            onSubmit={updatePasswordSubmit}
            
          >
       

            <div className="signupEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
             
              />
            </div>
            
         
            <input
              type="submit"
              value="forgot password"
              className="signupBtn"
              disabled={loading?true:false}
            />
          </form>
        </div>
      </div>

    </Fragment>)}
   </Fragment>

  )

  }
export default ForgotPassword