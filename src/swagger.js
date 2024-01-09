const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerDefinition = require('./swaggerDefinition');
const glob = require('glob');

const options = {
    swaggerDefinition,
    apis: [
        'src/api/users.js',  // Thêm đường dẫn của các tệp API vào đây
        // Thêm tệp API khác nếu cần
    ],
}

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
