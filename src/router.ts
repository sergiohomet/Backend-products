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
  IdValidation,
  ProductValidationRules,
} from "./validators/useValidator";

const router = Router();

router.get("/", getProducts);

router.get("/:id", IdValidation, handleInputErrors, getProductById);

router.post("/", ProductValidationRules, handleInputErrors, createProduct);

router.put("/:id", IdValidation, ProductValidationRules, handleInputErrors, updateProduct);

router.patch("/:id", IdValidation, handleInputErrors, updateAvailability);

router.delete("/:id", IdValidation, handleInputErrors, deleteProduct);

export default router;