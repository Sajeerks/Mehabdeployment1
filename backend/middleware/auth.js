const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");


exports.isAuthenticatedUser = catchAsyncErrors(async(req, res,next)=>{
    const {token} = req.cookies
    // console.log("req.cookies", req.cookies)
  //  console.log(token)
    if(!token){
        return next(new ErrorHandler("please login to access this message", 401))
    }
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //  console.log("decodedData",decodedData)

    req.user = await User.findById(decodedData.id);
    // console.log("req.user in authe js", req.user)
  next()

})
exports.authorizedRoles = (...roles)=>{

    return (req, res,next)=>{
        if(!roles.includes(req.user.role)){
            console.log("...roles asseed---", ...roles)
            // console.log("req.user", req.user)
            // console.log("req.user.role",req.user.role)
            // console.log("req.user.email",req.user.email)
            // console.log("req.user.kk",req.user.kk)


          return next(  new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource` ,403))
        }
        next()
    }

}
