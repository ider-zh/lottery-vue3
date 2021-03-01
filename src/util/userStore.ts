/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-13 16:48:06
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 16:57:44
 * @Description: 整合 getters commputed
 */
import store from '@/store';
import { computed } from 'vue';

export const token = computed(() => store.getters['user/token']);
export const name = computed(() => store.getters['user/name']);
export const email = computed(() => store.getters['user/email']);
export const nickname = computed(() => store.getters['user/nickname']);
export const avatar = computed(() => store.getters['user/avatar']);
export const introduction = computed(() => store.getters['user/introduction']);
export const dingWebHook = computed(() => store.getters['user/dingWebHook']);
