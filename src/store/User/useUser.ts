import { useRecoilState } from 'recoil';

import { userAccessTokenState, userNameState, userRefreshTokenState } from './userStates';

export function useUser() {
  const [accessToken, setAccessToken] = useRecoilState(userAccessTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(userRefreshTokenState);
  const [name, setName] = useRecoilState(userNameState);

  /**
   * 유저 로그인 시에 사용합니다.
   * @param accessToken 엑세스 토큰 값
   * @param refreshToken 리프레시 토큰 값
   */
  const userLogin = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    if (
      accessToken === undefined ||
      refreshToken === undefined ||
      accessToken === '' ||
      refreshToken === ''
    ) {
      // TODO: 에러 토큰 관리 변경
      throw Error('로그인 토큰이 올바르지 않습니다.');
    }

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  return {
    isLoggedIn: accessToken !== undefined && refreshToken !== undefined,
    name,
    setName,
    userLogin,
  };
}
