/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-07 21:29:17
 * @LastEditors: ider
 * @LastEditTime: 2021-03-02 01:49:51
 * @Description:
 */
import request from '@/util/http';

export function getLatest() {
  return request.request({
    url: '/lottery/lotto/latest',
    method: 'get',
  });
}

export function checkAward(data: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/check',
    method: 'post',
    data,
  });
}

export function userBet(data: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/bet',
    method: 'post',
    data,
  });
}

export function getUserForeverBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/foreverbets',
    method: 'get',
    params,
  });
}

export function deleteUserForeverBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/foreverbets',
    method: 'delete',
    params,
  });
}

export function getUserBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/bets',
    method: 'get',
    params,
  });
}

export function freezeForever(params: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/foreverbets/freeze',
    method: 'get',
    params,
  });
}

export function deleteUserBets(params: Record<string, any>) {
  return request.request({
    url: '/lottery/lotto/bets',
    method: 'delete',
    params,
  });
}

export default {};
