import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/utils/request/serviceLoading";
import { ResultEnum } from "@/enums/httpEnum";
import abortController from './abortController';


// 请求拦截器 引入加载圈
export const baseURL = process.env.NODE_ENV; //服务

axios.defaults.baseURL = baseURL;
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: baseURL,
  // 设置超时时间（10s）
  timeout: 1000 * 5,
  // 跨域时候允许携带凭证
  withCredentials: true
};



// 创建axios实例
let instance = axios.create(config);


/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config: any) => {
    abortController.addPending(config);
    config?.loading && showFullScreenLoading();


    return { ...config, headers: { ...config.headers, "x-access-token": 1 } };
  },
  (error: AxiosError) => {

    return Promise.reject(error)
  }
);

/**
   * @description 请求拦截器
   * 客户端发送请求 -> [请求拦截器] -> 服务器
   * token校验(JWT) : 接受服务器返回的token,存储到store/本地储存当中
   */
instance.interceptors.response.use(
  // 请求成功
  (response: AxiosResponse) => {
    const { data, config } = response;
    abortController.removePending(config);
    tryHideFullScreenLoading();

    if (data.code == ResultEnum.OVERDUE) {
      // message.error(data.msg);
      window.location.hash = "/login";
      return Promise.reject(data);
    }
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      // message.error(data.msg);
      return Promise.reject(data);
    }
    return data;
  },
  // 请求失败
  async (error: AxiosError) => {
    const { response } = error;
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

// 通用下载方法get
export function downloadGet(url: string, filename: string) {
  return instance
    .get(url, {
      responseType: 'blob'
    })
    .then((data) => {
      const content: BlobPart = data as unknown as BlobPart;
      const blob = new Blob([content]);
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = filename;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        (navigator as unknown as { msSaveBlob: (blob: Blob, filename: string) => void }).msSaveBlob(blob, filename);
      }
    })
    .catch((r) => { });
}

/**
 * 请求配置
 * @param url 路径
 * @param method 请求类型
 * @param data 请求参数
 * @param config 参数配置
 */
interface RequestParams<R> {
  url: string;
  method?: string;
  data?: R;
  loading: boolean
  config?: AxiosRequestConfig;
}
/**
 * 响应参数
 * @param code 状态码
 * @param message 提示语
 * @param data 响应数据
 * @param total 条数
 */
export type ResponseData<T> = {
  code: number;
  message: string;
  data: T;
  total: number;
};

/**
 * @method
 * @param RequestParams 请求配置
 * @returns instance 返回实例
 */
const request = async (options: any) => {

  const { url, method = "get", data = {}, params = {}, ...restOptions } = options;
  try {
    return instance.request({
      url,
      method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
      ...restOptions
    });
  } catch (error) {
    return Promise.reject(error);
  }

};

export default request;
