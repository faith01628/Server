const express = require('express');
const router = express.Router();
const ShopController = require('../controller/ShopController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Shop
 * /api/shop:
 *   get:
 *     tags:
 *       - Shop
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - Shop
 *     parameters:
 *       - in: query
 *         name: idplatform
 *         schema:
 *           type: int
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
    .get(authenticateBothTokens, ShopController.getShop)
    .post(authenticateBothTokens, ShopController.createShop)

/**
 * @swagger
 * tags:
 *   - name: Shop
 * /api/shop/{id}:
 *   get:
 *     tags:
 *       - Shop
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
 *       - Shop
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
 *       - Shop
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: idplatform
 *         schema:
 *           type: int
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
    .get(authenticateBothTokens, ShopController.getShopById)
    .delete(authenticateBothTokens, ShopController.deleteShop)
    .put(authenticateBothTokens, ShopController.updateShop)

module.exports = router;
