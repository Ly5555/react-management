import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout:5000 // 设置超时时间为 5 秒
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以进行一些处理，例如添加身份验证信息等
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  },
);
// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理，例如处理错误码等
    return response.data;
  },
  (error) => {
    // 响应错误处理
    return Promise.reject(error);
  },
);
const request = axios.create({});

export default request;
