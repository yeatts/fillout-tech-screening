import { Request, Response } from 'express'
import { NewService, WithFilloutClient } from "@/pkg/forms/service"
import { NewClient, WithBearerTokenEnvVar, WithBaseUrlEnvVar } from "@/pkg/forms/fillout/client"
// import { NewDummyClient, WithBearerTokenEnvVar, WithBaseUrlEnvVar } from "@/pkg/forms/fillout/dummy-client"
import { IService } from "@/pkg/forms/interfaces"
// import { TResponse } from "@/pkg/forms/fillout/dummy-types"
import logger from "@/utils/logger"

export async function GetResponses(req: Request, res: Response) {
  const formId = req.params.formId
  let filters = req.query.filters

  let service: IService | null
  try {
    let client
    try {
      client = NewClient([WithBearerTokenEnvVar("FILLOUT_BEARER_TOKEN"), WithBaseUrlEnvVar("FILLOUT_BASE_URL")])
    } catch (err) {
      logger.error("Error creating new fillout client: %s", err)
      throw new Error("Error creating new fillout client")
    }

    service = NewService([WithFilloutClient(client)])

    if (service === null) {
      logger.error("Service is not set")
      res.status(500).send("Service is not set")
    }
  } catch (err) {
    logger.error("Error creating new service: %o", err)
    res.status(500).send("Error creating new service")
  }

  try {
    const resp = await service!.FetchContentsWithFilters({ id: formId, filters: filters as string })
    return res.status(200).send(resp)
  } catch (err) {
    logger.error("Error fetching responses: %o", err)
    res.status(500).send("Error fetching responses")
  }
}
