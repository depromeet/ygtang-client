import { useCallback, useEffect } from 'react';
import { css } from '@emotion/react';

import { IconButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import ImageView from '~/components/inspiration/ImageView';
import LinkView from '~/components/inspiration/LinkView';
import TextView from '~/components/inspiration/TextView';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useInspirationDetail } from '~/store/Inspiration';

export default function ContentPage() {
  const { inspirationDetail } = useInspirationDetail();
  const { deleteInspiration } = useInspirationMutation();
  const { push } = useInternalRouter();

  useEffect(() => {
    if (!inspirationDetail) return push('/');
  }, [inspirationDetail, push]);

  const deleteInspirationById = (id: number) => {
    // TODO: 삭제 여부 묻는 다이얼로그 추가 필요
    deleteInspiration(id);
  };

  const renderInspirationViewByType = useCallback(() => {
    const type = inspirationDetail?.type;
    if (type === 'IMAGE') {
      return <ImageView />;
    }
    if (type === 'LINK') {
      return <LinkView />;
    }
    return <TextView />;
  }, [inspirationDetail?.type]);

  if (!inspirationDetail) return <></>;
  const { id } = inspirationDetail;

  return (
    <article css={contentCss}>
      <NavigationBar
        title=""
        backLink="/"
        backLinkScrollOption={false}
        rightElement={
          <IconButton onClick={() => deleteInspirationById(id)} iconName="DeleteIcon" light />
        }
      />
      {renderInspirationViewByType()}
    </article>
  );
}

const contentCss = css``;
