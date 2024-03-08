import { IClient } from '@/pkg/forms/fillout/interfaces'
import { THeaders } from '@/pkg/forms/fillout/types'
import logger from '@/utils/logger'

export type ClientOption = (fc: ClientImpl) => void

export const WithBaseUrl = (baseUrl: string): ClientOption => {
  return (fc: ClientImpl) => {
    fc.setBaseUrl(baseUrl)
  }
}

export const WithBaseUrlEnvVar = (envVar: string): ClientOption => {
  if (process.env[envVar] === undefined || process.env[envVar] === null) {
    logger.error("Environment variable %s is not set", envVar)
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  return (fc: ClientImpl) => {
    fc.setBaseUrl(process.env[envVar] as string)
  }
}

export const WithBearerToken = (envVar: string): ClientOption => {
  if (process.env[envVar] === undefined || process.env[envVar] === null) {
    logger.error("Environment variable %s is not set", envVar)
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  return (fc: ClientImpl) => {
    fc.setBearerToken(process.env[envVar] as string)
  }
}

export const WithBearerTokenEnvVar = (envVar: string): ClientOption => {
  if (process.env[envVar] === undefined || process.env[envVar] === null) {
    logger.error("Environment variable %s is not set", envVar)
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  return (fc: ClientImpl) => {
    fc.setBearerToken(process.env[envVar] as string)
  }
}

export const NewClient = (opts?: ClientOption[]): IClient => {
  return new ClientImpl(opts);
};

class ClientImpl implements IClient {
  private baseUrl: string
  private bearerToken: string

  constructor(opts?: ClientOption[]) {
    this.baseUrl = ""
    this.bearerToken = ""

    opts?.forEach(opt => opt(this));

    if (this.bearerToken === "") {
      logger.error("Bearer token is missing")
      throw new Error("Bearer token is missing")
    }
    if (this.baseUrl === "") {
      logger.error("Base URL is missing")
      throw new Error("Base URL is missing")
    }
  }

  async FetchFormContents<T>({ formId }: { formId: string }): Promise<T> {
    const headers: THeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    }
    const url: string = `${this.baseUrl}/forms/${formId}`

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: headers
      })
      return await resp.json()
    } catch (e) {
      logger.error('Client error - Failed to fetch form contents', e)
      throw new Error('Client error - Failed to fetch form contents')
    }
  }

  getBaseUrl(): string {
    return this.baseUrl
  }

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl
  }

  getBearerToken(): string {
    return this.bearerToken
  }

  setBearerToken(bearerToken: string): void {
    this.bearerToken = bearerToken
  }
}

