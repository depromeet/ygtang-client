import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import AppendButton from '~/components/home/AppendButton';
import ContentThumbnail from '~/components/home/ContentThumbnail';
import HomeNavigationBar from '~/components/home/HomeNavigationBar';
import AppliedTags from '~/components/TagForm/AppliedTags';
import { staggerHalf } from '~/constants/motions';
import { useFilteredTags } from '~/store/FilteredTags';

const TagFormRouteAsModal = dynamic(() => import('~/components/home/TagFormRouteAsModal'));

export default function Root() {
  const { filteredTags, removeTag } = useFilteredTags({});

  return (
    <>
      <HomeNavigationBar />
      <motion.article layout>
        {filteredTags.length > 0 && (
          <motion.section css={filteredSectionCss} layoutId="filteredTagsSection">
            <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />
          </motion.section>
        )}

        <motion.section
          css={thumbnailWrapperCss}
          layoutId="thumbnailSection"
          variants={staggerHalf}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {MOCK_CONTENT.map(({ type, content, tagResponse, openGraphResponse }, index) => (
            <ContentThumbnail
              key={index}
              type={type as InspirationType}
              content={content}
              tags={tagResponse}
              openGraph={openGraphResponse}
            />
          ))}
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

const TEST_TAGS = [
  {
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: '어쩌구태그',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 2,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: '저쩌구태그',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 3,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 4,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 5,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 6,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 7,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
];

const MOCK_CONTENT = [
  {
    type: 'TEXT',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, similique quisquam. Inventore iure excepturi, accusamus quae repudiandae, aspernatur praesentium, consequatur quidem modi a sit rerum molestias iusto quaerat vitae perspiciatis.',
    tagResponse: TEST_TAGS,
  },
  {
    type: 'TEXT',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, similique quisquam. Inventore iure excepturi, accusamus quae repudiandae, aspernatur praesentium, consequatur quidem modi a sit rerum molestias iusto quaerat vitae perspiciatis.',
    tagResponse: [],
  },
  {
    type: 'IMAGE',
    content: 'https://avatars.githubusercontent.com/u/26461307?v=4',
    tagResponse: TEST_TAGS,
  },
  {
    type: 'IMAGE',
    content: 'https://avatars.githubusercontent.com/u/26461307?v=4',
    tagResponse: [],
  },
  {
    type: 'LINK',
    content: '',
    tagResponse: TEST_TAGS,
    openGraphResponse: {
      code: 200,
      description: 'I like to share my knowledge for those who wandering in issue.',
      siteName: null,
      title: "Cometin' - hyesungoh",
      url: 'https://avatars.githubusercontent.com/',
      image: '/u/26461307?v=4',
    },
  },
  {
    type: 'LINK',
    content: '',
    tagResponse: [],
    openGraphResponse: {
      code: 200,
      description: 'I like to share my knowledge for those who wandering in issue.',
      siteName: null,
      title: "Cometin' - hyesungoh",
      url: 'https://avatars.githubusercontent.com/',
      image: '/u/26461307?v=4',
    },
  },
];
