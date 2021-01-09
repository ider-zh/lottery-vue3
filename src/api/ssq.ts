/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-07 21:29:17
 * @LastEditors: ider
 * @LastEditTime: 2021-01-07 22:50:18
 * @Description:
 */
import request from '@/util/http';

export function getLatest() {
  return request.request({
    url: '/lottery/ssq/latest',
    method: 'get',
  });
}

export function checkAward(data: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/check',
    method: 'post',
    data,
  });
}

export function userBet(data: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/bet',
    method: 'post',
    data,
  });
}

export default {};
