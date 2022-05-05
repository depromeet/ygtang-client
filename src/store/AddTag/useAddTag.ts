import { useRecoilState } from 'recoil';

import { useToast } from '~/store/Toast';

import { addTagState, Tag } from './addTagStates';

export function useAddTag() {
  const [tags, setTags] = useRecoilState(addTagState);
  const { fireToast } = useToast();

  const hasTag = (tag: Tag) => {
    return Boolean(tags.find(_tag => _tag.id === tag.id));
  };

  const addTag = (tag: Tag) => {
    if (hasTag(tag)) {
      fireToast({ content: '리스트에 테그가 이미 존재합니다.' });
      return;
    }
    setTags([...tags, tag]);
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id === id));
  };

  return { tags, hasTag, setTags, addTag, removeTag };
}
