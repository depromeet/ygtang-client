import { css, Theme } from '@emotion/react';

interface OnboardContentProps {
  imgSrc: string;
  title: string;
  description: string;
}

export function OnboardContent({ imgSrc, title, description }: OnboardContentProps) {
  return (
    <div css={wrapperCss}>
      <div css={imageWrapperCss}>
        <img src={imgSrc} alt={title} />
      </div>
      <h2 css={titleCss}>{title}</h2>
      <p css={descriptionCss} dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
}

const wrapperCss = css`
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 150%;
`;

const imageWrapperCss = css`
  width: 100%;
  height: 350px;
  margin-bottom: 24px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const titleCss = (theme: Theme) => css`
  margin-bottom: 8px;
  font-size: 24px;
  color: ${theme.color.gray05};
`;

const descriptionCss = (theme: Theme) => css`
  text-align: center;
  font-size: 14px;
  color: ${theme.color.gray04};
`;
