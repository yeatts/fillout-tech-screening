"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errors_1 = require("@/errors");
const config_1 = __importDefault(require("@/config"));
const routes_1 = __importDefault(require("@/api/routes"));
exports.default = ({ app }) => {
    // Health Check endpoints
    app.get('/health', (_req, res) => {
        res.status(200).send("OK").end();
    });
    app.head('/health', (_req, res) => {
        res.status(200).end();
    });
    // Transforms the raw string of req.body into json
    app.use(express_1.default.json());
    // Load API routes
    app.use(config_1.default.api.prefix, (0, routes_1.default)());
    // catch 404 and forward to error handler
    app.use((_req, _res, next) => {
        const err = new errors_1.NotFoundError('Not Found');
        err.setStatus(404);
        next(err);
    });
    // error handlers
    app.use((err, _req, res, _next) => {
        res.status(err.getStatus() || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
