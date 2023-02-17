"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const AllRouters_1 = require("./src/routers/AllRouters");
const express = require("express");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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
app.use(express.json());
app.use(AllRouters_1.router, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});
exports.default = app;
