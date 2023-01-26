const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProductDetails,
  createProductReview,
  deleteReviews,
  getAllReviews,
  getAllProductsListForAdmin,
} = require("../controler/productControler");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/products")
  .get( getAllProducts);
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route(`/admin/product/:id`)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router.route(`/product/:id`).get(getSingleProductDetails);
router.route(`/review`).put(isAuthenticatedUser, createProductReview);
router.route("/admin/products").get(isAuthenticatedUser, authorizedRoles("admin"),getAllProductsListForAdmin );
router
  .route(`/reviews`)
  .get(getAllReviews)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteReviews);

module.exports = router;
