import { TResponse as TServiceResponse } from '@/pkg/forms/types'

export interface IService {
  FetchContentsWithFilters({ id, filters }: { id: string, filters: string }): Promise<TServiceResponse>
}
