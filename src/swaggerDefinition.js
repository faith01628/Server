const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for XYZ',
        version: '1.0.0',
        description: 'This is a REST API application made with Express.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        BearerAuth: [],
    }],
};

module.exports = swaggerDefinition;