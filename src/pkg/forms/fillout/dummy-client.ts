import { IClient } from '@/pkg/forms/fillout/interfaces'
import logger from '@/utils/logger'
import { dummyResponse } from '@/pkg/forms/fillout/dummy-types'
import { TResponse } from "@/pkg/forms/fillout/dummy-types"

export type ClientOption = (fc: DummyClientImpl) => void

export const WithBaseUrl = (baseUrl: string): ClientOption => {
  return (fc: DummyClientImpl) => {
    fc.setBaseUrl(baseUrl)
  }
}

export const WithBaseUrlEnvVar = (envVar: string): ClientOption => {
  if (process.env[envVar] === undefined || process.env[envVar] === null) {
    logger.error("Environment variable %s is not set", envVar)
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  return (fc: DummyClientImpl) => {
    fc.setBaseUrl(process.env[envVar] as string)
  }
}

export const WithBearerToken = (envVar: string): ClientOption => {
  if (process.env[envVar] === undefined || process.env[envVar] === null) {
    logger.error("Environment variable %s is not set", envVar)
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  return (fc: DummyClientImpl) => {
    fc.setBearerToken(process.env[envVar] as string)
  }
}

export const WithBearerTokenEnvVar = (envVar: string): ClientOption => {
  if (process.env[envVar] === undefined || process.env[envVar] === null) {
    logger.error("Environment variable %s is not set", envVar)
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  return (fc: DummyClientImpl) => {
    fc.setBearerToken(process.env[envVar] as string)
  }
}

export const NewDummyClient = (opts?: ClientOption[]): IClient => {
  return new DummyClientImpl(opts);
};

class DummyClientImpl implements IClient {
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
    const myPromise = new Promise<T>((resolve, _reject) => {
      // Simulate an asynchronous operation (e.g., network request)
      setTimeout(() => {
        resolve(dummyResponse as T);
      }, 1000);
    });

    return await myPromise
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

