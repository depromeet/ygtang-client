import { forwardRef, PropsWithChildren, Ref } from 'react';
import { css } from '@emotion/react';

const SnapCarouselWrapper = forwardRef(function SnapCarouselWrapper(
  props: PropsWithChildren<unknown>,
  forwardedRef: Ref<HTMLDivElement>
) {
  const { children } = props;

  return (
    <section css={wrapperCss} ref={forwardedRef}>
      {children}
    </section>
  );
});

const wrapperCss = css`
  width: 100%;
  scroll-snap-type: x mandatory;
  display: flex;
  gap: 55px;
  overflow-x: scroll;
`;

function SnapCarouselItem({ children }: PropsWithChildren<unknown>) {
  return <article css={itemCss}>{children}</article>;
}

const itemCss = css`
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 100%;
`;

export const SnapCarousel = {
  Wrapper: SnapCarouselWrapper,
  Item: SnapCarouselItem,
};
