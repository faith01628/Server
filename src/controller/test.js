// testRouter.js
const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'A simple API for testing purposes',
        },
    },
    apis: [__dirname + '/testRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * @swagger
 * /test:
 *   get:
 *     description: Get a greeting message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Data'
 */
router.get('/', (req, res) => {
    res.send('Hello');
});

router.post('/push', (req, res) => {
    res.send('Data pushed successfully');
});

router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = router;
