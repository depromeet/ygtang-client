import { IconButton } from '~/components/common/Button';
import Menu from '~/components/my/Menu';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import { useToast } from '~/store/Toast';

export default function MyTagItem({ tag }: { tag: TagType }) {
  const { deleteTag } = useTagMutation();
  const { fireToast } = useToast();
  const onDelete = () => {
    deleteTag(tag.id, {
      onSuccess: () => {
        fireToast({ content: '태그 삭제 성공!' });
      },
    });
  };

  return (
    <Menu
      label={tag.content}
      rightElement={<IconButton onClick={onDelete} iconName="RemoveCircleIcon" light />}
    />
  );
}
