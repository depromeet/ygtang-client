import NavigationBar from '~/components/common/NavigationBar';
import TagForm from '~/components/TagForm';
import useGetTagWithPagination from '~/hooks/api/tag/useGetTagWithPagination';
import { useFilteredTags } from '~/store/FilteredTags';

export default function TagPage() {
  const { filteredTags, addTag, removeTag } = useFilteredTags({});
  const { tags } = useGetTagWithPagination({});

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
