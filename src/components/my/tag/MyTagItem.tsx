import { IconButton } from '~/components/common/Button';
import Menu from '~/components/my/Menu';

export default function MyTagItem({
  tag,
  onDelete,
}: {
  tag: TagType;
  onDelete: (id: number) => void;
}) {
  return (
    <Menu
      title={tag.content}
      rightElement={
        <IconButton
          onClick={() => {
            onDelete(tag.id);
          }}
          iconName="RemoveCircleIcon"
          light
        />
      }
    />
  );
}
