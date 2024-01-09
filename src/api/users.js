const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     responses:
 *       200:
 *         description: Successful response with user data.
 *   post:
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
 *         name: role
 *         schema:
 *           type: string
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
 * /api/users/{id}:
 *   get:
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update.
 *       - in: body
 *         name: user
 *         required: true
 *         description: User object containing updated information.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             avata:
 *               type: string
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
