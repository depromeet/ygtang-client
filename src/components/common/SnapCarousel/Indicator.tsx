import { useEffect, useMemo, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { throttle } from 'lodash';

interface IndicatorProps {
  wrapperRef: HTMLDivElement | null;
}

export function Indicator({ wrapperRef }: IndicatorProps) {
  const childrenLength = wrapperRef ? wrapperRef.childNodes.length : 0;
  const childrenIdArray = useMemo(() => Array.from(Array(childrenLength).keys()), [childrenLength]);

  const { currentIndex } = useIndicator({ wrapperRef });

  return (
    <div css={wrapperCss}>
      {childrenIdArray.map(eachIndex => (
        <span key={eachIndex} css={[dotCss, currentIndex === eachIndex && currentDotCss]}></span>
      ))}
    </div>
  );
}

const wrapperCss = css`
  display: flex;
  gap: 12px;
`;

const dotCss = (theme: Theme) => css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${theme.color.gray02};
  transition: background-color 0.3s;
`;

const currentDotCss = (theme: Theme) => css`
  background-color: ${theme.color.gray04};
`;

interface UseIndicatorProps {
  wrapperRef: HTMLDivElement | null;
}

function useIndicator({ wrapperRef }: UseIndicatorProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const throttledOnScroll = useMemo(
    () =>
      throttle(() => {
        if (!wrapperRef) return;
        const { offsetWidth, scrollLeft } = wrapperRef;
        const tempIndex = Math.round(scrollLeft / offsetWidth);
        setCurrentIndex(tempIndex);
      }, 300),
    [wrapperRef]
  );

  useEffect(() => {
    if (!wrapperRef) return;
    wrapperRef.addEventListener('scroll', throttledOnScroll);

    return () => {
      wrapperRef.removeEventListener('scroll', throttledOnScroll);
    };
  }, [throttledOnScroll, wrapperRef]);

  return { currentIndex };
}
