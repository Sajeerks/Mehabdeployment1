const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getSingleUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUserAdmin,
  updateUserRole,
  deleteUser,
} = require("../controler/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getSingleUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/updateProfile").put(isAuthenticatedUser, updateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUserAdmin)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole);

  


module.exports = router;
