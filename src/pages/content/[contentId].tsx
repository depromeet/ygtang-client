import { useCallback, useEffect } from 'react';
import { css } from '@emotion/react';

import { IconButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import ImageView from '~/components/inspiration/ImageView';
import LinkView from '~/components/inspiration/LinkView';
import TextView from '~/components/inspiration/TextView';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useInspirationDetail } from '~/store/Inspiration';

export default function ContentPage() {
  const { inspirationDetail } = useInspirationDetail();
  const { push } = useInternalRouter();

  useEffect(() => {
    if (!inspirationDetail) return push('/');
  }, [inspirationDetail, push]);

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

  return (
    <article css={contentCss}>
      <NavigationBar
        title=""
        backLink="/"
        backLinkScrollOption={false}
        rightElement={<IconButton iconName="DeleteIcon" light />}
      />
      {renderInspirationViewByType()}
    </article>
  );
}

const contentCss = css``;
