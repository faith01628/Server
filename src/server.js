const express = require('express');
const app = express();
const port = 3000;
const swagger = require('./swagger');
const { connectDB } = require('./database');
const userAPI = require('./api/users');
// const loginAPI = require('./api/login');

connectDB();

app.use('/api/users', userAPI);
// app.use('/api/login', loginAPI);

app.use('/', swagger);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
