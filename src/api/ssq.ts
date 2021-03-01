/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-07 21:29:17
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 20:05:13
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

export function freezeForever(params: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/foreverbets/freeze',
    method: 'get',
    params,
  });
}

export function userBet(data: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/bet',
    method: 'post',
    data,
  });
}

export function getUserForeverBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/foreverbets',
    method: 'get',
    params,
  });
}

export function deleteUserForeverBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/foreverbets',
    method: 'delete',
    params,
  });
}

export function getUserBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/bets',
    method: 'get',
    params,
  });
}

export function deleteUserBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/ssq/bets',
    method: 'delete',
    params,
  });
}

export default {};
