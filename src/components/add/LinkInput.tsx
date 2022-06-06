import { useCallback, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';

import LinkThumbnail from '~/components/add/LinkThumbnail';
import { PlusIcon } from '~/components/common/icons';
import { Input } from '~/components/common/TextField/Input';
import { useCheckLinkAvailable } from '~/hooks/api/inspiration/useCheckLinkAvailable';
import useIgnoreOpenGraph from '~/hooks/api/inspiration/useIgnoreOpenGraph';
import useInput from '~/hooks/common/useInput';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

interface LinkInputProps {
  openGraph: OpenGraphResponse | null;
  saveOpenGraph?: (og: OpenGraphResponse | null) => void;
}

export default function LinkInput({ openGraph, saveOpenGraph }: LinkInputProps) {
  const { asPath } = useInternalRouter();
  const url = useInput({ useDebounce: true });
  const { openGraph: og, refetch, isFetching } = useCheckLinkAvailable({ link: url.value });
  const [ignoredOg, setIgnoredOg] = useState<OpenGraphResponse | undefined>();
  const { checkIgonreOpenGraphHost, makeURLOpenGraph } = useIgnoreOpenGraph();

  const { fireToast } = useToast();

  const showErrorMessage = useCallback(
    () => fireToast({ content: '유효하지 않은 주소입니다.' }),
    [fireToast]
  );

  const getOpenGraph = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (checkIgonreOpenGraphHost(url.value)) {
      setIgnoredOg(makeURLOpenGraph(url.value));
    } else if (validator({ value: url.value, type: 'url' })) {
      setIgnoredOg(undefined);
      refetch();
    } else {
      showErrorMessage();
    }
  };

  useEffect(() => {
    if (ignoredOg) return saveOpenGraph && saveOpenGraph(ignoredOg);

    if (isFetching || !og) return;
    if (og.url === null) return showErrorMessage();

    saveOpenGraph && saveOpenGraph(og);
  }, [isFetching, og, saveOpenGraph, showErrorMessage, ignoredOg]);

  return (
    <div css={LinkInputCss}>
      {openGraph ? (
        <LinkThumbnail
          edit={asPath.includes('add')}
          openGraph={openGraph}
          onDelete={() => saveOpenGraph && saveOpenGraph(null)}
        />
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
