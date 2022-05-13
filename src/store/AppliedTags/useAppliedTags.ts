import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useToast } from '~/store/Toast';

import { appliedTagsState } from './appliedTagsStates';

export function useAppliedTags(isUseUnmounted = false) {
  const [tags, setTags] = useRecoilState(appliedTagsState);
  const { fireToast } = useToast();

  const hasTag = (tag: TagType) => {
    return Boolean(tags.find(_tag => _tag.id === tag.id));
  };

  const addTag = (tag: TagType) => {
    if (hasTag(tag)) {
      fireToast({ content: '리스트에 태그가 이미 존재합니다.' });
      return;
    }
    setTags(preTags => [...preTags, tag]);
  };

  const removeTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  useEffect(() => {
    if (!isUseUnmounted) return;
    return () => {
      setTags([]);
    };
  }, [setTags, isUseUnmounted]);

  return { tags, hasTag, setTags, addTag, removeTag };
}
