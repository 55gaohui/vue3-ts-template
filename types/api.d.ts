export interface ListResult<T> {
  code?: number
  count?: number
  rows?: T[]
  message: string
}
