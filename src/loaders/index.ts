import express from 'express';
import expressLoader from '@/loaders/express'
import logger from '@/utils/logger'

export default async ({ expressApp }: { expressApp: express.Application }) => {
  expressLoader({ app: expressApp })
  logger.info('🫡 Express loaded')
}
