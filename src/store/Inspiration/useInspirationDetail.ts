import { useRecoilState } from 'recoil';

import { ContentThumbnailProps } from './../../components/home/Thumbnail';
import { inspirationDetailState } from './InspirationDetailState';

export function useInspirationDetail() {
  const [inspirationDetail, setInspirationDetail] = useRecoilState(inspirationDetailState);

  const saveInspirationDetail = ({ id, type, tags, content, openGraph }: ContentThumbnailProps) => {
    setInspirationDetail({ id, type, tags, content, openGraph });
  };

  const resetInspirationDetail = () => {
    setInspirationDetail(null);
  };

  return { inspirationDetail, saveInspirationDetail, resetInspirationDetail };
}
