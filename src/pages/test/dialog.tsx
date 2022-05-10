import { FilledButton } from '~/components/common/Button';
import IllustDialog from '~/components/common/IllustDialog';

export default function DialogTestPage() {
  return (
    <IllustDialog
      isShowing={true}
      image={'https://i.imgur.com/LbBxqvv.png'}
      actionButtons={
        <>
          <FilledButton colorType="light">취소</FilledButton>
          <FilledButton colorType="dark">다시 인증</FilledButton>
        </>
      }
    >
      정말 로그아웃 하시겠어요?
    </IllustDialog>
  );
}
