const express = require('express');
const router = express.Router();
const loginHistoryController = require('../controller/LoginHistoryController');
const { authenticateBothTokens, authenticateAdminToken } = require('../routers/authMiddleware');


/**
 * @swagger
 * tags:
 *   - name: LoginHistory
 * /api/loginHistory:
 *   get:
 *     tags:
 *       - LoginHistory
 *     responses:
 *       200:
 *         description: Successful response with size data.
 */
router.route('/')
    .get(authenticateAdminToken, loginHistoryController.getLoginHistory)


/**
 * @swagger
 * tags:
 *   - name: LoginHistory
 * /api/loginHistory/{id}:
 *   get:
 *     tags:
 *       - LoginHistory
 *     responses:
 *       200:
 *         description: Successful response with product data.
 *       404:
 *         description: User not found.
 *   delete:
 *     tags:
 *       - LoginHistory
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
 */
router.route('/:id')
    .get(authenticateBothTokens, loginHistoryController.getLoginHistoryById)
    .delete(authenticateAdminToken, loginHistoryController.deleteLoginHistory)

module.exports = router;