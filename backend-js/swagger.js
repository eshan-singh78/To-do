const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';  
const endpointsFiles = ['./routes/*.js'];  

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./server'); 
});
