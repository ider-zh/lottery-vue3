/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 20:13:54
 * @LastEditors: ider
 * @LastEditTime: 2021-01-04 01:54:53
 * @Description:
 */
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken(): string | undefined {
  return Cookies.get(TokenKey);
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
