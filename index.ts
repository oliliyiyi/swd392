import express from "express";
import { router } from "./src/routers/AllRouters";
const app = express();
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//     definitions: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Nodejs API Documentation',
//             version: '1.0.0'
//         },
//         servers:[
//             {
//                 url: 'https://event-project.herokuapp.com/'
//             }
//         ]
//     },apis: ['./index.ts']
// }

// const swaggerDoc = swaggerJSDoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});

export default app;