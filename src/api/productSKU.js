const express = require('express');
const router = express.Router();
const ShopController = require('../controller/ProductSKUController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: ProductSKU
 * /api/productSKU:
 *   get:
 *     tags:
 *       - ProductSKU
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - ProductSKU
 *     parameters:
 *       - in: query
 *         name: idproduct
 *         schema:
 *           type: int
 *       - in: query
 *         name: idclassify
 *         schema:
 *           type: int
 *       - in: query
 *         name: idsize
 *         schema:
 *           type: int
 *       - in: query
 *         name: idSKU
 *         schema:
 *           type: int
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, ShopController.getProductSKU)
    .post(authenticateBothTokens, ShopController.createProductSKU)

/**
 * @swagger
 * tags:
 *   - name: ProductSKU
 * /api/productSKU/{id}:
 *   get:
 *     tags:
 *       - ProductSKU
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
 *       - ProductSKU
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to delete.
 *     responses:
 *       204:
 *         description: size deleted successfully.
 *       404:
 *         description: size not found.
 *   put:
 *     tags:
 *       - ProductSKU
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: idproduct
 *         schema:
 *           type: int
 *       - in: query
 *         name: idclassify
 *         schema:
 *           type: int
 *       - in: query
 *         name: idsize
 *         schema:
 *           type: int
 *       - in: query
 *         name: idSKU
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Successful response with updated size data.
 *       404:
 *         description: size not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .get(authenticateBothTokens, ShopController.getProductSKUById)
    .delete(authenticateBothTokens, ShopController.deleteProductSKU)
    .put(authenticateBothTokens, ShopController.updateProductSKU)

module.exports = router;
