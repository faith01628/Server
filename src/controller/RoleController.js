const { executeQuery } = require('../database');

const getRole = async (req, res) => {
    try {
        const query = 'SELECT * FROM "role"';
        const roleData = await executeQuery(query);

        res.status(200).json(roleData);
    } catch (error) {
        console.error('Error getting role data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createRole = async (req, res) => {
    try {
        const { role } = req.query;

        const query = `
            INSERT INTO "role" (role)
            VALUES ('${role}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;

        const deleteQuery = `
            DELETE FROM "role" WHERE id = ${roleId}
        `;

        const deleterole = await executeQuery(deleteQuery, true);

        if (deleterole && deleterole.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete role successfully', deleteroleId: roleId });
        } else {
            res.status(404).json({ error: 'User not found' });
        }


    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const { role } = req.query;

        const checkRolerQuery = `SELECT * FROM "role" WHERE id = ${roleId}`;
        const existingRole = await executeQuery(checkRolerQuery);

        if (!existingRole || existingRole.length === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }

        const updateQuery = `
            UPDATE "role" SET role = '${role}' WHERE id = ${roleId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'Role updated successfully', updatedRoleId: roleId, role: role });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedRoleId: roleId });
        }

    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getRole, createRole, deleteRole, updateRole,
};