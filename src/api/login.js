const express = require('express');
const router = express.Router();
const LoginUserController = require('../controller/LoginUserController');

/**
 * @swagger
 * tags:
 *   - name: Login
 * /api/loginUser:
 *   get:
 *     tags:
 *       - Login
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: The username of the user.
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: The password of the user.
 *     responses:
 *       200:
 *         description: Successful response with updated user data.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * tags:
 *   - name: Login
 * /api/loginAdmin:
 *   get:
 *     tags:
 *       - Login
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: The username of the admin.
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: The password of the admin.
 *     responses:
 *       200:
 *         description: Successful response with updated admin data.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Internal Server Error.
 */

router.route('/')
    .get(LoginUserController.loginUser)
    .get(LoginUserController.loginAdmin)


module.exports = router;