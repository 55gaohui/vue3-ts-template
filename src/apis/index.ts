import http from '@/request/http'
import { ListResult } from '#/api'
import { paramsT, UsableObj } from './types/index'
import { useRequestExt } from '@/hooks'
export const Login = (params: paramsT) => {
  return http<paramsT, ListResult<UsableObj>>('/pc/group/list', {
    method: 'GET',
    params
  })
}
export const useLogin = () => {
  return useRequestExt(Login, {
    debounceWait: 500
  })
}
