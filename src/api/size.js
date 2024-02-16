const express = require('express');
const router = express.Router();
const sizeController = require('../controller/SizeController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Size
 * /api/size:
 *   get:
 *     tags:
 *       - Size
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - Size
 *     parameters:
 *       - in: query
 *         name: sizeName
 *         schema:
 *           type: string
 *         description: The size of the product.
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, sizeController.getSize)
    .post(authenticateBothTokens, sizeController.createSize)

/**
 * @swagger
 * tags:
 *   - name: Size
 * /api/size/{id}:
 *   delete:
 *     tags:
 *       - Size
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
 *       - Size
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: sizeName
 *         schema:
 *           type: string
 *         description: The size of the product.
 *     responses:
 *       200:
 *         description: Successful response with updated size data.
 *       404:
 *         description: size not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .delete(authenticateBothTokens, sizeController.deleteSize)
    .put(authenticateBothTokens, sizeController.updateSize)

module.exports = router;
