"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFilterValidate = void 0;
const celebrate_1 = require("celebrate");
const logger_1 = __importDefault(require("@/utils/logger"));
function formFilterValidate(req, res, next) {
    const formIdSchema = celebrate_1.Joi.string().required();
    // make this into a generic
    const filterSchema = celebrate_1.Joi.object({
        id: celebrate_1.Joi.string().required(),
        condition: celebrate_1.Joi.string().valid('equals', 'does_not_equal', 'greater_than', 'less_than').required(),
        value: celebrate_1.Joi.alternatives().try(celebrate_1.Joi.number(), celebrate_1.Joi.string()).required()
    });
    const filtersArraySchema = celebrate_1.Joi.array().items(filterSchema).required();
    return (0, celebrate_1.celebrate)({
        params: {
            formId: formIdSchema
        },
        query: {
            filters: celebrate_1.Joi.string()
        }
    })(req, res, (err) => {
        if (err) {
            // Default Celebrate error handling (returns 400 with error details)
            return next(err);
        }
        if (req.query.filters) {
            try {
                const parsedFilters = JSON.parse(req.query.filters);
                const { error } = filtersArraySchema.validate(parsedFilters);
                if (error) {
                    return res.status(400).json({ error: error.details.map(d => d.message) });
                }
            }
            catch (err) {
                logger_1.default.error('Invalid filters format', err);
                return res.status(400).json({ error: 'Invalid filters format' });
            }
        }
        next();
    });
}
exports.formFilterValidate = formFilterValidate;
