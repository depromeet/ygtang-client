import { atom } from 'recoil';

export type InspirationKindFilterType = null | 'TEXT' | 'IMAGE' | 'LINK';

export const inspirationKindFilterState = atom<InspirationKindFilterType>({
  key: 'inspirationKindFilterState',
  default: null,
});
