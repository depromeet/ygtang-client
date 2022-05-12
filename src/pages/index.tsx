import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import AppendButton from '~/components/home/AppendButton';
import EmptyImageSection from '~/components/home/EmptyImageSection';
import HomeNavigationBar from '~/components/home/HomeNavigationBar';
import Thumbnail from '~/components/home/Thumbnail';
import AppliedTags from '~/components/TagForm/AppliedTags';
import { staggerHalf } from '~/constants/motions';
import useGetInspirationListWithInfinite from '~/hooks/api/inspiration/useGetInspirationListWIthInfinite';
import { useFilteredTags } from '~/store/FilteredTags';

const TagFormRouteAsModal = dynamic(() => import('~/components/home/TagFormRouteAsModal'));

export default function Root() {
  const { filteredTags, removeTag } = useFilteredTags({});
  const { inspirations, isLoading } = useGetInspirationListWithInfinite();

  return (
    <>
      <HomeNavigationBar />
      <motion.article layout>
        {filteredTags.length > 0 && (
          <motion.section css={filteredSectionCss} layoutId="filteredTagsSection">
            <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />
          </motion.section>
        )}

        <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner />}>
          {inspirations.length === 0 ? (
            <EmptyImageSection />
          ) : (
            <motion.section
              css={thumbnailWrapperCss}
              layoutId="thumbnailSection"
              variants={staggerHalf}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {inspirations.map(({ id, type, content, tagResponse, openGraphResponse }) => (
                <Thumbnail
                  key={id}
                  type={type as InspirationType}
                  content={content}
                  tags={tagResponse}
                  openGraph={openGraphResponse}
                />
              ))}
            </motion.section>
          )}
        </LoadingHandler>
      </motion.article>
      <AppendButton />
      <TagFormRouteAsModal />
    </>
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
