declare global {
  interface PageQuery {
    pageNum: number
    pageSize: number
  }
  interface pageResult<T> {
    list: T
    total: number
  }
}
