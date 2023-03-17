const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'REST API Documentation',
    description: 'Documentation from the endpoints declared in this backend.',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './docs/api.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);