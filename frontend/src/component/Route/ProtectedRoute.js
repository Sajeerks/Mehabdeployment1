import React, { Fragment } from 'react'
import { Navigate , Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from '../Loader/Loader';

const ProtectedRoute = ({ children,...rest}) => {
  // const {user} = useSelector(state=>state.user)
 
if(rest.loading){
return <Loader/>

}else{
 
  if (rest.isAuthenticated===false) {
    return <Navigate to="/login"  />;
  }else{
    // console.log("rest.isAdmin==", rest.isAdmin)

    if(rest.isAdmin === true && rest.user.role!=="admin"){
      console.log("rest.isAdmin==", rest.isAdmin)
      return <Navigate to="/login"  />;
    }
    return children?children:<Outlet/>;
  }



}


  
    


  


 
    
}

export default ProtectedRoute