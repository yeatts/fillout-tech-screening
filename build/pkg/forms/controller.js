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
exports.GetResponses = void 0;
const service_1 = require("@/pkg/forms/service");
const client_1 = require("@/pkg/forms/fillout/client");
// import { TResponse } from "@/pkg/forms/fillout/dummy-types"
const logger_1 = __importDefault(require("@/utils/logger"));
function GetResponses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const formId = req.params.formId;
        let filters = req.query.filters;
        let service;
        try {
            let client;
            try {
                client = (0, client_1.NewClient)([(0, client_1.WithBearerTokenEnvVar)("FILLOUT_BEARER_TOKEN"), (0, client_1.WithBaseUrlEnvVar)("FILLOUT_BASE_URL")]);
            }
            catch (err) {
                logger_1.default.error("Error creating new fillout client: %s", err);
                throw new Error("Error creating new fillout client");
            }
            service = (0, service_1.NewService)([(0, service_1.WithFilloutClient)(client)]);
            if (service === null) {
                logger_1.default.error("Service is not set");
                res.status(500).send("Service is not set");
            }
        }
        catch (err) {
            logger_1.default.error("Error creating new service: %o", err);
            res.status(500).send("Error creating new service");
        }
        try {
            const resp = yield service.FetchContentsWithFilters({ id: formId, filters: filters });
            return res.status(200).send(resp);
        }
        catch (err) {
            logger_1.default.error("Error fetching responses: %o", err);
            res.status(500).send("Error fetching responses");
        }
    });
}
exports.GetResponses = GetResponses;
