import { useState } from 'react';
import { css } from '@emotion/react';

import { GhostButton } from '~/components/common/Button';
import { CTABottomButton } from '~/components/common/Button/CTABottomButton';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import MyTagItem from '~/components/my/tag/MyTagItem';
import useGetTagListWithInfinite from '~/hooks/api/tag/useGetTagListWithInfinite';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import useIntersectionObserver from '~/hooks/common/useIntersectionObserver';
import { fullViewHeight } from '~/styles/utils';

import AddTagBottomSheet from './AddTagBottomSheet';

export default function MyTag() {
  const { tags, isLoading, hasNextPage, fetchNextPage } = useGetTagListWithInfinite({});
  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  const [isShowing, setIsShowing] = useState(false);

  const router = useInternalRouter();

  const onClickComplete = () => {
    router.back();
  };

  return (
    <article css={myTagCss}>
      <NavigationBar
        title="태그 관리"
        rightElement={
          <GhostButton size="large" onClick={onClickComplete}>
            완료
          </GhostButton>
        }
      />
      <LoadingHandler
        isLoading={isLoading}
        loadingComponent={
          <div css={myTagItemListCss}>
            <FixedSpinner />
          </div>
        }
      >
        <ul css={myTagItemListCss}>
          {tags.map(tag => (
            <MyTagItem key={tag.id} tag={tag} />
          ))}
          {hasNextPage && !isLoading && <div ref={setTarget}></div>}
        </ul>
      </LoadingHandler>
      <section css={addTagBottomCss}>
        <CTABottomButton
          onClick={() => {
            setIsShowing(true);
          }}
        >
          태그등록
        </CTABottomButton>
      </section>

      <AddTagBottomSheet
        isShowing={isShowing}
        onClose={() => {
          setIsShowing(false);
        }}
      />
    </article>
  );
}

const myTagCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${fullViewHeight()};
`;
const myTagItemListCss = css`
  margin-top: 20px;
  flex: 1;
  overflow-y: scroll;
`;

const addTagBottomCss = css`
  margin: 8px 0 16px 0;
`;
