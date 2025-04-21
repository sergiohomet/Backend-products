import { body, param } from "express-validator";

export const IdValidation = [
    param('id').isInt().withMessage('ID no válido'),
]

export const ProductValidationRules = [
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Precio no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('El precio no puede ser menor a 0'),

    body('quantity')
        .isNumeric().withMessage('Cantidad no válida')
        .notEmpty().withMessage('La cantidad del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Cantidad no válida')
]