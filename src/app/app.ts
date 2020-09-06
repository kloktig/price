import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";

import {RegisterRoutes} from './routes/routes';  // here
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../build/api/swagger.json';
import {ValidateError} from "tsoa";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 30000

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use body parser to read sent json payloads
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});

RegisterRoutes(app);

app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});