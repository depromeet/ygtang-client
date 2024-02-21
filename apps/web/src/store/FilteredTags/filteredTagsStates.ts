import { atom } from 'recoil';

export const filteredTagsState = atom<TagType[]>({
  key: 'filteredTagsState',
  default: [],
});
