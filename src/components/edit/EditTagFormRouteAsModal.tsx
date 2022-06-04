import PortalWrapper from '~/components/common/PortalWrapper';
import { MODAL_TYPE } from '~/constants/common';
import useQueryParam from '~/hooks/common/useRouterQuery';
import TagPage from '~/pages/edit/tag';

import ModalWrapper from '../common/ModalWrapper';

export default function AddTagFormRouteAsModal() {
  const query = useQueryParam('modal', String);

  return (
    <PortalWrapper isShowing={query === MODAL_TYPE.editTag}>
      <ModalWrapper>
        <TagPage />
      </ModalWrapper>
    </PortalWrapper>
  );
}
