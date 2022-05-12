import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';

export default function AddImage() {
  // 이 페이지로 오는 순간 이미지 업로드 인풋 기능 실행
  // 이미지 선택 시에 해당 이미지 콘텐트 채우기
  // 완료 후 api 연결
  // 취소 시에 다시 전 페이지로 돌아가기

  const tags = [{ id: 1, content: '1111' }];

  return (
    <article css={addImageCss}>
      <NavigationBar title="이미지 추가" />
      <section css={addImageTopCss}>
        <div css={contentWrapperCss}>
          <ImageContent
            // src="https://i.pinimg.com/564x/89/c5/4d/89c54d90c325a8c310363f4e9773a041.jpg"
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
  height: 100vh;
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
