import { atom } from 'recoil';

import { ContentThumbnailProps } from '~/components/home/Thumbnail';

export const inspirationDetailState = atom<ContentThumbnailProps | null>({
  key: 'inspirationDetailState',
  default: null,
});
