const express = require('express');
const app = express();
const port = 3000;
const swagger = require('./swagger');
// const bodyParser = require('body-parser');
const { connectDB } = require('./database');
const userAPI = require('./api/users');

connectDB();

app.use('/api/users', userAPI);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', swagger);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
