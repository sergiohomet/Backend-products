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
  CheckGetProductId,
  ProductValidationRules,
} from "./validators/useValidator";

const router = Router();

router.get("/", getProducts);

router.get("/:id", CheckGetProductId, handleInputErrors, getProductById);

router.post("/", ProductValidationRules, handleInputErrors, createProduct);

router.put("/:id", ProductValidationRules, handleInputErrors, updateProduct);

router.patch("/:id", CheckGetProductId, handleInputErrors, updateAvailability);

router.delete("/:id", CheckGetProductId, handleInputErrors, deleteProduct);

export default router;