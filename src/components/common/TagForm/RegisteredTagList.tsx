import React from 'react';
import { css, Theme } from '@emotion/react';

import Tag from '~/components/common/Tag';

function RegisteredTagList({
  applyedTags = [],
  registeredTags = [],
  onClick,
}: {
  applyedTags: TagType[];
  registeredTags: TagType[];
  onClick: (tag: TagType) => void;
}) {
  const isRegisteredTagExist = Boolean(registeredTags.length);

  return (
    <>
      <h2 css={userTagsTitleCss}>내 영감에 쓰인 태그</h2>
      <section css={registeredTagsCss}>
        {isRegisteredTagExist ? (
          registeredTags.map(tag => (
            <Tag
              key={tag.id}
              count={tag.count}
              content={tag.content}
              selected={applyedTags.some(applyedTag => applyedTag.id === tag.id)}
              onClick={() => {
                onClick(tag);
              }}
            />
          ))
        ) : (
          <div css={notHaveUserTagsCss}>등록된 태그가 없습니다.</div>
        )}
      </section>
    </>
  );
}

export default React.memo(RegisteredTagList);

const registeredTagsCss = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px 0;
  gap: 16px 8px;
`;

const userTagsTitleCss = (theme: Theme) => css`
  margin: 16px 0 4px;
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
