import Button, { CTAButton, FilledButton, GhostButton } from '~/components/common/Button';
import { Input } from '~/components/common/TextField/Input';
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

      <hr />

      <Button onClick={() => fireToast({ content: '토스트 메세지' })}>토스트 발사 버튼</Button>

      <hr />

      <Input placeholder={'이것은 input 이랍니다'} />
      <br />
      <Input as="textarea" placeholder={'이것은 textarea 에요'} rows={10} />
    </div>
  );
}
