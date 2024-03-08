import { Router } from 'express';
import forms from '@/api/routes/forms';

export default () => {
  const app = Router();

  forms(app)

  return app
}
