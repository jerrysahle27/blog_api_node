const swaggerAutogen = require('swagger-autogen')();

const outputFile = './api.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Social Network API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'localhost:5000/api',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);