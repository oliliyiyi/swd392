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
require('dotenv').config();
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs API Documentation',
            version: '1.0.0',
            description: 'API documentation for Swagger'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'https://event-project.herokuapp.com/'
            },
            {
                url: 'http://localhost:3000/'
            }
        ]
    }, apis: ['./dist/src/routers/AllRouters.js']
};
const swaggerDoc = swaggerJSDoc(options);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(AllRouters_1.router, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});
exports.default = app;
