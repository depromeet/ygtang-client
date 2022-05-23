import { useCallback, useEffect, useState } from 'react';

import { FilledButton, IconButton } from '~/components/common/Button';
import IllustDialog from '~/components/common/IllustDialog';
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
  const inspirationId = useQueryParam('id', String);
  const { deleteInspiration } = useInspirationMutation();
  const { push } = useInternalRouter();

  const [isDeleteInspirationModalOn, setDeleteInspirationModalOn] = useState(false);

  const { inspiration, isLoading } = useInspirationById({
    inspirationId,
  });

  useEffect(() => {
    if (isLoading) return;
    if (!inspiration) return push('/');
  }, [isLoading, inspiration, push]);

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

  const deleteInspirationById = (id: number) => {
    deleteInspiration(id);
    setDeleteInspirationModalOn(false);
  };

  return (
    <article>
      <NavigationBar
        title=""
        backLink="/"
        backLinkScrollOption={false}
        rightElement={
          <IconButton
            onClick={() => setDeleteInspirationModalOn(true)}
            iconName="DeleteIcon"
            light
          />
        }
      />
      <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner />}>
        {renderInspirationViewByType(inspiration)}
      </LoadingHandler>

      <IllustDialog
        image={`/modal_characters/2.png`}
        isShowing={isDeleteInspirationModalOn}
        actionButtons={
          <>
            <FilledButton colorType="light" onClick={() => deleteInspirationById(id)}>
              네
            </FilledButton>
            <FilledButton colorType="dark" onClick={() => setDeleteInspirationModalOn(false)}>
              아니요
            </FilledButton>
          </>
        }
      >
        영감이 삭제됩니다.
        <br />
        괜찮으신가요?
      </IllustDialog>
    </article>
  );
}
