import Button, {
  CTAButton,
  FilledButton,
  GhostButton,
  IconButton,
} from '~/components/common/Button';
import CheckList from '~/components/common/CheckList';
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

      <Button onClick={() => fireToast({ content: '토스트 메세지' })}>토스트 발사 버튼</Button>

      <CheckList
        id="checkbox_1"
        isChecked={true}
        onToggle={checked => {
          console.log(checked);
        }}
      >
        체크 리스트
      </CheckList>
      <CheckList
        id="checkbox_2"
        isChecked={false}
        onToggle={checked => {
          console.log(checked);
        }}
        onClick={() => {}}
      >
        체크 리스트
      </CheckList>
    </div>
  );
}
