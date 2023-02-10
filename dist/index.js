"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AllRouters_1 = require("./src/routers/AllRouters");
const app = (0, express_1.default)();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs API Documentation',
            version: '1.0.0',
            description: 'API documentation for Swagger'
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    }, apis: ['./routes/*.js']
};
const swaggerDoc = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express_1.default.json());
app.use(AllRouters_1.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});
exports.default = app;
