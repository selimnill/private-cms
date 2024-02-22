import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  ProductCategoryController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productPhotoController,
  productlistController,
  searchProductController,
  similerProductController,
  updateProductController,
} from "../controllers/ProductController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

// all product
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug", getSingleProductController);

// route of photos
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter products
router.post("/product-filters", productFilterController);

// products total count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productlistController);

// search products

router.get("/search/:keyword", searchProductController);

// similer product
router.get("/related-product/:pid/:cid", similerProductController);

// products by category
router.get("/product-category/:slug", ProductCategoryController);

// payment gateway with token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
