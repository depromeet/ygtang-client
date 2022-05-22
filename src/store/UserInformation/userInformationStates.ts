import { atom } from 'recoil';

export const userInformationState = atom<UserInformationInterface>({
  key: 'userInformationState',
  default: {
    email: '',
    nickName: '',
  },
});
