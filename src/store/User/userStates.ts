import { atom } from 'recoil';

export const userAccessTokenState = atom<string | undefined>({
  key: 'userLoggedIn',
  default: undefined,
});

export const userRefreshTokenState = atom<string | undefined>({
  key: 'userLoggedIn',
  default: undefined,
});

export const userNameState = atom<string | undefined>({
  key: 'userName',
  default: undefined,
});
