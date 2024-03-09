"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forms_1 = __importDefault(require("@/api/routes/forms"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, forms_1.default)(app);
    return app;
};
