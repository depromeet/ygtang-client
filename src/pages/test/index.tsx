import { PropsWithChildren, useEffect, useState } from 'react';
import { css } from '@emotion/react';

import Button, {
  CTAButton,
  FilledButton,
  GhostButton,
  IconButton,
} from '~/components/common/Button';
import { CTABottomButton } from '~/components/common/Button/CTABottomButton';
import CheckList from '~/components/common/CheckList';
import { SearchIcon } from '~/components/common/icons';
import NavigationBar from '~/components/common/NavigationBar';
import TextField, { MemoText } from '~/components/common/TextField';
import { SearchBar } from '~/components/common/TextField/SearchBar';
import LinkThumbnail from '~/components/LinkThumbnail';
import { useUserAgent } from '~/hooks/common/useUserAgent';
import { useToast } from '~/store/Toast';
import theme from '~/styles/Theme';

export default function Test() {
  const { fireToast } = useToast();
  const { isMobile, isIos, isAndroid, isDesktop } = useUserAgent();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <NavigationBar title="Title" rightElement={<IconButton iconName="DeleteIcon" light />} />
      <TestItem name="UserAgent">
        <p>isMobile: {isMobile() ? 'true' : 'false'}</p>
        <p>isIos: {isIos() ? 'true' : 'false'}</p>
        <p>isAndroid: {isAndroid() ? 'true' : 'false'}</p>
        <p>isDesktop: {isDesktop() ? 'true' : 'false'}</p>
      </TestItem>
      <TestItem name="Button">
        <Button>텍스트 버튼</Button>

        <GhostButton>고스트 라지</GhostButton>
        <GhostButton size="medium">고스트 미듐</GhostButton>
        <GhostButton size="small">고스트 스몰</GhostButton>

        <CTAButton>CTA 버튼</CTAButton>
        <CTAButton disabled>CTA 버튼 비활성화</CTAButton>

        <CTABottomButton>CTA Bottom 버튼(ios)</CTABottomButton>
        <CTABottomButton>CTA Bottom 버튼(그 외)</CTABottomButton>

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
      <FilledButton>Filled 버튼</FilledButton>
      <FilledButton colorType="light">Filled 버튼 라이트</FilledButton>

      <hr />

      <Button onClick={() => fireToast({ content: '토스트 메세지' })}>토스트 발사 버튼</Button>

      <hr />
      <TextField readOnly label={'라벨라벨'} placeholder={'플레이스 홀더'} />
      <br />
      <TextField
        readOnly
        label={'라벨라벨'}
        placeholder={'플레이스 홀더'}
        value={'성공한 상태의 input'}
        feedback={'피드백 메시지입니다. 디자인 시스템에선 에러 메세지로 표시되어 있어요.'}
        isSuccess
      />
      <br />
      <TextField
        readOnly
        label={'라벨벨'}
        placeholder={'검색'}
        feedback={'검색을 만들 땐 이렇게 사용하겠죠?'}
        preAppend={
          <div
            css={css`
              padding: 1px;
              color: ${theme.color.gray04};
            `}
          >
            <SearchIcon size={24} />
          </div>
        }
        isSuccess
      />
      <br />
      <TextField
        readOnly
        as={'textarea'}
        rows={10}
        label={'라벨라벨'}
        placeholder={'플레이스 홀더'}
      />
      <br />
      <TextField
        readOnly
        as={'textarea'}
        rows={10}
        label={'라벨라벨'}
        placeholder={'플레이스 홀더'}
        value={'성공한 상태의 textArea'}
        isSuccess
      />
      <CheckList
        isChecked={true}
        onToggle={checked => {
          console.log(checked);
        }}
      >
        체크 리스트
      </CheckList>
      <CheckList
        isChecked={false}
        onToggle={checked => {
          console.log(checked);
        }}
        onClick={() => {}}
      >
        체크 리스트
      </CheckList>
      <SearchBar readOnly value={'asdasdasd'} />
      <MemoText editable wordLimit={150} />
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
