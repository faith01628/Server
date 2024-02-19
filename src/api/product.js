const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Product
 * /api/product:
 *   get:
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response with product data.
 *   post:
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: nameCategory
 *         schema:
 *           type: string
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successful response with created product data.
 */
router.route('/')
    .get(authenticateBothTokens, productController.getProduct)
    .post(authenticateBothTokens, productController.createProduct)

/**
 * @swagger
 * tags:
 *   - name: Product
 * /api/product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with product data.
 *       404:
 *         description: User not found.
 *   delete:
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete.
 *     responses:
 *       204:
 *         description: product deleted successfully.
 *       404:
 *         description: product not found.
 *   put:
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update.
 *       - in: query
 *         name: nameCategory
 *         schema:
 *           type: string
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with updated product data.
 *       404:
 *         description: product not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .get(authenticateBothTokens, productController.getProductById)
    .delete(authenticateBothTokens, productController.deleteProduct)
    .put(authenticateBothTokens, productController.updateProduct)

module.exports = router;
