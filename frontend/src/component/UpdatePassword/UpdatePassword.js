import "./UpdatePassword.css";
import React, { Fragment, useEffect, useRef } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyIcon from '@mui/icons-material/Key';
import {
  clearErrors,
  loadUser,
  updatePasswordsAction,
} from "../../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader.js";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata/Metadata";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userUpdater
  );

  const [oldPassword, setoldPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("confirmPassword", confirmPassword);
    myForm.set("newPassword", newPassword);

    console.log("update passord  form submitted");
    dispatch(updatePasswordsAction(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
      navigate("/login");
    }
    if (isUpdated) {
      alert.success("passwords udpated succesfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [navigate, isUpdated, error, alert, dispatch, user]);

  return <Fragment>
    {loading?(<Loader/>):( <Fragment>
        <Metadata title="Update Password"/>
    <div className="LoginSingupContainer">
        
        <div className="loginSignUpBox">
        <h3>UPDATE PASSWORD</h3>
           <form
            className="updatePasswordForm"
          
          
            onSubmit={updatePasswordSubmit}
            
          >
            <div className="signupName">
              <KeyIcon />
              <input
                type="password"
                placeholder='oldPassword'
                required
                name="oldPassword"
                value={oldPassword}
              onChange={e=>setoldPassword(e.target.value)}
              />
            </div>
            <div className="signupEmail">
            <EnhancedEncryptionIcon />

              <input
                type="password"
                placeholder="newPassword"
                required
                name="newPassword"
                value={newPassword}
                onChange={e=>setnewPassword(e.target.value)}

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
              value="Upadate password"
              className="signupBtn"
              disabled={loading?true:false}
            />
          </form>
        </div>
      </div>

    </Fragment>)}
  </Fragment>;
};

export default UpdatePassword;
