export type Key = string
export type expire = number | undefined
//返回值类型
export interface Result<T> {
  message: string
  value: T | null
}
//格式化data类型
export interface Data<T> {
  value: T
  expire: number | undefined
}
//class方法约束
export interface StorageCls {
  get: <T>(key: Key) => Result<T | null>
  set: <T>(key: Key, value: T, expire?: expire) => void
  remove: (key: Key) => void
  clear: () => void
}
