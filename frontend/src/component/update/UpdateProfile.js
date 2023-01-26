import React, { Fragment, useEffect, useRef } from 'react'
import './UpdateProfile.css'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
import profilePic from "../../images/Profile.png";
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors,loadUser,updateUserAction } from "../../actions/userActions";
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader.js'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Metadata from '../layout/Metadata/Metadata';



const UpdateProfile = () => {
    const dispatch = useDispatch()
 const alert = useAlert()
 const navigate = useNavigate()
 const { user} = useSelector((state)=>state.user)
 const {error, isUpdated, loading} = useSelector((state)=>state.userUpdater)



 const [name, setName] = useState("");
 const [email, setEmail] = useState("");

  
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profilePic);

  const chooser = useRef(null);
  const desti = useRef(null);


 const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    // myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("regiser signin form submitted");
    dispatch(updateUserAction(myForm))
  };

  const UpadateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
          // console.log("reader",reader.name)
          // console.log("e.target.files[0]",e.target.files[0].name)
         
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } 
  };


 
  const activateFileinput = () => {
    // console.log(chooser.current.getAttribute("name"))

    // console.log(desti)
    desti.current.click();
  };



  useEffect(() => {
    if(user){
        setName(user.name)
        setEmail(user.email)
        setAvatarPreview(user.avatar.url)
    }
    if(error){
      alert.error(error)
     
     

      dispatch(clearErrors())
      navigate("/login")
    }
if(isUpdated){
    alert.success("profile udpated succesfully")
    dispatch(loadUser())
    navigate("/account")
    dispatch({type:UPDATE_PROFILE_RESET})

}

  }, [navigate,isUpdated, error, alert,dispatch, user])
  

  return (
   <Fragment>
    {loading?(<Loader/>):(  <Fragment>
        <Metadata title="Update Profile"/>
    <div className="LoginSingupContainer">
        
        <div className="loginSignUpBox">
        <h3>UPDATE PROFILE</h3>
           <form
            className="UpdateProfileForm"
          
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
            
          >
            <div className="signupName">
              <FaceIcon />
              <input
                type="text"
                placeholder='"Name'
                required
                name="name"
                value={name}
              onChange={e=>setName(e.target.value)}
              />
            </div>
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
            
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              {/* <label htmlFor="avatar"  className="ipan">choose pic</label> */}
              <input
                ref={desti}
                className="fileInput"
                type="file"
                name="avatar"
                accept="images/*"
                onChange={UpadateDataChange}
              />
              <span
                ref={chooser}
                name="kk"
                className="filechooser"
                onClick={activateFileinput}
              >
                {" "}
                Choose a file
              </span>
     
            </div>
            <input
              type="submit"
              value="Upadate"
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

export default UpdateProfile