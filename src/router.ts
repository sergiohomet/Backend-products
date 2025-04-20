import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
import {
  ProductIdValidation,
  ProductValidationRules,
} from "./validators/useValidator";

const router = Router();

router.get("/", getProducts);

router.get("/:id", ProductIdValidation, handleInputErrors, getProductById);

router.post("/", ProductValidationRules, handleInputErrors, createProduct);

router.put("/:id", ProductIdValidation, ProductValidationRules, handleInputErrors, updateProduct);

router.patch("/:id", ProductIdValidation, handleInputErrors, updateAvailability);

router.delete("/:id", ProductIdValidation, handleInputErrors, deleteProduct);

export default router;