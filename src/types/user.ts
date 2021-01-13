export interface UserInfo {
  username: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  password2: string;
}

// 登录后的用户信息
export interface UserStoreInfo {
  nickname: string;
  email: string;
  dingWebHook: string;
  avatar: string;
  introduction: string;
}
