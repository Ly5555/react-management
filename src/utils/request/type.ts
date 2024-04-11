/*
 * @Author: Lyq
 * @Date: 2024-04-11 22:10:54
 * @LastEditors: Lyq
 * @LastEditTime: 2024-04-11 22:11:04
 */
import { AxiosRequestConfig } from "axios";

export interface MyRequestConfig extends AxiosRequestConfig {
  cancelRequest?: boolean; // 添加一个可选的 cancelRequest 属性
}
