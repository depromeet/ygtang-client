import Button, {
  CTAButton,
  FilledButton,
  GhostButton,
  IconButton,
} from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import LinkThumbnail from '~/components/LinkThumbnail';
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
      <LinkThumbnail
        thumbnail={{
          title: '네이버',
          url: 'https://www.naver.com',
        }}
      />
      <LinkThumbnail
        edit
        thumbnail={{
          title: '네이버',
          url: 'https://www.naver.com',
        }}
      />
      <LinkThumbnail
        thumbnail={{
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/2560px-Naver_Logotype.svg.png',
          title: '네이버',
          url: 'https://www.naver.com',
        }}
      />
      <LinkThumbnail
        edit
        thumbnail={{
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/2560px-Naver_Logotype.svg.png',
          title:
            '네이버 fjdsklfjdsalk;jdskajfkds dfkjdsakfj;dskfj;asdjfkl;dsjfkkldsajflkdsafkld;sjaf;lkjsdl;jfsdkl;fjdsl;jlk;sdjklfdsa;kl;fjsdaklfjkldsfjkldsfjkldsfjkldsfjkljklsdfjkldsklfdsjklfjkdlsfjklsdafjldsjkljkls',
          url: 'https://www.naver.com',
        }}
      />
    </div>
  );
}
