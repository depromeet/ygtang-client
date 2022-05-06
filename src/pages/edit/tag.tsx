import { css } from '@emotion/react';

import NavigationBar from '~/components/common/NavigationBar';
import { TagType } from '~/components/common/Tag';
import TagFrom from '~/components/TagForm';
import { useToast } from '~/store/Toast';

export interface EditTagProps {
  contentId: number;
  contentTags: TagType[];
}

export default function EditTag({ contentId, contentTags }: EditTagProps) {
  const { fireToast } = useToast();

  const tagsB: TagType[] = [
    { id: contentId, content: 'hi hihi hi hi hi hi hi ' },
    { id: 2, content: 'h2' },
    { id: 3, content: 'h3' },
    { id: 4, content: 'h4' },
    { id: 5, content: 'h5' },
    { id: 6, content: 'h6' },
  ];

  const hasTag = (tag: TagType) => {
    return Boolean(contentTags.find(_tag => _tag.id === tag.id));
  };

  const saveTag = (tag: TagType) => {
    if (hasTag(tag)) {
      fireToast({ content: '리스트에 태그가 이미 존재합니다.' });
      return;
    }
    // TODO: 영감 편집 tag 추가 API 호출
    console.log(tag);
  };

  const removeTag = (tagId: number) => {
    // TODO: 영감 편집 tag 삭제 API 호출
    console.log(tagId);
  };

  return (
    <article css={editTagCss}>
      <NavigationBar title="영감 편집" />
      <TagFrom
        applyedTags={contentTags}
        registeredTags={tagsB}
        onSave={saveTag}
        onRemove={removeTag}
      />
    </article>
  );
}

const editTagCss = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
