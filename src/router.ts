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

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                    id:
 *                        type: integer
 *                        description: The Product ID
 *                        example: 1
 *                    name:
 *                        type: string
 *                        description: The Product Name
 *                        example: Monitor Curvo de 49 Pulgadas
 *                    price:
 *                        type: number
 *                        description: The Product Price
 *                        example: 500
 *                    quantity:
 *                        type: number
 *                        description: The quantity availabe
 *                        example: 50
 *                    availavility:
 *                        type: boolean
 *                        description: The Product availavility
 *                        example: true
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get("/:id", IdValidation, handleInputErrors, getProductById);

/**
* @swagger
*  /api/products/{id}:
*        get:
*            summary: Get a product by ID
*            tags:
*                - Products
*            description: Return a product based on its unique ID
*            parameters:
*               - in: path
*                 name: id
*                 description: The ID of the product to retrieve
*                 required: true
*                 schema:
*                     type: integer
*            responses:
*                200:
*                    description: Successful response
*                    content:
*                        application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
*                404: 
*                    description: Product not found
*                400:
*                    description: Bad Request - Not valid ID
*                   
*/

router.post("/", ProductValidationRules, handleInputErrors, createProduct);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          quantity:
 *                              type: number
 *                              example: 50
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 * 
 */

router.put(
  "/:id",
  IdValidation,
  ProductValidationRules,
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:  
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *                          quantity:
 *                              type: number
 *                              example: 50
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */

router.patch("/:id", IdValidation, handleInputErrors, updateAvailability);

/** 
 * @swagger
 *  /api/products/{id}:
 *    patch:
 *        summary: Update product availability
 *        tags:
 *            - Products
 *        description: Returns the updated availability
 *        parameters:
 *               - in: path
 *                 name: id
 *                 description: The ID of the product to retrieve
 *                 required: true
 *                 schema:
 *                     type: integer
 *        responses:
 *               200:
 *                  description: Successfull Response
 *                  content:
 *                      aplication/json:
 *                            schema:
 *                                 $ref: '#/components/schemas/Product'
 *               400:
 *                  description: Bad Request - Invalid ID
 *               404:
 *                  description: Product not found
*/

router.delete("/:id", IdValidation, handleInputErrors, deleteProduct);

/** 
 * @swagger
 *  /api/products/{id}:
 *    delete:
 *        summary: Delete a product by a given ID
 *        tags:
 *            - Products
 *        description: Returns a confirmation message
 *        parameters:
 *               - in: path
 *                 name: id
 *                 description: The ID of the product to retrieve
 *                 required: true
 *                 schema:
 *                     type: integer
 *        responses:
 *               200:
 *                  description: Successfull Response
 *                  content:
 *                      aplication/json:
 *                                schema:
 *                                    type: string
 *                                    value: "Producto Eliminado" 
 *               400:
 *                  description: Bad Request - Invalid ID
 *               404:
 *                  description: Product not found
*/

export default router;
