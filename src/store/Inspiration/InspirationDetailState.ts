import { atom } from 'recoil';

export interface InspirationDetailState {
  id: number;
  tags: TagInterface[];
  type: InspirationType;
  content: string;
  memo: string;
  openGraph?: OpenGraphResonse;
}

export const inspirationDetailState = atom<InspirationDetailState | null>({
  key: 'inspirationDetailState',
  default: null,
});
