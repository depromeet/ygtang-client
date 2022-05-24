import { css, Theme } from '@emotion/react';

import PortalWrapper from '~/components/common/PortalWrapper';
import { MODAL_TYPE } from '~/constants/common';
import useQueryParam from '~/hooks/common/useRouterQuery';
import TagPage from '~/pages/edit/tag';

export default function AddTagFormRouteAsModal() {
  const query = useQueryParam('modal', String);

  return (
    <PortalWrapper isShowing={query === MODAL_TYPE.editTag}>
      <div css={wrapperCss}>
        <TagPage />
      </div>
    </PortalWrapper>
  );
}

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  height: 100%;
  overflow-y: scroll;
  background-color: ${theme.color.background};
  padding: ${theme.size.layoutPadding};
  z-index: 1000;
`;