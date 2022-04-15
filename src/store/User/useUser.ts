import { useRecoilState } from 'recoil';
import { userLoggedInState, userNameState } from './userStates';

export function useUser() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLoggedInState);
  const [name, setName] = useRecoilState(userNameState);

  return {
    isLoggedIn,
    setIsLoggedIn,
    name,
    setName,
  };
}
