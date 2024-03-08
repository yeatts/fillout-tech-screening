import express from 'express';
import { NotFoundError } from '@/errors'
import config from '@/config'
import routes from '@/api/routes'

export default ({ app }: { app: express.Application }) => {
  // Health Check endpoints
  app.get('/health', (_req, res) => {
    res.status(200).send("OK").end();
  });
  app.head('/health', (_req, res) => {
    res.status(200).end();
  });

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((_req, _res, next: express.NextFunction) => {
    const err = new NotFoundError('Not Found');
    err.setStatus(404)
    next(err);
  });

  // error handlers
  app.use((err: NotFoundError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(err.getStatus() || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

