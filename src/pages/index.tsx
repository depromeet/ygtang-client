import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { INSPIRATION_EMPTY_IMAGE_SRC, INSPIRATION_EMPTY_TEXT_IMAGE_SRC } from '~/assets/constants';
import AppendButton from '~/components/home/AppendButton';
import ContentThumbnail from '~/components/home/ContentThumbnail';
import HomeNavigationBar from '~/components/home/HomeNavigationBar';
import AppliedTags from '~/components/TagForm/AppliedTags';
import { staggerHalf } from '~/constants/motions';
import useGetInspirationListWithInfinite from '~/hooks/api/inspiration/useGetInspirationListWIthInfinite';
import { useFilteredTags } from '~/store/FilteredTags';

const TagFormRouteAsModal = dynamic(() => import('~/components/home/TagFormRouteAsModal'));

export default function Root() {
  const { filteredTags, removeTag } = useFilteredTags({});
  const { inspirations } = useGetInspirationListWithInfinite();

  console.log(inspirations);

  return (
    <>
      <HomeNavigationBar />
      <motion.article layout>
        {filteredTags.length > 0 && (
          <motion.section css={filteredSectionCss} layoutId="filteredTagsSection">
            <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />
          </motion.section>
        )}

        <EmptyImageSection />

        <motion.section
          css={thumbnailWrapperCss}
          layoutId="thumbnailSection"
          variants={staggerHalf}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* {inspirations.length === 0 && <EmptyImageSection />} */}

          {/* {inspirations.map(({ id, type, content, tagResponse, openGraphResponse }) => (
            <ContentThumbnail
              key={id}
              type={type as InspirationType}
              content={content}
              tags={tagResponse}
              openGraph={openGraphResponse}
            />
          ))} */}
        </motion.section>
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

function EmptyImageSection() {
  return (
    <div css={imageWrapperCss}>
      <img css={emptyImageCss} src={INSPIRATION_EMPTY_IMAGE_SRC} alt="empty inspiration" />
      <img css={emptyTextImageCss} src={INSPIRATION_EMPTY_TEXT_IMAGE_SRC} alt="empty inspiration" />
    </div>
  );
}

const imageWrapperCss = css`
  padding-top: 15vh;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    object-fit: contain;
  }
`;

const emptyImageCss = css`
  width: 100%;
`;

const emptyTextImageCss = css`
  margin-top: 28px;
  width: 54%;
`;
