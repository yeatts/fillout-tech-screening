"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDummyClient = exports.WithBearerTokenEnvVar = exports.WithBearerToken = exports.WithBaseUrlEnvVar = exports.WithBaseUrl = void 0;
const logger_1 = __importDefault(require("@/utils/logger"));
const dummy_types_1 = require("@/pkg/forms/fillout/dummy-types");
const WithBaseUrl = (baseUrl) => {
    return (fc) => {
        fc.setBaseUrl(baseUrl);
    };
};
exports.WithBaseUrl = WithBaseUrl;
const WithBaseUrlEnvVar = (envVar) => {
    if (process.env[envVar] === undefined || process.env[envVar] === null) {
        logger_1.default.error("Environment variable %s is not set", envVar);
        throw new Error(`Environment variable ${envVar} is not set`);
    }
    return (fc) => {
        fc.setBaseUrl(process.env[envVar]);
    };
};
exports.WithBaseUrlEnvVar = WithBaseUrlEnvVar;
const WithBearerToken = (envVar) => {
    if (process.env[envVar] === undefined || process.env[envVar] === null) {
        logger_1.default.error("Environment variable %s is not set", envVar);
        throw new Error(`Environment variable ${envVar} is not set`);
    }
    return (fc) => {
        fc.setBearerToken(process.env[envVar]);
    };
};
exports.WithBearerToken = WithBearerToken;
const WithBearerTokenEnvVar = (envVar) => {
    if (process.env[envVar] === undefined || process.env[envVar] === null) {
        logger_1.default.error("Environment variable %s is not set", envVar);
        throw new Error(`Environment variable ${envVar} is not set`);
    }
    return (fc) => {
        fc.setBearerToken(process.env[envVar]);
    };
};
exports.WithBearerTokenEnvVar = WithBearerTokenEnvVar;
const NewDummyClient = (opts) => {
    return new DummyClientImpl(opts);
};
exports.NewDummyClient = NewDummyClient;
class DummyClientImpl {
    constructor(opts) {
        this.baseUrl = "";
        this.bearerToken = "";
        opts === null || opts === void 0 ? void 0 : opts.forEach(opt => opt(this));
        if (this.bearerToken === "") {
            logger_1.default.error("Bearer token is missing");
            throw new Error("Bearer token is missing");
        }
        if (this.baseUrl === "") {
            logger_1.default.error("Base URL is missing");
            throw new Error("Base URL is missing");
        }
    }
    FetchFormContents({ formId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const myPromise = new Promise((resolve, _reject) => {
                // Simulate an asynchronous operation (e.g., network request)
                setTimeout(() => {
                    resolve(dummy_types_1.dummyResponse);
                }, 1000);
            });
            return yield myPromise;
        });
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    getBearerToken() {
        return this.bearerToken;
    }
    setBearerToken(bearerToken) {
        this.bearerToken = bearerToken;
    }
}
