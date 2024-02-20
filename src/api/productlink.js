const express = require('express');
const router = express.Router();
const productlinkController = require('../controller/ProductLinkController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: ProductLink
 * /api/productLink:
 *   get:
 *     tags:
 *       - ProductLink
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - ProductLink
 *     parameters:
 *       - in: query
 *         name: idlink
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
    .get(authenticateBothTokens, productlinkController.getProductLink)
    .post(authenticateBothTokens, productlinkController.createProductLink)

/**
 * @swagger
 * tags:
 *   - name: ProductLink
 * /api/productLink/{id}:
 *   get:
 *     tags:
 *       - ProductLink
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
 *       - ProductLink
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
 *       - ProductLink
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: idlink
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
    .get(authenticateBothTokens, productlinkController.getProductLinkById)
    .delete(authenticateBothTokens, productlinkController.deleteProductLink)
    .put(authenticateBothTokens, productlinkController.updateProductLink)

module.exports = router;
