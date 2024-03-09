"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash the whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
// set env defaults
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.PORT = process.env.PORT || "3000";
exports.default = {
    port: parseInt(process.env.PORT, 10),
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6
        },
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'magenta',
            verbose: 'cyan',
            debug: 'blue',
            silly: 'grey',
        }
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
