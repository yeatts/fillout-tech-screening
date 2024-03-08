import { TQuestion as TClientQuestion } from '@/pkg/forms/fillout/types'

export type TResponse = {
  responses: TClientQuestion[];
  totalResponses: number;
  pageCount: number;
}
