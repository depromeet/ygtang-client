import React from 'react';
import { css } from '@emotion/react';

import Tag from '~/components/common/Tag';

function AppliedTags({
  applyedTags = [],
  onRemove,
}: {
  applyedTags: TagType[];
  onRemove: (id: number) => void;
}) {
  return (
    <div css={applyedTagsCss}>
      {applyedTags.map(tag => (
        <Tag
          key={tag.id}
          content={tag.content}
          deletable
          selected
          onDelete={() => {
            onRemove(tag.id);
          }}
        />
      ))}
    </div>
  );
}

export default React.memo(AppliedTags);

const applyedTagsCss = css`
  display: flex;
  column-gap: 6px;
  width: fit-content;
`;
