/* eslint-disable no-shadow */
/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 19:53:08
 * @LastEditors: ider
 * @LastEditTime: 2021-01-06 10:17:05
 * @Description:
 */

import {
  getToken, setToken, removeToken,
} from '@/util/auth';

import { UserInfo } from '@/types/user';
import { login, logout } from '@/api/user';

import { ElMessage } from 'element-plus';

export interface UserState {
  token: string|undefined;
  name: string;
  avatar: string;
  introduction: string;
  email: string;
}

const state: UserState = {
  token: getToken(),
  name: '',
  email: '',
  avatar: '',
  introduction: '',
};

const mutations = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token;
    setToken(token);
  },
  SET_NAME(state: UserState, name: string) {
    state.name = name;
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
};

const getters = {
  token: (state: UserState) => state.token,
  name: (state: UserState) => state.name,
  avatar: (state: UserState) => state.avatar,
  introduction: (state: UserState) => state.introduction,
  email: (state: UserState) => state.email,
};

const actions = {
  // user login
  login(ctx: Record<string, any>, userInfo: UserInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve: Function, reject: Function) => {
      login({ username: username.trim(), password }).then((response) => {
        const { data } = response;
        ctx.commit('SET_TOKEN', data.accessToken);
        setToken(data.accessToken);
        const hour = new Date().getHours();
        // eslint-disable-next-line no-nested-ternary
        const thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
        ElMessage.success(`欢迎登录, ${thisTime}！`);

        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve: Function, reject: Function) => {
  //     getInfo(state.token).then((response) => {
  //       const { data } = response;

  //       if (!data) {
  //         reject('Verification failed, please Login again.');
  //       }

  //       const {
  //         roles, name, avatar, introduction,
  //       } = data;

  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!');
  //       }

  //       commit('SET_NAME', name);
  //       commit('SET_AVATAR', avatar);
  //       commit('SET_INTRODUCTION', introduction);
  //       resolve(data);
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // },

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
