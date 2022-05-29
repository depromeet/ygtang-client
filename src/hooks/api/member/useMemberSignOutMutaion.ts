import { useMutation } from 'react-query';

import { COOKIE_REFRESH } from '~/constants/common';
import useCookie from '~/hooks/common/useCookie';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { del } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

export default function useMemberSiginOutMutation() {
  const { fireToast } = useToast();
  const { push } = useInternalRouter();
  const { remove: cookieRemove } = useCookie();

  return useMutation(() => del(`/v1/members/remove`), {
    onSuccess: () => {
      fireToast({ content: '계정이 삭제되었습니다!' });

      //NOTE: store의 userLogout부분과 같지만 의존성 관련한 이야기에서 서로 store와 query가 서로 종속되는것을 피하며,
      //      추후 logout로직이 달라져도, 해당 로직은 여기서 돌아가야됩니다.
      cookieRemove(COOKIE_REFRESH);
      push('/login');
    },
    onError: (error, variable, context) => {
      console.log('err', error, variable, context);
    },
  });
}
