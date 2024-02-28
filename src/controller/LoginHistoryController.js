const { executeQuery } = require('../database');

const getLoginHistory = async (req, res) => {
    try {
        const query = 'SELECT * FROM "login"';
        const loginData = await executeQuery(query);

        res.status(200).json(loginData);
    } catch (error) {
        console.error('Error getting loginData data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLoginHistoryById = async (req, res) => {
    try {
        // Lấy idUser từ thông tin người dùng trong token JWT
        const idUser = req.user.id;

        const query = `
            SELECT * FROM "login" WHERE idUser = ${idUser}
        `;

        const loginData = await executeQuery(query);

        if (loginData.length > 0) {
            res.status(200).json(loginData);
        } else {
            res.status(404).json({ error: 'No login history found for the current user' });
        }
    } catch (error) {
        console.error('Error getting login history by user ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const deleteLoginHistory = async (req, res) => {
    try {
        const logingId = req.params.id;

        const deleteQuery = `
            DELETE FROM "login" WHERE id = ${logingId}
        `;

        const deleteloging = await executeQuery(deleteQuery, true);

        if (deleteloging && deleteloging.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete loging history successfully', deletelogingId: logingId });
        } else {
            res.status(404).json({ error: 'loging history not found' });
        }


    } catch (error) {
        console.error('Error deleting loging history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getLoginHistory, getLoginHistoryById, deleteLoginHistory
};