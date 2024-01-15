const { executeQuery } = require('../database');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.query;
        const query = `
          SELECT * FROM "user"
          WHERE username = '${username}' AND password = '${password}' AND role = 'user'
        `;
        const userData = await executeQuery(query);

        if (userData.length > 0) {
            const token = jwt.sign(userData[0], 'cT1uHnexsEoPjd2xSbS2lO2MntjFYfyN');

            res.status(200).json({ message: 'Login successful', user: userData[0], token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.query;
        const query = `
          SELECT * FROM "user"
          WHERE username = '${username}' AND password = '${password}' AND role = 'admin'
        `;
        const userData = await executeQuery(query);

        if (userData.length > 0) {
            const token = jwt.sign(userData[0], 'cT1uHnexsEoPjd2xSbS2lO2MntjFYfyN');

            res.status(200).json({ message: 'Login successful', user: userData[0], token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    loginUser, loginAdmin,
};
