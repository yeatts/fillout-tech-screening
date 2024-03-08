import moment from 'moment'
import { IService } from '@/pkg/forms/interfaces'
import { IClient } from '@/pkg/forms/fillout/interfaces'
import { NewDummyClient, WithBearerTokenEnvVar, WithBaseUrlEnvVar } from '@/pkg/forms/fillout/dummy-client'
// import { NewClient, WithBearerTokenEnvVar, WithBaseUrlEnvVar } from '@/pkg/forms/fillout/client'
import { TResponse as TServiceResponse } from '@/pkg/forms/types'
import { TResponse as TClientResponse, TFilters, TFilter, TFilterCondition, TQuestion, TOption } from '@/pkg/forms/fillout/types'
// import { TFilters, TQuestion, TFilterCondition } from '@/pkg/forms/fillout/dummy-types'
import logger from "@/utils/logger"

export type ServiceOption = (si: ServiceImpl) => void

export const WithFilloutClient = (client: IClient): ServiceOption => {
  return (si: ServiceImpl) => {
    si.setClient(client)
  }
}

export const NewService = (opts?: ServiceOption[]): IService | null => {
  return new ServiceImpl(opts);
}

class ServiceImpl implements IService {
  private client: IClient | null

  constructor(opts?: ServiceOption[]) {
    try {
      // create default dummy client
      this.client = NewDummyClient([WithBearerTokenEnvVar("FILLOUT_BEARER_TOKEN"), WithBaseUrlEnvVar("FILLOUT_BASE_URL")])
    } catch (err) {
      logger.error("Error creating new dummy default client: %o", err)
      throw new Error("Error creating new dummy default client")
    }

    // apply options
    opts?.forEach(opt => opt(this));

    if (this.client === null) {
      logger.error("Client is not set")
      throw new Error("Client is not set")
    }
  }

  async FetchContentsWithFilters({ id, filters }: { id: string, filters: string }): Promise<TServiceResponse> {
    const filtersArr: TFilters = JSON.parse(filters)

    // fetch contents from fillout api
    const data = await this.fetchFormContents<TClientResponse>(id)

    // filter out question responses
    const resp = this.filterResponses(data, filtersArr)

    return resp
  }

  private async fetchFormContents<T>(id: string): Promise<T> {
    try {
      const data = await this.client!.FetchFormContents<T>({ formId: id })

      return data
    } catch (err) {
      logger.error("Service error fetching form contents: %o", err)
      throw new Error("Service error fetching form contents")
    }
  }

  private filterResponses(payload: TClientResponse, filters: TFilters) {
    // Pre-process filters into a Map for efficiency
    const filterMap = new Map(filters.map(filter => [filter.id, filter]));
    const resp: TServiceResponse = {
      responses: [],
      totalResponses: 0,
      pageCount: 0
    }

    // do the logic
    resp.responses = payload.questions.filter((question: TQuestion) => {
      if (question.options) {
        return question.options.find((option: TOption) => {
          const filter = filterMap.get(option.id)
          return filter ? this.applyFilterConditionToOption(option, filter) : false
        })
      }
      const filter = filterMap.get(question.id);
      return filter ? this.applyFilterCondition(question, filter) : false;
    });

    // maybe this isn't the most efficient way to do this
    resp.totalResponses = resp.responses.length

    return resp
  }

  applyFilterCondition(question: TQuestion, filter: TFilter) {
    switch (question.type) {
      case 'ShortAnswer':
      case 'LongAnswer':
      case 'EmailInput':
        return filter.condition === TFilterCondition.Equals && question.value === filter.value;
      case 'DatePicker':
        if (!this.isValidISODateString(question.value as string)) {
          logger.warn(`Invalid date string: ${question.value}`);
          return false;
        }

        const questionDate = moment(question.value);
        const filterDate = moment(filter.value);

        if (filter.condition === TFilterCondition.Equals) {
          return questionDate.isSame(filterDate);
        } else if (filter.condition === TFilterCondition.GreaterThan) {
          return questionDate.isAfter(filterDate);
        } else if (filter.condition === TFilterCondition.LessThan) {
          return questionDate.isBefore(filterDate);
        } else {
          logger.warn(`Unsupported date filter condition: ${filter.condition}`);
          return false;
        }
      case 'NumberInput':
        return filter.condition === TFilterCondition.Equals && Number(question.value) === Number(filter.value);
      case 'MultipleChoice':
        return filter.condition === TFilterCondition.Equals && question.value === filter.value; // Assuming user can only pick one option
      default:
        logger.warn(`Unsupported question type: ${question.type}`);
        return false;
    }
  }

  applyFilterConditionToOption(option: TOption, filter: TFilter) {
    if (filter.condition === TFilterCondition.Equals) {
      return option.value === filter.value
    } else if (filter.condition === TFilterCondition.GreaterThan) { // Assuming an option isn't going to be a date
      return Number(option.value) > Number(filter.value)
    } else if (filter.condition === TFilterCondition.LessThan) {
      return Number(option.value) < Number(filter.value)
    } else {
      logger.warn(`Unsupported option filter condition: ${filter.condition}`);
      return false;
    }
  }

  isValidISODateString(str: string) {
    return moment(str, moment.ISO_8601, true).isValid();
  }

  getClient(): IClient | null {
    return this.client
  }

  setClient(client: IClient): void {
    this.client = client
  }
}
