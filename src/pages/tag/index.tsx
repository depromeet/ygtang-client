import NavigationBar from '~/components/common/NavigationBar';
import TagForm from '~/components/TagForm';
import { useAppliedTags } from '~/store/AppliedTags';

// TODO: 비동기 요청으로 대체
const mockTags: TagType[] = [
  { id: 1, content: 'hi hihi hi hi hi hi hi ' },
  { id: 2, content: 'h2' },
  { id: 3, content: 'h3' },
  { id: 4, content: 'h4' },
  { id: 5, content: 'h5' },
  { id: 6, content: 'h6' },
];

export default function TagPage() {
  const { tags, removeTag, addTag } = useAppliedTags();

  return (
    <article>
      <NavigationBar title="태그 추가" backLink="/" backLinkScrollOption={false} />
      <TagForm applyedTags={tags} registeredTags={mockTags} onSave={addTag} onRemove={removeTag} />
    </article>
  );
}
