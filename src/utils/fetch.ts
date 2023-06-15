/**
 * @description: fetch
 * @return Promise
 * @Date: 2022-12-16 16:43:42
 * @LastEditors: liulu
 */

import { Toast } from 'antd-mobile'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import md5 from 'md5'
import type { NextPageContext } from 'next'

import { isServer } from '@/util/base'

import { goNativeBridge } from './jsBridge'

const { APIKey, APISerct, basePath } = globalThis.mkPageConstants

//vp接口签名验证
const getConfig_vp_sign = (config: AxiosRequestConfig) => {
  let { url = '', data, params } = config
  //去除代理标识 eg: /api/user/list => user/list
  url = url.replace(/\/[^\/]*\//, '')
  const getKsortStr = (obj: any) => {
    let strSorted = ''
    if (obj === null || obj === undefined) return strSorted
    const keys = Object.keys(obj)
    keys.sort()
    keys.forEach((key) => {
      strSorted += obj[key] ?? ''
    })
    return strSorted
  }
  const ApiTime = Math.round(new Date().getTime() / 1000).toString()
  const ApiSign = md5(`${getKsortStr(data || params)}${url}${APISerct}${ApiTime}`)

  const extraHeaders: Record<string, string> = {}
  if (!isServer) {
    const vpSource = sessionStorage.getItem('vpsource')
    if (vpSource) extraHeaders['X-Vp-Source'] = vpSource
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      ...extraHeaders,
      'Accept-ApiKey': APIKey,
      'Accept-ApiSign': ApiSign,
      'Accept-ApiTime': ApiTime,
      // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzY2M5ZWEwMC1mMmNhLTExZWQtYWViNS0zNzc0M2NhNmQzNTIiLCJpYXQiOjE2ODQxMTg1OTMsIm5iZiI6MTY4NDExODU5MywiZXhwIjoxNjg0NzIzMzkzLCJzdWIiOiIyNjkzMjk4NSJ9.haIm0AqkBi3xFNUP9ZAJqIqJwIIVtoL9e6yQXt0cDFU"
    },
  }
}

export const instance = axios.create({
  baseURL: isServer ? `http://0.0.0.0:80${basePath}` : `${window.location.origin}${basePath}`,
  timeout: 10000,
  validateStatus() {
    return true
  },
})

/** @description fetch方法(不包装返回res)
 * needLogin `未登录时是否跳转登录`
 */
export default async function fetch<T = void>(config: AxiosRequestConfig, { needLogin = true } = {}): Promise<T> {
  return instance({
    method: 'get',
    ...getConfig_vp_sign(config),
  })
    .then((r) => {
      if (!isServer && needLogin && (r.status === 401 || r.data?.code === '0020029001')) {
        goNativeBridge('goLogin')
      }
      console.log('config', config)
      return r.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

/** @description 包装fetch方法(包装返回res.data)
 * autoToast  `是否自动报错提示`
 * needLogin `未登录时是否跳转登录`
 * defaultErrorMessage `默认自动报错提示`
 */
export const fetchData = <T = void>(
  config: AxiosRequestConfig,
  { autoToast = true, needLogin = true, defaultErrorMessage = '未知错误' } = {},
): Promise<T> => {
  return fetch<T>(config, { needLogin })
    .then((r: any = {}) => {
      if (!r.success) {
        if (!isServer && autoToast)
          Toast.show({
            content: r.message || defaultErrorMessage,
            duration: 3000,
          })
        return Promise.reject(r)
      }
      return r.data
    })
    .catch((e) => {
      if (e instanceof axios.Cancel || e.__CANCEL__) return Promise.reject(e)
      if (!isServer && autoToast) {
        let message = e.message || defaultErrorMessage
        if (e.isAxiosError) message = '网络异常'
        Toast.show({
          content: e.message || defaultErrorMessage,
          duration: 3000,
        })
      }
      return Promise.reject(e)
    })
}

export const fetchWithNext = <T, P>(context: NextPageContext, fn: Function) => {
  const { headers } = context.req! || {}

  const config = {
    headers,
  }

  return (parameter?: T): Promise<any> => {
    const data = [parameter, config].filter(Boolean)
    return fn.apply(fn, data)
  }
}
