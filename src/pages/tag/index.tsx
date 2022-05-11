import NavigationBar from '~/components/common/NavigationBar';
import TagForm from '~/components/TagForm';
import useTagQuery from '~/hooks/api/tag/useTagQuery';
import { useFilteredTags } from '~/store/FilteredTags';

export default function TagPage() {
  const { filteredTags, addTag, removeTag } = useFilteredTags({});
  const { tags } = useTagQuery({ pageNumber: 1 });

  return (
    <article>
      <NavigationBar title="태그 추가" backLink="/" backLinkScrollOption={false} />
      <TagForm
        applyedTags={filteredTags}
        registeredTags={tags}
        onSave={addTag}
        onRemove={removeTag}
      />
    </article>
  );
}
