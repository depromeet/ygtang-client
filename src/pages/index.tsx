import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import AppliedTags from '~/components/common/TagForm/AppliedTags';
import AppendButton from '~/components/home/AppendButton';
import { ClipboardAppMessageListener } from '~/components/home/ClipboardAppMessageListener';
import EmptyImageSection from '~/components/home/EmptyImageSection';
import HomeNavigationBar from '~/components/home/HomeNavigationBar';
import Thumbnail from '~/components/home/Thumbnail';
import { staggerHalf } from '~/constants/motions';
import useGetInspirationListWithInfinite from '~/hooks/api/inspiration/useGetInspirationListWIthInfinite';
import useIntersectionObserver from '~/hooks/common/useIntersectionObserver';
import { useFilteredTags } from '~/store/FilteredTags';

//TODO: 이후 내부만 살짝 바꾸어서 modal type에 따라 사용할 수 있습니다.
const InspirationViewAsModal = dynamic(
  () => import('~/components/inspiration/InspirationViewAsModal')
);
const EditTagFormRouteAsModal = dynamic(() => import('~/components/edit/EditTagFormRouteAsModal'));

export default function Root() {
  const { filteredTags, removeTag } = useFilteredTags({});
  const { inspirations, isEmpty, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInspirationListWithInfinite({
      filteredTags,
    });

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  return (
    <ClipboardAppMessageListener>
      <HomeNavigationBar />
      <motion.article layout>
        {filteredTags.length > 0 && (
          <motion.section css={filteredSectionCss} layoutId="filteredTagsSection">
            <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />
          </motion.section>
        )}

        <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner />}>
          {/* NOTE: exit 애니메이션을 위해 삼항 연산자 사용 혹은 썸네일 섹션을 컨디셔널하게 렌더링할 시 */}
          {/* 해당 이미지 섹션이 렌더링되지 않음 */}
          {isEmpty && <EmptyImageSection key="loading section" />}
          <motion.section
            css={thumbnailWrapperCss}
            layout
            layoutId="thumbnailSection"
            variants={staggerHalf}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {inspirations.map(({ id, type, content, tagResponses, openGraphResponse, memo }) => (
              <Thumbnail
                key={id}
                id={id}
                type={type as InspirationType}
                content={content}
                tags={tagResponses}
                openGraph={openGraphResponse}
                memo={memo}
              />
            ))}
            {isFetchingNextPage && <FixedSpinner />}
            {hasNextPage && !isLoading && !isFetchingNextPage && <div ref={setTarget}></div>}
          </motion.section>
        </LoadingHandler>
      </motion.article>

      <AppendButton />

      <InspirationViewAsModal />
      <EditTagFormRouteAsModal />
    </ClipboardAppMessageListener>
  );
}

const thumbnailWrapperCss = css`
  width: 100%;
  padding-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const filteredSectionCss = css`
  margin: 2px 0;
`;
