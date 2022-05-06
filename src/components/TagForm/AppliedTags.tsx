import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';

import Tag, { TagType } from '~/components/common/Tag';

export default function AppliedTags({
  applyedTags = [],
  onRemove,
}: {
  applyedTags: TagType[];
  onRemove: (id: number) => void;
}) {
  // NOTE:  언급은 없었지만 추가할때마다 왼쪽으로 쫙 땡겨지는게 맞지 안나해서 넣었습니다.
  //        조율 이후 제거 될 수 있습니다.
  //        focus 사용 배제 이유 아래로 등록된 테그를 스크롤 쭉 내린 상태에서 focus하면 위로 올라오는것 방지하기 위해서 였습니다.
  // TODO:  스크롤 animation 논의 필요
  const $container = useRef<HTMLDivElement>(null);
  const [previousTags, setPreviousTags] = useState<TagType[]>([]);

  const scrollToLeftMax = () => {
    if (!$container?.current) return;
    $container.current.scroll({
      left: $container.current.scrollWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (previousTags.length === applyedTags.length) return;
    if (previousTags.length && previousTags.length < applyedTags.length) {
      scrollToLeftMax();
    }
    setPreviousTags([...applyedTags]);
  }, [applyedTags, previousTags]);

  return useMemo(
    () => (
      <div ref={$container} css={applyedTagsCss}>
        {applyedTags.map(tag => (
          <Tag
            key={tag.id}
            tag={tag}
            deletable
            onDelete={() => {
              onRemove(tag.id);
            }}
          />
        ))}
      </div>
    ),
    [applyedTags, onRemove]
  );
}

const applyedTagsCss = css`
  display: flex;
  padding: 8px 0;
  column-gap: 6px;
  overflow-x: scroll;
`;
