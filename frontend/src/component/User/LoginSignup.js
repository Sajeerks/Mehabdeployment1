import React, { Fragment, useEffect, useRef } from "react";
import "./LoginSignup.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
import profilePic from "../../images/Profile.png";
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, login,register } from "../../actions/userActions";
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader.js'

const LoginSignup = () => {
const dispatch = useDispatch()
 const alert = useAlert()
 const navigate = useNavigate()
 const location = useLocation()
 const {error, isAuthenticated, loading, user:realuser} = useSelector((state)=>state.user)


  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profilePic);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shitToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shitToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shitToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shitToLeft");
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log("Login form submitted");
    dispatch(login(loginEmail, loginPassword))
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("regiser signin form submitted");
    dispatch(register(myForm))
  };


  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
          // console.log("reader",reader.name)
          // console.log("e.target.files[0]",e.target.files[0].name)
          chooser.current.innerText = e.target.files[0].name;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
 
  const chooser = useRef(null);
  const desti = useRef(null);

  const activateFileinput = () => {
    // console.log(chooser.current.getAttribute("name"))

    // console.log(desti)
    desti.current.click();
  };
// const locationFromCart = 

  useEffect(() => {
    if(error){
      alert.error(error)
     navigate("/login")

      dispatch(clearErrors())
    }
   
 
    if(isAuthenticated && realuser){
      navigate("/account")
     }
    // console.log("location---outside login",location)
    
    if(location.state?.from && isAuthenticated){
      // console.log("location---login",location)

        navigate(location.state.from)
      
    }

  
    // console.log("location---login oputside",location)
 


  }, [navigate, error,isAuthenticated, alert,dispatch, location])
  




  return (
   <Fragment>
    {loading?(<Loader/>):( <Fragment>
      <div className="LoginSingupContainer">
        <div className="loginSignUpBox">
          <div>
            <div className="loginSignUpToggle">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link style={{display: "block"}} to="/password/forgot">Forgot Password </Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signupName">
              <FaceIcon />
              <input
                type="text"
                placeholder='"Name'
                required
                name="name"
                value={name}
                onChange={registerDataChange}
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
                onChange={registerDataChange}
              />
            </div>
            <div id="signupPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
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
                onChange={registerDataChange}
                // style={{display: "block"}}
              />
              <span
                ref={chooser}
                name="kk"
                className="filechooser"
                onClick={activateFileinput}
                // style={{display: "block"}}

              >
                {" "}
                Choose a file
              </span>
            </div>
            <input
              type="submit"
              value="Register"
              className="signupBtn"
              // disabled={loading?true:false}
            />
          </form>
        </div>
      </div>
    </Fragment>)}

   </Fragment>
  );
};

export default LoginSignup;
