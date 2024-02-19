const express = require('express');
const router = express.Router();
const platformController = require('../controller/PlatformController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Platform
 * /api/platform:
 *   get:
 *     tags:
 *       - Platform
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - Platform
 *     parameters:
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, platformController.getPlatform)
    .post(authenticateBothTokens, platformController.createPlatform)

/**
 * @swagger
 * tags:
 *   - name: Platform
 * /api/platform/{id}:
 *   get:
 *     tags:
 *       - Platform
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
 *       - Platform
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
 *       - Platform
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: platform
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
    .get(authenticateBothTokens, platformController.getPlatformById)
    .delete(authenticateBothTokens, platformController.deletePlatform)
    .put(authenticateBothTokens, platformController.updatePlatform)

module.exports = router;
