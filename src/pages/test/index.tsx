import Button, {
  CTAButton,
  FilledButton,
  GhostButton,
  IconButton,
} from '~/components/common/Button';
import TextField from '~/components/common/TextField';
import NavigationBar from '~/components/common/NavigationBar';
import { useToast } from '~/store/Toast';

export default function Test() {
  const { fireToast } = useToast();

  return (
    <div>
      <NavigationBar title="Title" rightElement={<IconButton iconName="DeleteIcon" light />} />

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
      <TextField label={'라벨라벨'} placeholder={'플레이스 홀더'} />
      <br />
      <TextField
        label={'라벨라벨'}
        placeholder={'플레이스 홀더'}
        value={'성공한 상태의 input'}
        feedback={'피드백 메시지입니다. 디자인 시스템에선 에러 메세지로 표시되어 있어요.'}
        isSuccess
      />
      <br />
      <TextField as={'textarea'} rows={10} label={'라벨라벨'} placeholder={'플레이스 홀더'} />
      <br />
      <TextField
        as={'textarea'}
        rows={10}
        label={'라벨라벨'}
        placeholder={'플레이스 홀더'}
        value={'성공한 상태의 textArea'}
        isSuccess
      />
    </div>
  );
}
