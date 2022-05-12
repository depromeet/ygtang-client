import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';

export default function AddImage() {
  const tags = [
    { id: 1, content: '1111' },
    { id: 22, content: '22222' },
    { id: 21, content: '13333' },
    { id: 32, content: '27777' },
    { id: 31, content: '1231321' },
    { id: 42, content: '243241324' },
    { id: 41, content: '1413241234234321' },
    { id: 52, content: '243214324' },
    { id: 51, content: '1234' },
    { id: 62, content: '2423' },
    { id: 61, content: '1432' },
    { id: 72, content: '2423' },
    { id: 81, content: '1423' },
    { id: 92, content: '2423423' },
  ];

  return (
    <article css={addImageCss}>
      <NavigationBar title="이미지 추가" />
      <section css={addImageTopCss}>
        <div css={contentWrapperCss}>
          <ImageContent
            src="https://i.pinimg.com/564x/89/c5/4d/89c54d90c325a8c310363f4e9773a041.jpg"
            alt="mock"
          />
        </div>
        <div css={contentWrapperCss}>
          <TagContent onEdit={() => {}} tags={tags} />
        </div>
        <div css={contentWrapperCss}>
          <MemoText writable />
        </div>
      </section>
      <section css={addImageBottomCss}>
        <CTAButton type="submit">Tang!</CTAButton>
      </section>
    </article>
  );
}

const addImageCss = css`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
`;

const addImageTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addImageBottomCss = css`
  margin: 8px 0 16px 0;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
