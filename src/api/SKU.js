const express = require('express');
const router = express.Router();
const skuController = require('../controller/SKUController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: SKU
 * /api/SKU:
 *   get:
 *     tags:
 *       - SKU
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - SKU
 *     parameters:
 *       - in: query
 *         name: SKU
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, skuController.getSKU)
    .post(authenticateBothTokens, skuController.createSKU)

/**
 * @swagger
 * tags:
 *   - name: SKU
 * /api/SKU/{id}:
 *   get:
 *     tags:
 *       - SKU
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
 *       - SKU
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
 *       - SKU
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: SKU
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with updated size data.
 *       404:
 *         description: size not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .get(authenticateBothTokens, skuController.getSKUById)
    .delete(authenticateBothTokens, skuController.deleteSKU)
    .put(authenticateBothTokens, skuController.updateSKU)

module.exports = router;
