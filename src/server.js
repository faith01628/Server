const express = require('express');
const app = express();
const port = 3000;
const swagger = require('./swagger');
// const bodyParser = require('body-parser');
const { connectDB } = require('./database');
const userAPI = require('./api/users');

// Kết nối đến cơ sở dữ liệu
connectDB();

// Sử dụng API để lấy dữ liệu từ bảng "user"
app.use('/api/users', userAPI);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng middleware Swagger
app.use('/', swagger);

// Lắng nghe trên cổng 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
