import { css } from '@emotion/react';

import ContentThumbnail from '~/components/home/ContentThumbnail';

export default function Root() {
  return (
    <article>
      <section css={thumbnailWrapperCss}>
        <ContentThumbnail
          type="TEXT"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, similique quisquam. Inventore iure excepturi, accusamus quae repudiandae, aspernatur praesentium, consequatur quidem modi a sit rerum molestias iusto quaerat vitae perspiciatis."
          tagResponse={[]}
        />
        <ContentThumbnail
          type="IMAGE"
          content="https://avatars.githubusercontent.com/u/26461307?v=4"
          tagResponse={[]}
        />
        <ContentThumbnail
          type="TEXT"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, similique quisquam. Inventore iure excepturi, accusamus quae repudiandae, aspernatur praesentium, consequatur quidem modi a sit rerum molestias iusto quaerat vitae perspiciatis."
          tagResponse={TEST_TAGS}
        />
        <ContentThumbnail
          type="IMAGE"
          content="https://avatars.githubusercontent.com/u/26461307?v=4"
          tagResponse={TEST_TAGS}
        />
        <ContentThumbnail type="TEXT" content="asdf" tagResponse={[]} />
      </section>
    </article>
  );
}

const thumbnailWrapperCss = css`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
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
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: '저쩌구태그',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
  {
    id: 1,
    memberResponse: { id: 1, nickName: '', email: '' },
    content: 'tag1',
    createdDatetime: '',
    updatedDatetime: '',
  },
];
