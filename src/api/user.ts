import { UserInfo, UserStoreInfo } from '@/types/user';

/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-05 19:53:35
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 16:53:19
 * @Description:
 */

import request from '@/util/http';

export function login(data: UserInfo) {
  return request.request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function register(data: UserInfo) {
  return request.request({
    url: '/user/register',
    method: 'post',
    data,
  });
}

export function modifyInfo(data: UserStoreInfo) {
  return request.request({
    url: '/user/modify',
    method: 'post',
    data,
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  });
}

export default {};
