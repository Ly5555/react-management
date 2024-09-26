/*
 * @Author: Lyq
 * @Date: 2024-04-08 22:35:33
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-12 19:44:24
 */
import axios, { Axios, AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";
import { MyRequestConfig } from "./type";
// 用于存储每个请求的标识和取消函数
const pendingMap = new Map<string, Canceler>();

// 生成url 防止出现重复url
const getPendingUrl = (config: AxiosRequestConfig) => {
  return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join(
    "&",
  );
};

export class AxiosCanceler {
  /**
   * 添加请求
   * @param config 请求配置
   */
  public addPending(config: MyRequestConfig): void {
    const url = getPendingUrl(config);
    if (config.cancelRequest) {
      if (pendingMap.has(url)) {
        const cancel = pendingMap.get(url);
        cancel && cancel(`${config.url} 请求已取消`);
        pendingMap.delete(url);
      }
      config.cancelToken = new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
    }
  }

  /**
   * @description: 清除所有等待中的请求
   */
  public removeAllPending(): void {
    pendingMap.forEach((cancel) => {
      cancel && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 移除请求
   * @param config 请求配置
   */
  public removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
}

const abortController = new AxiosCanceler();
export default abortController;
