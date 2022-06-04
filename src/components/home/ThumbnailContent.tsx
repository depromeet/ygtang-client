import { SyntheticEvent, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';

import useIgnoreOpenGraph from '~/hooks/api/inspiration/useIgnoreOpenGraph';
import useDidMount from '~/hooks/common/useDidMount';
import { textEllipsisCss } from '~/styles/utils';

import { OpenGraph } from '../inspiration/LinkView';
import { ContentThumbnailProps } from './Thumbnail';
import useDidUpdate from '~/hooks/common/useDidUpdate';

export default function ThumbnailContent({
  type,
  content,
  openGraph,
}: Pick<ContentThumbnailProps, 'type' | 'content' | 'openGraph'>) {
  if (type === 'IMAGE') return <img css={imageCss} alt={`${content} image`} src={content} />;
  if (type === 'LINK') return <LinkContent openGraph={openGraph} content={content} />;

  // Text type
  return <p css={textCss}>{content}</p>;
}

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const linkWrapperCss = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: calc(100% - 42px) 42px;
  font-size: 10px;
`;

const linkImgWrapperCss = (theme: Theme) => css`
  width: 100%;
  background-color: ${theme.color.dim01};

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const linkTextWrapperCss = (theme: Theme) => css`
  width: 100%;
  padding: 7px 6px;
  background-color: ${theme.color.dim01};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  & p {
    ${textEllipsisCss(1)}
  }
`;

const textCss = css`
  font-size: 12px;
  padding: 6px;
  line-height: 150%;
`;

function LinkContent({ openGraph, content }: Pick<ContentThumbnailProps, 'openGraph' | 'content'>) {
  // initial state를 og.url + og.image로 한 이유는
  // og.image가 안되는 경우가 상대주소로 작성이 되어 있어 영감탱 서버에 요청하기 때문

  const [og, setOg] = useState<OpenGraph>();
  const [src, setSrc] = useState<string>('');
  const { checkIgonreOpenGraphHost, makeURLOpenGraph } = useIgnoreOpenGraph();

  useDidUpdate(() => {
    setOg(checkIgonreOpenGraphHost(content) ? makeURLOpenGraph(content) : openGraph);
    setSrc(og && og.url && og.image ? og.url + og.image : '');
  }, [og]);

  const onImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (!og) return;
    if (!og.url) return;
    if (!og.image) return;

    // 두번째로 시도하는 og.image에서도 에러를 발생할 경우
    if (e.currentTarget.src === openGraph.image) return;

    setSrc(og.image);
  };

  return (
    <div css={linkWrapperCss}>
      <div css={linkImgWrapperCss}>
        {src && <img alt={`${og?.url} thumbnail`} src={src} onError={onImageError} />}
      </div>

      <div css={linkTextWrapperCss}>
        <p>{og?.title}</p>
        <p>{og?.url}</p>
      </div>
    </div>
  );
}
