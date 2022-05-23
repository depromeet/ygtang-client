import { atom } from 'recoil';

export const userInformationState = atom<UserInformationType>({
  key: 'userInformationState',
  default: {
    email: '',
    nickName: '',
  },
});
