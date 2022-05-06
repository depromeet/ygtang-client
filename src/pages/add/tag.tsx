import { css } from '@emotion/react';

import NavigationBar from '~/components/common/NavigationBar';
import TagFrom from '~/components/TagForm';
import { useAppliedTags } from '~/store/AppliedTags';

export default function AddTag() {
  const { tags, removeTag, addTag } = useAppliedTags();

  const tagsB: TagType[] = [
    { id: 1, content: 'hi hihi hi hi hi hi hi ' },
    { id: 2, content: 'h2' },
    { id: 3, content: 'h3' },
    { id: 4, content: 'h4' },
    { id: 5, content: 'h5' },
    { id: 6, content: 'h6' },
  ];

  return (
    <article css={addTagCss}>
      <NavigationBar title="영감 추가" />
      <TagFrom applyedTags={tags} registeredTags={tagsB} onSave={addTag} onRemove={removeTag} />
    </article>
  );
}

const addTagCss = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
