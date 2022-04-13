import { atom } from 'recoil';

export const userLoggedInState = atom({
  key: 'userLoggedIn',
  default: false,
});

export const userNameState = atom({
  key: 'userName',
  default: '',
});
