import { atom } from 'recoil';

import { TagType } from '~/components/common/Tag';

export const addTagState = atom<TagType[]>({
  key: 'addTagState',
  default: [],
});
