import { useRecoilState } from 'recoil';

import { filteredTagsState } from './filteredTagsStates';

interface UseFilteredTagsProps {
  onRejectedAddingTag?: VoidFunction;
}

export function useFilteredTags({ onRejectedAddingTag = () => {} }: UseFilteredTagsProps) {
  const [filteredTags, setFilteredTags] = useRecoilState(filteredTagsState);

  const hasTag = (tag: TagType) => {
    return Boolean(filteredTags.find(_tag => _tag.id === tag.id));
  };

  const addTag = (tag: TagType) => {
    if (hasTag(tag)) {
      onRejectedAddingTag();
      return;
    }
    setFilteredTags(prevTags => [...prevTags, tag]);
  };

  const removeTag = (id: number) => {
    setFilteredTags(prevTags => prevTags.filter(_tag => _tag.id !== id));
  };

  return { filteredTags, hasTag, addTag, removeTag };
}
