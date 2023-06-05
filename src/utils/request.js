import axios from "axios";
import qs from 'qs'
const instance = axios.create({
  baseURL:"localhost:3000",
  timeout: 5000, // 请求超时时间
  withCredentials: true, // 跨域请求携带cookie
});

// 存放正在请求中的取消令牌
const pendingRequests = new Map();

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
   
    cancelPendingRequest(config);
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
  
    return response.data;
  },
  (error) => {
    
    return Promise.reject(error);
  },
);

// 取消重复请求
const cancelPendingRequest = (config) => {
  const requestKey = getRequestKey(config);
  if (pendingRequests.has(requestKey)) {
    const cancelTokenSource = pendingRequests.get(requestKey);
    cancelTokenSource.cancel("Request canceled");
    pendingRequests.delete(requestKey);
  }
  const cancelTokenSource = axios.CancelToken.source();
  config.cancelToken = cancelTokenSource.token;
  pendingRequests.set(requestKey, cancelTokenSource);
};

// 生成请求标识符
const getRequestKey = (config) => {
  const { method, url, params } = config || {};
  return `${method}-${url}-${JSON.stringify(params)}`;
};

const request = async (options) => {
  const { url, method = "get", data = {}, params = {}, ...restOptions } = options;
  try {
    const response = await instance({
      url,
      method,
      params: method === "get" ? params : null,
      data: method !== "get" ? data : null,
      ...restOptions,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
