// import express from "express";
import { router } from "./src/routers/AllRouters";
import express from "express";
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
import { isAuth } from './src/middleware/Auth';
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
        servers:[
            {
                url: 'https://event-project.herokuapp.com/'
            },
            {
                url: 'http://localhost:3000/'
            }
        ]
    },apis: ['./dist/src/routers/AllRouters.js']
}

const swaggerDoc = swaggerJSDoc(options);

app.use(function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000','https://event-project.herokuapp.com');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(router,swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});

export default app;
