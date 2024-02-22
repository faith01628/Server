const express = require('express');
const router = express.Router();
const inExPortStorageController = require('../controller/inExPortStorageController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: InExPortStorage
 * /api/inExPortStorage:
 *   get:
 *     tags:
 *       - InExPortStorage
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - InExPortStorage
 *     parameters:
 *       - in: query
 *         name: idStorage
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
 *       - in: query
 *         name: datePort
 *         schema:
 *           type: date
 *         description: YYYY-MM-DD.
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: int
 *       - in: query
 *         name: transactionType
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successful response with created size data.
 */
router.route('/')
    .get(authenticateBothTokens, inExPortStorageController.getInExPortStorage)
    .post(authenticateBothTokens, inExPortStorageController.createInExPortStorage)

/**
 * @swagger
 * tags:
 *   - name: InExPortStorage
 * /api/inExPortStorage/{id}:
 *   get:
 *     tags:
 *       - InExPortStorage
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
 *       - InExPortStorage
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
 *       - InExPortStorage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: idStorage
 *         schema:
 *           type: int
 *       - in: query
 *         name: idUser
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
 *       - in: query
 *         name: datePort
 *         schema:
 *           type: date
 *         description: YYYY-MM-DD.
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: int
 *       - in: query
 *         name: transactionType
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
    .get(authenticateBothTokens, inExPortStorageController.getInExPortStorageById)
    .delete(authenticateBothTokens, inExPortStorageController.deleteInExPortStorage)
    .put(authenticateBothTokens, inExPortStorageController.updateInExPortStorage)

module.exports = router;
