import { css, Theme } from '@emotion/react';

import PortalWrapper from '~/components/common/PortalWrapper';
import usePreventScroll from '~/hooks/common/usePreventScroll';
import useQueryParam from '~/hooks/common/useRouterQuery';
import TagPage from '~/pages/add/tag';

// TODO: 다른 부분과 통합할 필요있음 state를 주입받는 형식을 사용하는것이 좋을듯

export default function AddTagFormRouteAsModal() {
  const query = useQueryParam('modal', String);
  usePreventScroll(query === 'addTag');
  console.log('ye>>>>>>>>>>>>>>', query === 'addTag');
  return (
    <PortalWrapper isShowing={query === 'addTag'}>
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
  height: 100vh;
  background-color: ${theme.color.background};
  padding: ${theme.size.layoutPadding};
  z-index: 1000;
`;