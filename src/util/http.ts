/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-29 20:01:07
 * @LastEditors: ider
 * @LastEditTime: 2021-01-10 01:02:35
 * @Description:
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { getToken, removeToken } from '@/util/auth';
import store from '@/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loading: any;

const startLoading = () => {
  interface Options {
    lock: boolean;
    text: string;
    background: string;
  }

  const options: Options = {
    lock: true,
    text: '加载中...',
    background: 'rgba(0,0,0,0.7)',
  };
  loading = ElLoading.service(options);
};

const endLoading = () => {
  loading.close();
};

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// 请求拦截
service.interceptors.request.use((config: AxiosRequestConfig) => {
  if (getToken() !== undefined) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = getToken(); // 让请求头携带验证token
  }
  // 加载
  startLoading();
  return config;
});

// 响应拦截
service.interceptors.response.use((response: AxiosResponse<any>) => {
  console.log('response', response.status);
  // token 过期,或者无权限

  // 结束loading
  endLoading();
  return response;
}, (error) => {
  // 结束loading
  endLoading();
  // 错误提醒
  if (error.response.status === 401) {
    removeToken();
    ElMessage.error('失去权限');

    ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      confirmButtonText: 'Re-Login',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).finally(() => {
      store.dispatch('user/resetToken').then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
    });
  } else if (error.response.status !== 200) {
    ElMessage.error(error.response?.data?.msg);
  }
  return Promise.reject(error);
});

export default service;
