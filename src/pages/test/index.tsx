import Button, { CTAButton, FilledButton, GhostButton } from '~/components/common/Button';
import { useToast } from '~/store/Toast';

export default function Test() {
  const { fireToast } = useToast();

  return (
    <div>
      <Button>텍스트 버튼</Button>

      <GhostButton>고스트 라지</GhostButton>
      <GhostButton size="medium">고스트 미듐</GhostButton>
      <GhostButton size="small">고스트 스몰</GhostButton>

      <CTAButton>CTA 버튼</CTAButton>
      <CTAButton disabled>CTA 버튼 비활성화</CTAButton>

      <FilledButton>Filled 버튼</FilledButton>
      <FilledButton colorType="light">Filled 버튼 라이트</FilledButton>

      <Button onClick={() => fireToast({ content: '토스트 메세지' })}>토스트 발사 버튼</Button>
    </div>
  );
}
