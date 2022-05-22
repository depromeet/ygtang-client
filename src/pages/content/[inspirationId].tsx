import { useCallback, useEffect } from 'react';

import { IconButton } from '~/components/common/Button';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import ImageView from '~/components/inspiration/ImageView';
import LinkView from '~/components/inspiration/LinkView';
import TextView from '~/components/inspiration/TextView';
import { useInspirationById } from '~/hooks/api/inspiration/useInspirationById';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import useQueryParam from '~/hooks/common/useRouterQuery';

export default function ContentPage() {
  const inspirationId = useQueryParam('inspirationId', String);

  const { deleteInspiration } = useInspirationMutation();
  const { push } = useInternalRouter();

  const { inspiration, isLoading } = useInspirationById({
    inspirationId,
  });

  useEffect(() => {
    if (isLoading) return;
    if (!inspiration) return push('/');
  }, [isLoading, inspiration, push]);

  const deleteInspirationById = (id: number) => {
    // TODO: 삭제 여부 묻는 다이얼로그 추가 필요
    deleteInspiration(id);
  };

  const renderInspirationViewByType = useCallback((inspiration: InspirationInterface) => {
    const type = inspiration?.type;

    if (type === 'IMAGE') {
      return <ImageView inspiration={inspiration} />;
    }
    if (type === 'LINK') {
      return <LinkView inspiration={inspiration} />;
    }
    return <TextView inspiration={inspiration} />;
  }, []);

  if (!inspiration) return <></>;

  const { id } = inspiration;

  return (
    <article>
      <NavigationBar
        title=""
        backLink="/"
        backLinkScrollOption={false}
        rightElement={
          <IconButton onClick={() => deleteInspirationById(id)} iconName="DeleteIcon" light />
        }
      />
      <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner />}>
        {renderInspirationViewByType(inspiration)}
      </LoadingHandler>
    </article>
  );
}
