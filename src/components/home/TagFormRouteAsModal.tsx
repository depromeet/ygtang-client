import PortalWrapper from '~/components/common/PortalWrapper';
import { MODAL_TYPE } from '~/constants/common';
import usePreventScroll from '~/hooks/common/usePreventScroll';
import useQueryParam from '~/hooks/common/useRouterQuery';
import TagPage from '~/pages/tag';

import ModalWrapper from '../common/ModalWrapper';

export default function TagFormRouteAsModal() {
  const query = useQueryParam('modal', String);
  const isTagModal = query === MODAL_TYPE.tag;

  usePreventScroll(isTagModal);

  return (
    <PortalWrapper isShowing={isTagModal}>
      <ModalWrapper>
        <TagPage />
      </ModalWrapper>
    </PortalWrapper>
  );
}
