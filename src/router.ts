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
  ProductValidationRules,
} from "./validators/useValidator";

const router = Router();

router.get("/", getProducts);

router.get("/:id", ProductValidationRules, handleInputErrors, getProductById);

router.post("/", ProductValidationRules, handleInputErrors, createProduct);

router.put("/:id", ProductValidationRules, handleInputErrors, updateProduct);

router.patch("/:id", ProductValidationRules, handleInputErrors, updateAvailability);

router.delete("/:id", ProductValidationRules, handleInputErrors, deleteProduct);

export default router;