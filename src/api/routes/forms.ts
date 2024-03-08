import { Router, Request, Response } from 'express';
import logger from '@/utils/logger'
import { GetResponses } from '@/pkg/forms/controller'
import { formFilterValidate } from '@/api/middleware/forms'

const route = Router();

export default (app: Router) => {
  app.use("/forms", route);

  route.post('/:formId/filteredResponses', formFilterValidate, GetResponses)

  route.get('/health',
    (_req: Request, res: Response) => {
      logger.info('Health check')
      res.status(200).end();
    }
  )

}
