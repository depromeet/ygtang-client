import { atom } from 'recoil';

export const userAccessTokenState = atom<string | undefined>({
  key: 'userAccessToken',
  default: undefined,
});

export const userRefreshTokenState = atom<string | undefined>({
  key: 'userRefreshToken',
  default: undefined,
});
