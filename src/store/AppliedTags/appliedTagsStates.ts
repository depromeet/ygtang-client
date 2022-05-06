import { atom } from 'recoil';

import { TagType } from '~/components/common/Tag';

export const appliedTagsState = atom<TagType[]>({
  key: 'addTagState',
  default: [],
});
