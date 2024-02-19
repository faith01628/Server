const express = require('express');
const router = express.Router();
const linkController = require('../controller/LinkController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Link
 * /api/link:
 *   get:
 *     tags:
 *       - Link
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - Link
 *     parameters:
 *       - in: query
 *         name: link
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, linkController.getLink)
    .post(authenticateBothTokens, linkController.createLink)

/**
 * @swagger
 * tags:
 *   - name: Link
 * /api/link/{id}:
 *   get:
 *     tags:
 *       - Link
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
 *       - Link
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
 *       - Link
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: link
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
    .get(authenticateBothTokens, linkController.getLinkById)
    .delete(authenticateBothTokens, linkController.deleteLink)
    .put(authenticateBothTokens, linkController.updateLink)

module.exports = router;
