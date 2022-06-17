import { atom } from 'recoil';

interface SignupUserState {
  nickName: string;
  password: string;
  confirmPassword: string;
}

export const signupUserState = atom<SignupUserState | null>({
  key: 'signupUserState',
  default: null,
});
