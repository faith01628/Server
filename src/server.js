const express = require('express');
const app = express();
const port = 3000;
const swagger = require('./swagger');
const { connectDB } = require('./database');
const userAPI = require('./api/users');
const roleAPI = require('./api/role');
const sizeAPI = require('./api/size');
const productAPI = require('./api/product');
const classifyAPI = require('./api/classify');
const linkAPI = require('./api/link');
const platformAPI = require('./api/platform');
const SKUAPI = require('./api/SKU');
const { authenticateAdminToken, authenticateUserToken } = require('./routers/authMiddleware');
const { testGetAdmin, testGetUser } = require('./controller/testController');
const { loginUser, loginAdmin } = require('./controller/LoginUserController');

connectDB();

app.use('/api/users', userAPI);
app.use('/api/role', roleAPI);
app.use('/api/size', sizeAPI);
app.use('/api/product', productAPI);
app.use('/api/classify', classifyAPI);
app.use('/api/link', linkAPI);
app.use('/api/platform', platformAPI);
app.use('/api/SKU', SKUAPI);
app.use('/api/loginUser', loginUser);
app.use('/api/loginAdmin', loginAdmin);
app.use('/api/testloginUser', authenticateUserToken, testGetAdmin);
app.use('/api/testloginAdmin', authenticateAdminToken, testGetUser);

app.use('/', swagger);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});