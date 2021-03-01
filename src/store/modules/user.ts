/* eslint-disable no-shadow */
/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 19:53:08
 * @LastEditors: ider
 * @LastEditTime: 2021-01-14 10:27:04
 * @Description:
 */

import {
  getToken, setToken, removeToken,
} from '@/util/auth';

import { UserInfo, UserStoreInfo } from '@/types/user';
import { login, logout, modifyInfo } from '@/api/user';

import { ElMessage } from 'element-plus';

export interface UserState {
  token: string|undefined;
  name: string;
  email: string;
  nickname: string|undefined;
  avatar: string|undefined;
  introduction: string|undefined;
  dingWebHook: string|undefined;
}

const state: UserState = {
  token: getToken(),
  name: '',
  nickname: '',
  email: '',
  avatar: '',
  introduction: '',
  dingWebHook: '',
};

const mutations = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token;
    setToken(token);
  },
  SET_NAME(state: UserState, name: string) {
    state.name = name;
  },
  SET_NICKNAME(state: UserState, name: string) {
    state.nickname = name;
  },
  SET_EMAIL(state: UserState, email: string) {
    state.email = email;
  },
  SET_INTRODUCTION(state: UserState, introduction: string) {
    state.introduction = introduction;
  },
  SET_AVATAR(state: UserState, avatar: string) {
    state.avatar = avatar;
  },
  SET_DINGWEBHOOK(state: UserState, dingWebHook: string) {
    state.dingWebHook = dingWebHook;
  },
};

const getters = {
  token: (state: UserState) => state.token,
  name: (state: UserState) => state.name,
  nickname: (state: UserState) => state.nickname,
  avatar: (state: UserState) => state.avatar,
  introduction: (state: UserState) => state.introduction,
  email: (state: UserState) => state.email,
  dingWebHook: (state: UserState) => state.dingWebHook,
};

const actions = {
  // user login
  login(ctx: Record<string, any>, userInfo: UserInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve: Function, reject: Function) => {
      login({ username: username.trim(), password }).then((response) => {
        const { data } = response;
        ctx.commit('SET_TOKEN', data.accessToken);
        ctx.commit('SET_NAME', data.username);
        ctx.commit('SET_NICKNAME', data.nickname);
        ctx.commit('SET_EMAIL', data.email);
        ctx.commit('SET_INTRODUCTION', data.introduction);
        ctx.commit('SET_AVATAR', data.avatar);
        ctx.commit('SET_DINGWEBHOOK', data.dingWebHook);
        setToken(data.accessToken);
        const hour = new Date().getHours();
        // eslint-disable-next-line no-nested-ternary
        const thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
        ElMessage.success(`欢迎登录 ${data.nickname ? data.nickname : data.username}, ${thisTime}！`);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },

  // get user info
  modifyInfo(ctx: Record<string, any>, userStoreInfo: UserStoreInfo) {
    return new Promise((resolve: Function, reject: Function) => {
      modifyInfo(userStoreInfo).then((response) => {
        const { data } = response;
        ctx.commit('SET_NAME', data.username);
        ctx.commit('SET_NICKNAME', data.nickname);
        ctx.commit('SET_EMAIL', data.email);
        ctx.commit('SET_INTRODUCTION', data.introduction);
        ctx.commit('SET_AVATAR', data.avatar);
        ctx.commit('SET_DINGWEBHOOK', data.dingWebHook);
        resolve(data);
      }).catch((error) => {
        ElMessage.error(`失败, ${error}！`);
        reject(error);
      });
    });
  },

  // user logout
  logout(ctx: Record<string, any>) {
    return new Promise((resolve: Function, reject: Function) => {
      logout().then(() => {
        ctx.commit('SET_TOKEN', '');
        ElMessage.success('再见');
        resolve();
      }).catch((error: Error) => {
        reject(error);
      });
    });
  },

  // remove token
  resetToken(ctx: Record<string, any>) {
    return new Promise((resolve: Function) => {
      ctx.commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
