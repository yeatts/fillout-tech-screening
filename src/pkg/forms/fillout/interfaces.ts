export interface IClient {
  FetchFormContents<T>({ formId }: { formId: string }): Promise<T>
}
