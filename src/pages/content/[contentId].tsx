import { useEffect } from 'react';
import { css } from '@emotion/react';

import NavigationBar from '~/components/common/NavigationBar';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useInspirationDetail } from '~/store/Inspiration';

export default function ContentPage() {
  const { inspirationDetail } = useInspirationDetail();
  const { push } = useInternalRouter();

  useEffect(() => {
    if (!inspirationDetail) return push('/');
  }, [inspirationDetail, push]);

  if (!inspirationDetail) return <></>;

  const { id, type, tags, content, openGraph } = inspirationDetail;
  return (
    <article css={contentCss}>
      <NavigationBar title="" backLink="/" backLinkScrollOption={false} />
      영감 보기(이미지 / 텍스트 / 링크)
      {` ${id} ${type} ${tags} ${content} ${openGraph}`}
    </article>
  );
}

const contentCss = css``;
