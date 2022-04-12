import { css, Theme } from '@emotion/react';

import Tag from '~/components/common/Tag';

export type ContentThumbnailType = 'image' | 'text' | 'link';

export interface IContentThumbnailProps {
  type: ContentThumbnailType;
  tags: string[];
  text: string;
  image: string;
}

export default function ContentThumbnail() {
  return (
    <div css={contentThumbnailBoxCss}>
      <div css={contentThumbnailCss}>
        <p css={contentText}>
          콘텐츠의 텍스트는 다음과 같이 삽입됩니다. 콘텐츠의 텍스트는 다음과 같이 삽입됩니다.
          콘텐츠의 텍스트는 다음과 같이 삽입됩니다. 콘텐츠의 텍스트는 다음과 같이 삽입됩니다.
        </p>
        <div css={contentTagsCss}>
          <Tag text="영감" />
          <Tag text="브랜드 디자인 레퍼런스 모음집" />
          <Tag text="UX/UI" />
          <Tag text="디자인인사이트" />
        </div>
      </div>
    </div>
  );
}

const contentThumbnailPadding = '12px';
const contentTagHeight = '40px';

const contentThumbnailBoxCss = (theme: Theme) => css`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px;
  background: ${theme.color.gray};
  border-radius: 4px;

  ::after {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
`;

const contentThumbnailCss = css`
  position: absolute;
  overflow: hidden;
  width: calc(100% - ${contentThumbnailPadding} * 2);
  height: calc(100% - ${contentThumbnailPadding} * 2);
`;

const contentText = css`
  height: calc(100% - ${contentThumbnailPadding} * 2 - ${contentTagHeight});
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.01em;
  word-wrap: break-word;
`;

const contentTagsCss = css`
  display: flex;
  align-items: center;
  height: ${contentTagHeight};
  overflow-x: scroll;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none !important;
  }
`;
