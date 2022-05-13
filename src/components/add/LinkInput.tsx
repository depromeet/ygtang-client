import { useCallback, useEffect } from 'react';
import { css, Theme } from '@emotion/react';

import { PlusIcon } from '~/components/common/icons';
import { Input } from '~/components/common/TextField/Input';
import LinkThumbnail from '~/components/LinkThumbnail';
import { useCheckLinkAvailable } from '~/hooks/api/inspiration/useCheckLinkAvailable';
import useInput from '~/hooks/common/useInput';
import { OpenGraph } from '~/pages/add/link';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

interface LinkInputProps {
  openGraph: OpenGraph | null;
  saveOpenGraph: (og: OpenGraph | null) => void;
}

export default function LinkInput({ openGraph, saveOpenGraph }: LinkInputProps) {
  const url = useInput({ useDebounce: true });
  const { openGraph: og, refetch, isFetching } = useCheckLinkAvailable({ link: url.value });

  const { fireToast } = useToast();

  const showErrorMessage = useCallback(
    () => fireToast({ content: '유효하지 않은 주소입니다.' }),
    [fireToast]
  );

  const getOpenGraph = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (validator({ value: url.value, type: 'url' })) {
      refetch();
    } else {
      showErrorMessage();
    }
  };

  useEffect(() => {
    if (isFetching || !og) return;
    if (og.url === null) return showErrorMessage();
    saveOpenGraph(og);
  }, [isFetching, og, saveOpenGraph, showErrorMessage]);

  return (
    <div css={LinkInputCss}>
      {openGraph ? (
        <LinkThumbnail thumbnail={openGraph} edit onDelete={() => saveOpenGraph(null)} />
      ) : (
        <section>
          <Input
            placeholder="영감이 되는 링크를 붙여 넣어보세요"
            fixedHeight={32}
            value={url.value}
            onChange={url.onChange}
          />
          <PlusBtn onClick={getOpenGraph} />
        </section>
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
