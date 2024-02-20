const express = require('express');
const router = express.Router();
const noteController = require('../controller/NoteController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Note
 * /api/note:
 *   get:
 *     tags:
 *       - Note
 *     responses:
 *       200:
 *         description: Successful response with size data.
 *   post:
 *     tags:
 *       - Note
 *     parameters:
 *       - in: query
 *         name: note
 *         schema:
 *           type: string
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
    .get(authenticateBothTokens, noteController.getNote)
    .post(authenticateBothTokens, noteController.createNote)

/**
 * @swagger
 * tags:
 *   - name: Note
 * /api/note/{id}:
 *   get:
 *     tags:
 *       - Note
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
 *       - Note
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
 *       - Note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to update.
 *       - in: query
 *         name: note
 *         schema:
 *           type: string
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
    .get(authenticateBothTokens, noteController.getNoteById)
    .delete(authenticateBothTokens, noteController.deleteNote)
    .put(authenticateBothTokens, noteController.updateNote)

module.exports = router;
