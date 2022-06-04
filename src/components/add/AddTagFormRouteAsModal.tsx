import PortalWrapper from '~/components/common/PortalWrapper';
import { MODAL_TYPE } from '~/constants/common';
import useQueryParam from '~/hooks/common/useRouterQuery';
import TagPage from '~/pages/add/tag';

// TODO: 다른 부분과 통합할 필요있음 state를 주입받는 형식을 사용하는것이 좋을듯

export default function AddTagFormRouteAsModal() {
  const query = useQueryParam('modal', String);

  return (
    <PortalWrapper isShowing={query === MODAL_TYPE.addTag}>
      <TagPage />
    </PortalWrapper>
  );
}
