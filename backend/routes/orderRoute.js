const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controler/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/allOrders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), allOrders);
  
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
.delete(isAuthenticatedUser, authorizedRoles("admin"),deleteOrder)

module.exports = router;
