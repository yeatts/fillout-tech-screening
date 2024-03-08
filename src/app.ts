import express from 'express';
import logger from "@/utils/logger"
import config from "@/config"
import loaders from "@/loaders"

const startServer = async () => {
  const app = express();

  // load dependencies
  await loaders({ expressApp: app })

  app.listen(config.port, () => {
    logger.info(`Server 👂 at http://localhost:${config.port}`)
  }).on('error', err => {
    logger.error(err)
    process.exit(1)
  });
}

startServer()
