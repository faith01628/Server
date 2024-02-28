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
                // Lấy địa chỉ IP của client
                const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                // Trích xuất IPv4 nếu địa chỉ IP là IPv6
                const ipv4 = ipAddress.includes(':') ? ipAddress.split(':').pop() : ipAddress;

                // Lưu thông tin đăng nhập vào bảng login
                const loginQuery = `
                  INSERT INTO login (idUser, loginTime, ipAddress, browser)
                  VALUES ('${user.id}', CURRENT_TIMESTAMP, '${ipv4}', '${req.headers['user-agent']}')
                `;
                await executeQuery(loginQuery);

                // Tạo JWT token
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
                // Lưu thông tin đăng nhập vào bảng login
                const loginQuery = `
                  INSERT INTO login (idUser, loginTime, ipAddress, browser)
                  VALUES ('${user.id}', CURRENT_TIMESTAMP, '${req.ip}', '${req.headers['user-agent']}')
                `;
                await executeQuery(loginQuery);

                // Tạo JWT token
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
