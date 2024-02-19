const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied - Missing token' });
    }

    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    token = token.slice(7).trim();

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
        if (req.user?.idRole === 2) {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

const authenticateBothTokens = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user?.idRole === 2 || req.user?.idRole === 1) {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

const authenticateUserToken = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user?.idRole === 1) {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

module.exports = { authenticateToken, authenticateAdminToken, authenticateUserToken, authenticateBothTokens };
