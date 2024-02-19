const { executeQuery } = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.query;

        const query = `
          SELECT * FROM "user"
          WHERE username = '${username}' AND idRole = '1'
        `;
        const userData = await executeQuery(query);

        if (userData.length > 0) {
            const user = userData[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign(user, 'cT1uHnexsEoPjd2xSbS2lO2MntjFYfyN');
                res.status(200).json({ message: 'Login successful', user, token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
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
          WHERE username = '${username}' AND idRole = '2'
        `;
        const userData = await executeQuery(query);

        if (userData.length > 0) {
            const user = userData[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign(user, 'cT1uHnexsEoPjd2xSbS2lO2MntjFYfyN');
                res.status(200).json({ message: 'Login successful', user, token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
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
