import { ChangeEventHandler, useEffect, useRef } from 'react';
import { css } from '@emotion/react';

import theme from '~/styles/Theme/Theme';

import { Input } from '../TextField/Input';
import AppliedTags from './AppliedTags';

export default function TagSearchBar({
  value,
  applyedTags,
  onChange,
  onRemove,
}: {
  value: string;
  applyedTags: TagType[];
  onChange: ChangeEventHandler;
  onRemove: (id: number) => void;
}) {
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  const prevApplyedTagLength = useRef<number>(applyedTags.length);
  const scrollToLeftMax = () => {
    if (!tagsContainerRef?.current || !innerContainerRef?.current) return;
    innerContainerRef.current.scroll({
      left: tagsContainerRef.current.scrollWidth - innerContainerRef.current.offsetWidth / 2,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (prevApplyedTagLength.current < applyedTags.length) scrollToLeftMax();
    prevApplyedTagLength.current = applyedTags.length;
  }, [applyedTags]);

  return (
    <div css={containerCss}>
      <div css={innerContainerCss} ref={innerContainerRef}>
        <div css={itemCss} ref={tagsContainerRef}>
          <AppliedTags applyedTags={applyedTags} onRemove={onRemove} />
        </div>
        <div css={inputContainerCss}>
          <Input
            type="text"
            placeholder="태그를 입력해주세요."
            value={value}
            onChange={onChange}
            background="transparent"
            padding={0}
          />
        </div>
      </div>
    </div>
  );
}

const containerCss = css`
  padding: 8px 12px;
  height: 49px;
  width: 100%;

  background: ${theme.color.gray01};
  border-radius: ${theme.borderRadius.default};
`;

const innerContainerCss = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const itemCss = css`
  flex-shrink: 0;
`;

const inputContainerCss = css`
  ${itemCss}
  width: 100%;
`;

/**
 * 테그 컨탠츠 바꾸고
 *
 * 필터 테그 리스트 부분 바꾸고
 *
 * 끝
 */
