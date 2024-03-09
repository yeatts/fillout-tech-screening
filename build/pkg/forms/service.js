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
exports.NewService = exports.WithFilloutClient = void 0;
const moment_1 = __importDefault(require("moment"));
const dummy_client_1 = require("@/pkg/forms/fillout/dummy-client");
const types_1 = require("@/pkg/forms/fillout/types");
// import { TFilters, TQuestion, TFilterCondition } from '@/pkg/forms/fillout/dummy-types'
const logger_1 = __importDefault(require("@/utils/logger"));
const WithFilloutClient = (client) => {
    return (si) => {
        si.setClient(client);
    };
};
exports.WithFilloutClient = WithFilloutClient;
const NewService = (opts) => {
    return new ServiceImpl(opts);
};
exports.NewService = NewService;
class ServiceImpl {
    constructor(opts) {
        try {
            // create default dummy client
            this.client = (0, dummy_client_1.NewDummyClient)([(0, dummy_client_1.WithBearerTokenEnvVar)("FILLOUT_BEARER_TOKEN"), (0, dummy_client_1.WithBaseUrlEnvVar)("FILLOUT_BASE_URL")]);
        }
        catch (err) {
            logger_1.default.error("Error creating new dummy default client: %o", err);
            throw new Error("Error creating new dummy default client");
        }
        // apply options
        opts === null || opts === void 0 ? void 0 : opts.forEach(opt => opt(this));
        if (this.client === null) {
            logger_1.default.error("Client is not set");
            throw new Error("Client is not set");
        }
    }
    FetchContentsWithFilters({ id, filters }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filtersArr = JSON.parse(filters);
            // fetch contents from fillout api
            const data = yield this.fetchFormContents(id);
            // filter out question responses
            const resp = this.filterResponses(data, filtersArr);
            return resp;
        });
    }
    fetchFormContents(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.client.FetchFormContents({ formId: id });
                return data;
            }
            catch (err) {
                logger_1.default.error("Service error fetching form contents: %o", err);
                throw new Error("Service error fetching form contents");
            }
        });
    }
    filterResponses(payload, filters) {
        // Pre-process filters into a Map for efficiency
        const filterMap = new Map(filters.map(filter => [filter.id, filter]));
        const resp = {
            responses: [],
            totalResponses: 0,
            pageCount: 0
        };
        // do the logic
        resp.responses = payload.questions.filter((question) => {
            if (question.options) {
                return question.options.find((option) => {
                    const filter = filterMap.get(option.id);
                    return filter ? this.applyFilterConditionToOption(option, filter) : false;
                });
            }
            const filter = filterMap.get(question.id);
            return filter ? this.applyFilterCondition(question, filter) : false;
        });
        // maybe this isn't the most efficient way to do this
        resp.totalResponses = resp.responses.length;
        return resp;
    }
    applyFilterCondition(question, filter) {
        switch (question.type) {
            case 'ShortAnswer':
            case 'LongAnswer':
            case 'EmailInput':
                return filter.condition === types_1.TFilterCondition.Equals && question.value === filter.value;
            case 'DatePicker':
                if (!this.isValidISODateString(question.value)) {
                    logger_1.default.warn(`Invalid date string: ${question.value}`);
                    return false;
                }
                const questionDate = (0, moment_1.default)(question.value);
                const filterDate = (0, moment_1.default)(filter.value);
                if (filter.condition === types_1.TFilterCondition.Equals) {
                    return questionDate.isSame(filterDate);
                }
                else if (filter.condition === types_1.TFilterCondition.GreaterThan) {
                    return questionDate.isAfter(filterDate);
                }
                else if (filter.condition === types_1.TFilterCondition.LessThan) {
                    return questionDate.isBefore(filterDate);
                }
                else {
                    logger_1.default.warn(`Unsupported date filter condition: ${filter.condition}`);
                    return false;
                }
            case 'NumberInput':
                return filter.condition === types_1.TFilterCondition.Equals && Number(question.value) === Number(filter.value);
            case 'MultipleChoice':
                return filter.condition === types_1.TFilterCondition.Equals && question.value === filter.value; // Assuming user can only pick one option
            default:
                logger_1.default.warn(`Unsupported question type: ${question.type}`);
                return false;
        }
    }
    applyFilterConditionToOption(option, filter) {
        if (filter.condition === types_1.TFilterCondition.Equals) {
            return option.value === filter.value;
        }
        else if (filter.condition === types_1.TFilterCondition.GreaterThan) { // Assuming an option isn't going to be a date
            return Number(option.value) > Number(filter.value);
        }
        else if (filter.condition === types_1.TFilterCondition.LessThan) {
            return Number(option.value) < Number(filter.value);
        }
        else {
            logger_1.default.warn(`Unsupported option filter condition: ${filter.condition}`);
            return false;
        }
    }
    isValidISODateString(str) {
        return (0, moment_1.default)(str, moment_1.default.ISO_8601, true).isValid();
    }
    getClient() {
        return this.client;
    }
    setClient(client) {
        this.client = client;
    }
}
