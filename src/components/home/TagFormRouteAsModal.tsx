import { css, Theme } from '@emotion/react';

import PortalWrapper from '~/components/common/PortalWrapper';
import { MODAL_TYPE } from '~/constants/common';
import usePreventScroll from '~/hooks/common/usePreventScroll';
import useQueryParam from '~/hooks/common/useRouterQuery';
import TagPage from '~/pages/tag';

export default function TagFormRouteAsModal() {
  const query = useQueryParam('modal', String);
  const isTagModal = query === MODAL_TYPE.tag;

  usePreventScroll(isTagModal);

  return (
    <PortalWrapper isShowing={isTagModal}>
      <div css={wrapperCss}>
        <TagPage />
      </div>
    </PortalWrapper>
  );
}

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  top: 0;
  /* 가로 가운데 정렬 */
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
