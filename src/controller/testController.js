const { executeQuery } = require('../database');

const testGetAdmin = async (req, res) => {
    try {
        const getQuery = 'SELECT * FROM "user"';
        const userData = await executeQuery(getQuery);
        res.status(200).json({ userData });
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(req.user.role)
};


const testGetUser = async (req, res) => {
    try {
        const getQuery = 'SELECT * FROM "user"';
        const userData = await executeQuery(getQuery);
        res.status(200).json({ userData });
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { testGetUser, testGetAdmin };
