import { CTAButton } from '~/components/common/Button';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { replaceAccessTokenForRequestInstance } from '~/libs/api/client';

export default function UserTestPage() {
  const { push } = useInternalRouter();
  const makeExpireAccessToken = () => {
    console.log('변경');

    replaceAccessTokenForRequestInstance(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sIm1lbWJlcl9pZCI6MywiaWF0IjoxNjUzMDczOTAyLCJleHAiOjE2NTMwNzc1MDJ9.hyMRA4fuQ4K91O-OtxnxtdYOXT-r_k0toNsHTomsLRs'
    );
  };
  return (
    <>
      <CTAButton onClick={() => push('/')}>메인으로 가기</CTAButton>
      <CTAButton onClick={makeExpireAccessToken}>accessToken 만료시키기</CTAButton>
    </>
  );
}
