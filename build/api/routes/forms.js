"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("@/utils/logger"));
const controller_1 = require("@/pkg/forms/controller");
const forms_1 = require("@/api/middleware/forms");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/forms", route);
    route.post('/:formId/filteredResponses', forms_1.formFilterValidate, controller_1.GetResponses);
    route.get('/health', (_req, res) => {
        logger_1.default.info('Health check');
        res.status(200).end();
    });
};
