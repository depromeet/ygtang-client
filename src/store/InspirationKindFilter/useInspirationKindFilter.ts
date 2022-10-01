import { useRecoilState } from 'recoil';

import { inspirationKindFilterState } from './inpirationKindFilter';

export function useInspirationKindFilter() {
  const [inspirationKindFilter, setInspirationKindFilter] = useRecoilState(
    inspirationKindFilterState
  );

  return { inspirationKindFilter, setInspirationKindFilter };
}
