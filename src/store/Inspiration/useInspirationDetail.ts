import { useRecoilState } from 'recoil';

import { InspirationDetailState, inspirationDetailState } from './InspirationDetailState';

export function useInspirationDetail() {
  const [inspirationDetail, setInspirationDetail] = useRecoilState<InspirationDetailState | null>(
    inspirationDetailState
  );

  const saveInspirationDetail = ({
    id,
    type,
    tags,
    content,
    openGraph,
    memo,
  }: InspirationDetailState) => {
    setInspirationDetail({ id, type, tags, content, memo, openGraph });
  };

  const resetInspirationDetail = () => {
    setInspirationDetail(null);
  };

  return { inspirationDetail, saveInspirationDetail, resetInspirationDetail };
}
