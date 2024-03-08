import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from "celebrate"
import logger from "@/utils/logger"

export function formFilterValidate<T>(req: Request, res: Response, next: NextFunction) {
  const formIdSchema = Joi.string().required();

  // make this into a generic
  const filterSchema = Joi.object({
    id: Joi.string().required(),
    condition: Joi.string().valid('equals', 'does_not_equal', 'greater_than', 'less_than').required(),
    value: Joi.alternatives().try(Joi.number(), Joi.string()).required()
  });

  const filtersArraySchema = Joi.array().items(filterSchema).required();

  return celebrate({
    params: {
      formId: formIdSchema
    },
    query: {
      filters: Joi.string()
    }
  })(req, res, (err) => {
    if (err) {
      // Default Celebrate error handling (returns 400 with error details)
      return next(err);
    }

    if (req.query.filters) {
      try {
        const parsedFilters: T = JSON.parse(req.query.filters as string);
        const { error } = filtersArraySchema.validate(parsedFilters);

        if (error) {
          return res.status(400).json({ error: error.details.map(d => d.message) });
        }
      } catch (err) {
        logger.error('Invalid filters format', err)
        return res.status(400).json({ error: 'Invalid filters format' });
      }
    }

    next()
  });

}
