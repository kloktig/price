import express = require('express');
import { RegisterRoutes } from './routes/routes';  // here
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../build/api/swagger.json';

const app = express();
const port = process.env.PORT || 30000

RegisterRoutes(app);  // and here
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});