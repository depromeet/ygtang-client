import { useRecoilState, useResetRecoilState } from 'recoil';

import { signupUserState } from './signupUserState';

export default function useSignupUser() {
  const [signupUser, setSignupUser] = useRecoilState(signupUserState);
  const clearSignupUser = useResetRecoilState(signupUserState);

  return { signupUser, setSignupUser, clearSignupUser };
}
