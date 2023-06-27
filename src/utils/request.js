import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: "http://localhost:3000", // 添加协议
  timeout: 5000, // 请求超时时间
  withCredentials: true, // 跨域请求携带cookie
});
// 存放正在请求中的取消令牌
const pendingRequests = new Map();

// 生成请求标识符
const getRequestKey = (config) => {
  const { method, url, params, data } = config || {};
  return [url, method, qs.stringify(params), qs.stringify(data)].join("&");
};

// 将重复请求添加到pendingRequests中
const addPendingRequest = (config) => {
  const requestKey = getRequestKey(config);
  if (!pendingRequests.has(requestKey)) {
    const cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;
    pendingRequests.set(requestKey, cancelTokenSource.cancel);
  }
};

// 取消重复请求
const cancelPendingRequest = (config) => {
  const requestKey = getRequestKey(config);
  if (pendingRequests.has(requestKey)) {
    const cancelRequest = pendingRequests.get(requestKey);
    cancelRequest("Request canceled");
    pendingRequests.delete(requestKey);
  }
};

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    cancelPendingRequest(config);
    addPendingRequest(config);
    // 在请求发送之前做一些自定义处理，例如添加token等
    config.headers["Authorization"] = "Bearer token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    cancelPendingRequest(response.config);
    return response.data;
  },
  (error) => {
    if (error && error.response) {
      //   请求发生错误 message 
    }
    cancelPendingRequest(error.config);
    return Promise.reject(error);
  },
);

const request = (options) => {
  const { url, method = "get", data = {}, params = {}, ...restOptions } = options;
  try {
    const response = instance({
      url,
      method,
      params: method === "get" ? params : undefined, // 使用 undefined 替代 null
      data: method !== "get" ? qs.stringify(data) : undefined, // 使用 qs.stringify 对请求体进行序列化
      ...restOptions,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
