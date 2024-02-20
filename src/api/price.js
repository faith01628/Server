const express = require('express');
const router = express.Router();
const priceController = require('../controller/PriceController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Price
 * /api/price:
 *   get:
 *     tags:
 *       - Price
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - Price
 *     parameters:
 *       - in: query
 *         name: wholesalePrice
 *         schema:
 *           type: float
 *       - in: query
 *         name: price
 *         schema:
 *           type: float
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
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, priceController.getPrice)
    .post(authenticateBothTokens, priceController.createPrice)

/**
 * @swagger
 * tags:
 *   - name: Price
 * /api/price/{id}:
 *   get:
 *     tags:
 *       - Price
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
 *       - Price
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
 *       - Price
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: wholesalePrice
 *         schema:
 *           type: float
 *       - in: query
 *         name: price
 *         schema:
 *           type: float
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
 *     responses:
 *       200:
 *         description: Successful response with updated size data.
 *       404:
 *         description: size not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .get(authenticateBothTokens, priceController.getPriceById)
    .delete(authenticateBothTokens, priceController.deletePrice)
    .put(authenticateBothTokens, priceController.updatePrice)

module.exports = router;
