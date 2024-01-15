const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token = req.header('Authorization');
    token = token.slice(6).trim();
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, 'cT1uHnexsEoPjd2xSbS2lO2MntjFYfyN', (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

const authenticateAdminToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        // console.log('Role:', req.user?.role); // Sử dụng nullish check
        if (req.user?.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};



const authenticateUserToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        // console.log('Role:', req.user?.role); // Sử dụng nullish check
        if (req.user?.role === 'user') {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};


module.exports = { authenticateToken, authenticateAdminToken, authenticateUserToken };
