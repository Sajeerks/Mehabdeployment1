import React, { Fragment, useEffect, useRef } from 'react'
import './ResetPassword.css'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors,forgotPasswordAction,loadUser,resetPasswordAction,updateUserAction } from "../../actions/userActions";
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader.js'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Metadata from '../layout/Metadata/Metadata';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyIcon from '@mui/icons-material/Key';



const ResetPassword = () => {
    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {token} = useParams()
 const {loading, error , success} = useSelector(state=>state.forgotPassword)

  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("confirmPassword", confirmPassword);
    myForm.set("password", password);

    console.log("reset passord  form submitted");
    dispatch(resetPasswordAction(token, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
      navigate("/login");
    }
    if (success) {
      alert.success("passwords udpated succesfully");

      navigate("/login");
    //   dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [navigate, error, alert, dispatch,loading , success])


  return (
  
    <Fragment>
    {loading?(<Loader/>):(  <Fragment>
        <Metadata title="Reset  Password"/>
        <div className="LoginSingupContainer">
        
        <div className="loginSignUpBox">
        <h3>UPDATE PASSWORD</h3>
           <form
            className="resetpasswordForm"
          
          
            onSubmit={resetPasswordSubmit}
            
          >
            
            <div className="signupEmail">
            <EnhancedEncryptionIcon />

              <input
                type="password"
                placeholder="password"
                required
                name="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}

              />
            </div>
            <div className="signupEmail">
            <LockOpenIcon />

              <input
                type="password"
                placeholder="confirmPassword"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={e=>setconfirmPassword(e.target.value)}

              />
            </div>
            
            
            <input
              type="submit"
              value="reset password"
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

export default ResetPassword