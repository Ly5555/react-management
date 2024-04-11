import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse, isCancel } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/utils/request/serviceLoading";
import abortController from "./abortController";
import { useGlobalStore } from "@/stores";

export const baseURL = process.env.NODE_ENV; //服务
axios.defaults.baseURL = baseURL;
const config = {
  baseURL: baseURL,
  cancelRequest: true,
  retryCount: 3,
  retryDelay: 1000,
};
let instance = axios.create(config); // 创建axios实例

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的token,存储到状态管理库
 */
instance.interceptors.request.use(
  (config: any) => {
    abortController.addPending(config);
    config?.loading && showFullScreenLoading();
    const { token } = useGlobalStore.getState();
    return {
      ...config,
      headers: { ...config.headers, "content-type": "application/json", "x-access-token": token },
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response;
    abortController.removePending(config);
    tryHideFullScreenLoading();
    return data;
  },
  // 请求失败
  async (error: AxiosError) => {
    const { config } = error;
    abortController.removePending(config || {});
    tryHideFullScreenLoading();
    if (!isCancel(error)) {
      return againRequest(error);
    }
    return Promise.reject(error);
  },
);

// 失败重新请求
export function againRequest(error: any) {
  var config = error.config;
  if (!config || !config?.retryCount) return Promise.reject(error);

  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retryCount) {
    return Promise.reject(error);
  }
  config.__retryCount += 1;
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, config.retryDelay || 1000);
  });
  return backoff.then(function () {
    return instance.request(config);
  });
}
// 通用下载方法get
export function downloadGet(url: string, filename: string) {
  return instance
    .get(url, {
      responseType: "blob",
    })
    .then((data) => {
      console.log(data, "data");
      const content: BlobPart = data as unknown as BlobPart;
      const blob = new Blob([content]);
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        (navigator as unknown as { msSaveBlob: (blob: Blob, filename: string) => void }).msSaveBlob(
          blob,
          filename,
        );
      }
    })
    .catch((r) => {
      console.log(r, "r");
    });
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
  params?: R;
  needMask?: boolean;
  loading?: boolean;
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
export const lib = {
  async request(options: any) {
    const {
      url,
      method = "get",
      data = {},
      params = {},
      needMask = false,
      ...restOptions
    } = options;
    return await instance.request({
      url,
      method,
      [method.toLowerCase() === "get" ? "params" : "data"]: data,
      ...restOptions,
    });
  },
};

// export default request;
