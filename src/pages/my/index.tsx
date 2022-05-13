import { css } from '@emotion/react';

import { FilledButton } from '~/components/common/Button';
import IllustDialog from '~/components/common/IllustDialog';
import { INSPIRATION_MODAL_IMAGE } from '~/constants/assets';
import useInternalRouter from '~/hooks/common/useInternalRouter';

export default function MyPage() {
  const { push } = useInternalRouter();
  return (
    <article css={myPageCss}>
      <IllustDialog
        isShowing={true}
        image={INSPIRATION_MODAL_IMAGE[2]}
        actionButtons={
          <>
            <FilledButton colorType="light" onClick={() => push('/')}>
              네! 이해할 수 있어요.
            </FilledButton>
          </>
        }
      >
        아직 개발 중이에요.
        <br /> 빠르게 사용할 수 있도록 노력할게요!
      </IllustDialog>
    </article>
  );
}

const myPageCss = css``;
