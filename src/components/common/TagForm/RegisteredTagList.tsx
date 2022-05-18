import React from 'react';
import { css, Theme } from '@emotion/react';

import Tag from '~/components/common/Tag';

function RegisteredTagList({
  registeredTags = [],
  onClick,
}: {
  registeredTags: TagType[];
  onClick: (tag: TagType) => void;
}) {
  return (
    <section css={registeredTagsCss}>
      <h2 css={userTagsTitleCss}>등록된 태그 목록</h2>
      {Boolean(registeredTags.length) ? (
        registeredTags.map(tag => (
          <Tag
            key={tag.id}
            content={tag.content}
            onClick={() => {
              onClick(tag);
            }}
          />
        ))
      ) : (
        <div css={notHaveUserTagsCss}>등록된 태그가 없습니다.</div>
      )}
    </section>
  );
}

export default React.memo(RegisteredTagList);

const registeredTagsCss = css`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const userTagsTitleCss = (theme: Theme) => css`
  font-size: 12px;
  color: ${theme.color.gray05};
`;

const notHaveUserTagsCss = (theme: Theme) => css`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${theme.color.gray03};
`;
