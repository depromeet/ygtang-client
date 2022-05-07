import { css } from '@emotion/react';

import { CTAButton, GhostButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import MyTagItem from '~/components/my/tag/MyTagItem';

export default function MyTag() {
  const tags: TagType[] = [
    { id: 1, content: '안녕하세요!' },
    { id: 2, content: '안녕하세요!!' },
    { id: 3, content: '안녕하!!세요!' },
    { id: 4, content: '안녕!!하세요!' },
    { id: 5, content: '!!안녕하세요!' },
    { id: 6, content: '안!!녕하세요!' },
    { id: 7, content: '안녕!!하세!!요!' },
    { id: 8, content: '!!안!!녕하세요!' },
    { id: 9, content: '안녕하!!세요!' },
    { id: 0, content: '안!!녕!!하세요!' },
    { id: 11, content: '안녕!!하세요!' },
    { id: 21, content: '안녕하세요!' },
    { id: 22, content: '안녕하세요!!' },
    { id: 23, content: '안녕하!!세요!' },
    { id: 24, content: '안녕!!하세요!' },
    { id: 25, content: '!!안녕하세요!' },
    { id: 26, content: '안!!녕하세요!' },
    { id: 27, content: '안녕!!하세!!요!' },
    { id: 28, content: '!!안!!녕하세요!' },
    { id: 29, content: '안녕하!!세요!' },
    { id: 20, content: '안!!녕!!하세요!' },
    { id: 211, content: '안녕!!하세요!' },
  ];

  return (
    <article css={myTagCss}>
      <NavigationBar
        title="태그 관리"
        rightElement={<GhostButton size="large">완료</GhostButton>}
      />
      <ul css={myTagItemListCss}>
        {tags.map(tag => (
          <MyTagItem
            key={tag.id}
            tag={tag}
            onDelete={id => {
              id;
            }}
          />
        ))}
      </ul>
      <CTAButton css={myTagRegisterCss}>태그등록</CTAButton>
    </article>
  );
}

const myTagCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const myTagItemListCss = css`
  flex: 1;
  overflow-y: scroll;
`;
const myTagRegisterCss = css`
  position: absolute;
  bottom: 34px;
`;
