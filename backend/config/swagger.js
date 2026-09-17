const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Ecommerce API",
      version: "1.0.0",
      description: "My Node.js API Documentation",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL,
      },
    ],
  },

  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;