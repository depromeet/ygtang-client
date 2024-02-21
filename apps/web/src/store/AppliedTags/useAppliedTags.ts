import { useEffect } from "react";
import { TagType } from "@ygtang/api";
import { useRecoilState } from "recoil";

import { useToast } from "~/store/Toast";

import { appliedTagsState } from "./appliedTagsStates";

export function useAppliedTags(isUseUnmounted = false) {
  const [tags, setTags] = useRecoilState(appliedTagsState);
  const { fireToast } = useToast();

  const hasTag = (tag: TagType) => {
    return Boolean(tags.find((_tag) => _tag.id === tag.id));
  };

  const addTag = (tag: TagType) => {
    if (hasTag(tag)) {
      fireToast({ content: "이미 존재하는 태그입니다." });
      return;
    }
    setTags((preTags) => [...preTags, tag]);
  };

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  useEffect(() => {
    if (!isUseUnmounted) return;
    return () => {
      setTags([]);
    };
  }, [setTags, isUseUnmounted]);

  return { tags, hasTag, setTags, addTag, removeTag };
}
