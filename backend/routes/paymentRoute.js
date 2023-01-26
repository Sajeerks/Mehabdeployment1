const { isAuthenticatedUser } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const {processpayment,sendStripeApiKey} = require("../controler/paymentController") 

router.route("/process/payment").post(isAuthenticatedUser,processpayment)
// router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey)
router.route("/stripeapikey").get(sendStripeApiKey)




module.exports= router;