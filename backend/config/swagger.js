const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "http://localhost:8000",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;