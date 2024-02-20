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
const priceAPI = require('./api/price');
const noteAPI = require('./api/note');
const productlinkAPI = require('./api/productlink');
const shopAPI = require('./api/shop');
const productSKUAPI = require('./api/productSKU');
const storageAPI = require('./api/storage');
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
app.use('/api/price', priceAPI);
app.use('/api/note', noteAPI);
app.use('/api/productlink', productlinkAPI);
app.use('/api/shop', shopAPI);
app.use('/api/productSKU', productSKUAPI);
app.use('/api/storage', storageAPI);
app.use('/api/loginUser', loginUser);
app.use('/api/loginAdmin', loginAdmin);
app.use('/api/testloginUser', authenticateUserToken, testGetAdmin);
app.use('/api/testloginAdmin', authenticateAdminToken, testGetUser);

app.use('/', swagger);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});