const { executeQuery } = require('../database');

const getUserData = async (req, res) => {
    try {
        const getQuery = 'SELECT * FROM "user"';
        const userData = await executeQuery(getQuery);

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, username, password, email, role, avata } = req.query;

        const creatQuery = `
            INSERT INTO "user" (name, username, password, email, role, avata)
            VALUES ('${name}', '${username}', '${password}', '${email}', '${role}', '${avata}')
        `;

        await executeQuery(creatQuery);

        res.status(201).json({ message: 'User created successfully', name: name, username: username, password: password, email: email, role: role, avata: avata });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const query = `
            SELECT * FROM "user" WHERE id = ${userId}
        `;

        const userData = await executeQuery(query);

        if (userData.length > 0) {
            res.status(200).json(userData[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deleteQuery = `
            DELETE FROM "user" WHERE id = ${userId}
        `;

        const deleteuser = await executeQuery(deleteQuery, true);

        if (deleteuser && deleteuser.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete user successfully', deleteUserId: userId });
        } else {
            res.status(404).json({ error: 'User not found' });
        }


    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, username, password, email, role, avata } = req.query;

        const checkUserQuery = `SELECT * FROM "user" WHERE id = ${userId}`;
        const existingUser = await executeQuery(checkUserQuery);

        if (!existingUser || existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updateQuery = `
            UPDATE "user"
            SET name = '${name}', username = '${username}', password = '${password}', 
                email = '${email}', role = '${role}', avata = '${avata}'
            WHERE id = ${userId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'User updated successfully', updatedUserId: userId, name: name, username: username, password: password, email: email, role: role, avata: avata });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedUserId: userId });
        }

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUserData, createUser, getUserById, deleteUser, updateUser,
};
