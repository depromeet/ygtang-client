import { css, Theme } from '@emotion/react';

import { PlusIcon } from '~/components/common/icons';
import { Input } from '~/components/common/TextField/Input';
import LinkThumbnail from '~/components/LinkThumbnail';
import useInput from '~/hooks/common/useInput';
import { OpenGraph } from '~/pages/add/link';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

// TODO openGraph 관련 api 개발 후 삭제 예정
const TEMP_OG: OpenGraph = {
  description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
  title: '네이버',
  siteName: 'naver',
  url: 'https://www.naver.com',
  imageUrl: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
};

interface LinkInputProps {
  openGraph: OpenGraph | null;
  setOpenGraph: React.Dispatch<React.SetStateAction<OpenGraph | null>>;
}

export default function LinkInput({ openGraph, setOpenGraph }: LinkInputProps) {
  const url = useInput({ useDebounce: true });

  const { fireToast } = useToast();

  const showErrorMessage = () => fireToast({ content: '유효하지 않은 주소입니다.' });

  const getOpenGraph = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    // TODO openGraph 관련 api 개발 후 수정 필요
    validator({ value: url.value, type: 'url' }) ? setOpenGraph(TEMP_OG) : showErrorMessage();
  };

  return (
    <div css={LinkInputCss}>
      {openGraph ? (
        <LinkThumbnail thumbnail={openGraph} edit onDelete={() => setOpenGraph(null)} />
      ) : (
        <form>
          <Input
            placeholder="영감이 되는 링크를 붙여 넣어보세요"
            fixedHeight={32}
            value={url.value}
            onChange={url.onChange}
          />
          <PlusBtn onClick={getOpenGraph} />
        </form>
      )}
    </div>
  );
}

function PlusBtn({
  onClick,
}: {
  onClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}) {
  return (
    <button css={btnCss} onClick={onClick} type="submit">
      <PlusIcon color="white" />
    </button>
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
