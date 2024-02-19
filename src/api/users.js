const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

/**
 * @swagger
 * tags:
 *   - name: Test User
 * /api/users:
 *   get:
 *     tags:
 *       - Test User
 *     responses:
 *       200:
 *         description: Successful response with user data.
 *   post:
 *     tags:
 *       - Test User
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the user.
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
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The email of the user.
 *       - in: query
 *         name: idrole
 *         schema:
 *           type: int
 *         description: The role of the user.
 *       - in: query
 *         name: avata
 *         schema:
 *           type: string
 *         description: The avatar of the user.
 *     responses:
 *       201:
 *         description: Successful response with created user data.
 */
router.route('/')
    .get(userController.getUserData)
    .post(userController.createUser)

/**
 * @swagger
 * tags:
 *   - name: Test User
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Test User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: Successful response with user data.
 *       404:
 *         description: User not found.
 *   delete:
 *     tags:
 *       - Test User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *   put:
 *     tags:
 *       - Test User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the user.
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
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The email of the user.
 *       - in: query
 *         name: idrole
 *         schema:
 *           type: int
 *         description: The role of the user.
 *       - in: query
 *         name: avata
 *         schema:
 *           type: string
 *         description: The avatar of the user.
 *     responses:
 *       200:
 *         description: Successful response with updated user data.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .put(userController.updateUser)

module.exports = router;
