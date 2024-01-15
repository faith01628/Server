const express = require('express');
const router = express.Router();
const testController = require('../controller/testController');
const { authenticateUserToken, authenticateAdminToken } = require('../routers/authMiddleware');


/**
 * @swagger
 * tags:
 *   - name: test role
 * /api/testloginAdmin:
 *   get:
 *     tags:
 *       - test role
 *     responses:
 *       200:
 *         description: Successful response with user data.
 */


/**
 * @swagger
 * tags:
 *   - name: test role
 * /api/testloginUser:
 *   get:
 *     tags:
 *       - test role
 *     responses:
 *       200:
 *         description: Successful response with user data.
 */

router.route('/').get(authenticateUserToken, testController.testGetUser);
router.route('/').get(authenticateAdminToken, testController.testGetAdmin);

module.exports = router;