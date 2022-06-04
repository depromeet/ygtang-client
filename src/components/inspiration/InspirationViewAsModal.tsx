import PortalWrapper from '~/components/common/PortalWrapper';
import { MODAL_TYPE } from '~/constants/common';
import usePreventScroll from '~/hooks/common/usePreventScroll';
import useQueryParam from '~/hooks/common/useRouterQuery';
import ContentPage from '~/pages/content';

export default function InspirationViewAsModal() {
  const modal = useQueryParam('modal', String);
  const isInspirationViewModal = modal === MODAL_TYPE.inspirationView;

  usePreventScroll(isInspirationViewModal);

  return (
    <PortalWrapper isShowing={isInspirationViewModal}>
      <ContentPage />
    </PortalWrapper>
  );
}
