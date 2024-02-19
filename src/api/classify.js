const express = require('express');
const router = express.Router();
const classifyController = require('../controller/ClassifyController');
const { authenticateBothTokens } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Classify
 * /api/classify:
 *   get:
 *     tags:
 *       - Classify
 *     responses:
 *       200:
 *         description: Successful response with classify data.
 *   post:
 *     tags:
 *       - Classify
 *     parameters:
 *       - in: query
 *         name: classificationName 
 *         schema:
 *           type: string
 *         description: The name of the classify.
 *       - in: query
 *         name: image
 *         schema:
 *           type: string
 *         description: The image of the classify.
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *         description: The material of the classify.
 *       - in: query
 *         name: idproduct
 *         schema:
 *           type: int
 *         description: The idproduct of the classify.
 *     responses:
 *       201:
 *         description: Successful response with created classify data.
 */
router.route('/')
    .get(authenticateBothTokens, classifyController.getClassify)
    .post(authenticateBothTokens, classifyController.createClassify)

/**
 * @swagger
 * tags:
 *   - name: Classify
 * /api/classify/{id}:
 *   get:
 *     tags:
 *       - Classify
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
 *       - Classify
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the classify to delete.
 *     responses:
 *       204:
 *         description: classify deleted successfully.
 *       404:
 *         description: classify not found.
 *   put:
 *     tags:
 *       - Classify
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: query
 *         name: classificationName 
 *         schema:
 *           type: string
 *         description: The name of the classify.
 *       - in: query
 *         name: image
 *         schema:
 *           type: string
 *         description: The image of the classify.
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *         description: The material of the classify.
 *       - in: query
 *         name: idproduct
 *         schema:
 *           type: int
 *         description: The idproduct of the classify.
 *     responses:
 *       200:
 *         description: Successful response with updated classify data.
 *       404:
 *         description: classify not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .get(authenticateBothTokens, classifyController.getClassifyById)
    .delete(authenticateBothTokens, classifyController.deleteClassify)
    .put(authenticateBothTokens, classifyController.updateClassify)

module.exports = router;
