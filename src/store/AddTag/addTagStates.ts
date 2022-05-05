import { atom } from 'recoil';

export interface Tag {
  id: string;
  content: string;
}

export const addTagState = atom<Tag[]>({
  key: 'addTagState',
  default: [],
});
