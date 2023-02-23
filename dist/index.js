"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const AllRouters_1 = require("./src/routers/AllRouters");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const Auth_1 = require("./src/middleware/Auth");
require('dotenv').config();
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
                url: 'https://event-project.herokuapp.com/'
            }
        ]
    }, apis: ['./dist/src/routers/AllRouters.js']
};
const swaggerDoc = swaggerJSDoc(options);
app.use(express_1.default.json());
app.use(AllRouters_1.router, Auth_1.isAuth, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});
exports.default = app;
