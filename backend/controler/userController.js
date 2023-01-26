const Product = require("../models/productModel");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatar",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  // console.log("req.body in register--" , req.body)
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // const token = user.getJWTtoken();

  sendToken(user, 201, res);
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // if user given email and password
  if (!email || !password) {
    return next(new ErrorHander("please enter Email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander(" invalid Email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  //   console.log("password",password)
  if (!isPasswordMatched) {
    return next(new ErrorHander("please enter Email and password", 401));
  }
  const token = user.getJWTtoken();

  // res.status(200).json({
  //   success: true,
  //   user,
  //   token,
  // });

  sendToken(user, 201, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

///forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }
  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


  const message = `Your password reset token is:-- /n/n ${resetPasswordUrl} \n\n if you have not requested this email 
then please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `email send to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //create token hash and search database
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    console.log("now userrrrrrrrrrrrrrrrrr error reset password------")
    return next(
      new ErrorHander("Reset password token  is invald or expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("passwords does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//get single user details
exports.getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  //   console.log("password",password)
  if (!isPasswordMatched) {
    return next(new ErrorHander("please enter correct old password", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("passwords does not match", 400));
  }
  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

//update User profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  // console.log("Avatar",req.body.avatar)


  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  
  // console.log("newUserData--- outside=",newUserData)

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar= {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,}
  
  console.log("newUserData--- ijisne=",newUserData)
  }

   
  // console.log("new user data  in update user ==", newUserData);

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// all users data (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// all single user data (admin)
exports.getSingleUserAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHander(`user does not exists with id :${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update User role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(
      new ErrorHander(`user does not exists with id :${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  // we will add remove clodinary later
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`user does not exists with id :${req.params.id}`, 400)
    );
  }

  await user.remove();
  res.status(200).json({
    success: true,
    message: ` User with id ${req.params.id} is deleted`,
  });
});
