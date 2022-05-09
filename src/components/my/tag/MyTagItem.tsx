import { IconButton } from '~/components/common/Button';
import Menu from '~/components/my/Menu';

export default function MyTagItem({ tag }: { tag: TagType }) {
  const onDelete = () => {
    // TODO: Tag delete API 호출
    console.log(tag.id);
  };

  return (
    <Menu
      label={tag.content}
      rightElement={<IconButton onClick={onDelete} iconName="RemoveCircleIcon" light />}
    />
  );
}
