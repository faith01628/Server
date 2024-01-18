const express = require('express');
const router = express.Router();
const roleController = require('../controller/RoleController');
const { authenticateAdminToken } = require('../routers/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Role
 * /api/role:
 *   get:
 *     tags:
 *       - Role
 *     responses:
 *       200:
 *         description: Successful response with role data.
 *   post:
 *     tags:
 *       - Role
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: The Role of the user.
 *     responses:
 *       201:
 *         description: Successful response with created role data.
 */
router.route('/')
    .get(authenticateAdminToken, roleController.getRole)
    .post(authenticateAdminToken, roleController.createRole)

/**
 * @swagger
 * tags:
 *   - name: Role
 * /api/role/{id}:
 *   delete:
 *     tags:
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role to delete.
 *     responses:
 *       204:
 *         description: Role deleted successfully.
 *       404:
 *         description: Role not found.
 *   put:
 *     tags:
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role to update.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: The role of the user.
 *     responses:
 *       200:
 *         description: Successful response with updated role data.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/:id')
    .delete(authenticateAdminToken, roleController.deleteRole)
    .put(authenticateAdminToken, roleController.updateRole)

module.exports = router;
