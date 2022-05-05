import { useState } from 'react';
import { css, Theme } from '@emotion/react';

import { PlusIcon } from '~/components/common/icons';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

import { Input } from '../common/TextField/Input';
import LinkThumbnail from '../LinkThumbnail';

interface OpenGraph {
  description: string;
  site_name: string;
  title: string;
  url: string;
  imageUrl?: string;
}

const TEMP_OG: OpenGraph = {
  description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
  title: '네이버',
  site_name: 'naver',
  url: 'https://www.naver.com',
  imageUrl: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
};

function PlusBtn({ onClick }: { onClick: VoidFunction }) {
  return (
    <button css={btnCss} onClick={onClick}>
      <PlusIcon color="white" />
    </button>
  );
}

export default function LinkInput() {
  const { fireToast } = useToast();
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null);
  const url = useInput({});

  const showErrorMessage = () => fireToast({ content: '유효하지 않은 주소입니다.' });

  const getOpenGraph = () => {
    validator({ value: url.value, type: 'url' }) ? setOpenGraph(TEMP_OG) : showErrorMessage();
  };

  return (
    <div css={LinkInputCss}>
      {openGraph ? (
        <LinkThumbnail thumbnail={openGraph} edit onDelete={() => setOpenGraph(null)} />
      ) : (
        <>
          <Input
            placeholder="영감이 되는 링크를 붙여 넣어보세요"
            fixedHeight={32}
            value={url.value}
            onChange={url.onChange}
          />
          <PlusBtn onClick={getOpenGraph} />
        </>
      )}
    </div>
  );
}

const LinkInputCss = css`
  position: relative;
`;

const btnCss = (theme: Theme) => css`
  position: absolute;
  inset: 0 0 auto auto;
  width: 40px;
  height: 32px;
  padding-top: 3px;
  ${`border-radius: 0 ${theme.borderRadius.default} ${theme.borderRadius.default} 0;`}
  background-color: ${theme.color.gray05};
`;
