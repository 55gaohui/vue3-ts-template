import { Key, expire, Result, Data, StorageCls } from '#/storage'
import { ElLoading } from 'element-plus'
let loading: { close: () => void }
export const showLoadingFun = () => {
  loading = ElLoading.service({
    lock: true,
    text: '加载中,请稍后...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
export const hideLoadingFun = () => {
  if (loading) {
    loading.close()
  }
}

//localstorage存取删除
class LStorage implements StorageCls {
  get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key)
    if (value) {
      const obj: Data<T> = JSON.parse(value)
      const now = new Date().getTime()
      if (typeof obj.expire === 'number' && obj.expire < now) {
        this.remove(key)
        return {
          message: `您的${key}已过期`,
          value: null
        }
      } else {
        //否则成功返回
        return {
          message: '成功读取',
          value: obj.value
        }
      }
    } else {
      //否则key值无效
      console.warn('key值无效')
      return {
        message: `key值无效`,
        value: null
      }
    }
  }
  //存储接受 key value 和过期时间
  /**
   *
   * @param key 存储值名称
   * @param value 存储值
   * @param expire 过期时间(单位：ms) 不传：默认永久
   */
  set<T = any>(key: Key, value: T, expire?: expire) {
    const now = expire ? new Date().getTime() + Number(expire) : expire
    const data = {
      value,
      expire: now
    }
    //存进去
    localStorage.setItem(key, JSON.stringify(data))
  }
  //清楚某一项值
  remove(key: string) {
    localStorage.removeItem(key)
  }
  //清空所有值
  clear() {
    localStorage.clear()
  }
}
export const Storage = new LStorage()
