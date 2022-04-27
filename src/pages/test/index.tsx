import { useToast } from '~/store/Toast';

export default function Test() {
  const { fireToast } = useToast();

  return (
    <div>
      <button onClick={() => fireToast({ content: '토스트 메세지' })}>토스트 발사</button>
    </div>
  );
}
