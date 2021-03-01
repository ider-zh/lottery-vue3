/*
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-13 15:58:01
 * @LastEditors: ider
 * @LastEditTime: 2021-01-14 10:40:11
 * @Description:
 *
 */
import { ref } from 'vue';
import store from '@/store';
import { UserStoreInfo } from '@/types/user';

export const infoStoreUser = ref<UserStoreInfo>({
  nickname: store.getters['user/nickname'],
  email: store.getters['user/email'],
  dingWebHook: store.getters['user/dingWebHook'],
  avatar: store.getters['user/avatar'],
  introduction: store.getters['user/introduction'],
});

interface InfoRules {
    nickname: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
    email: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
    dingWebHook: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
    avatar: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
    introduction: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
}

// 校验规则
export const infoRules = ref<InfoRules>({
  nickname: [
    {
      type: 'string',
      message: 'Name is incorrect...',
      required: true,
      trigger: 'blur',
    },
  ],
  email: [
    {
      type: 'email',
      message: 'Email is incorrect...',
      required: true,
      trigger: 'blur',
    },
  ],
  dingWebHook: [
    {
      type: 'string',
      message: 'dingWebHook is incorrect...',
      required: false,
      trigger: 'blur',
    },
  ],
  avatar: [
    {
      type: 'string',
      message: 'avatar is incorrect...',
      required: false,
      trigger: 'blur',
    },
  ],
  introduction: [
    {
      type: 'string',
      message: 'introduction is incorrect...',
      required: false,
      trigger: 'blur',
    },
  ],
});
