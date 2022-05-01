import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';

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
      <TestItem name="Button">
        <Button>텍스트 버튼</Button>

        <GhostButton>고스트 라지</GhostButton>
        <GhostButton size="medium">고스트 미듐</GhostButton>
        <GhostButton size="small">고스트 스몰</GhostButton>

        <CTAButton>CTA 버튼</CTAButton>
        <CTAButton disabled>CTA 버튼 비활성화</CTAButton>

        <FilledButton>Filled 버튼</FilledButton>
        <FilledButton colorType="light">Filled 버튼 라이트</FilledButton>
      </TestItem>
      <TestItem name="Toast">
        <Button onClick={() => fireToast({ content: '토스트 메세지' })}>토스트 발사 버튼</Button>
      </TestItem>
      <TestItem name="LinkThumbnail">
        <LinkThumbnail
          thumbnail={{
            title: '글만 있는 경우',
            url: 'https://www.naver.com',
          }}
        />
        <LinkThumbnail
          edit
          thumbnail={{
            title: '글만 있는 경우, 수정',
            url: 'https://www.naver.com',
          }}
        />
        <LinkThumbnail
          thumbnail={{
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/2560px-Naver_Logotype.svg.png',
            title: '이미지 있는 경우',
            url: 'https://www.naver.com',
          }}
        />
        <LinkThumbnail
          edit
          thumbnail={{
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/2560px-Naver_Logotype.svg.png',
            title: '이미지 있는 경우, 수정',
            url: 'https://www.naver.com',
          }}
        />
        <LinkThumbnail
          edit
          thumbnail={{
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/2560px-Naver_Logotype.svg.png',
            title:
              '텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, 네이버 텍스트가 넘치는 경우, ',
            url: 'https://www.naver.comhttps://www.naver.comhttps://www.naver.comhttps://www.naver.comhttps://www.naver.comhttps://www.naver.comhttps://www.naver.com',
          }}
        />
      </TestItem>
    </div>
  );
}

const TestItem = ({ children, name }: PropsWithChildren<{ name: string }>) => {
  return (
    <div
      css={css`
        & > * {
          margin-bottom: 5px;
        }
      `}
    >
      <h2
        css={css`
          margin: 10px 0;
        `}
      >
        {name}
      </h2>
      {children}
      <hr />
    </div>
  );
};
