import { useQuery } from "@tanstack/react-query";
import { get } from "@ygtang/http";

import { InspirationInterface } from "../../types/inspiration";

export const INSPIRATION_BY_ID_QUERY_KEY = "inspirationById";

export const fetchInspirationById = (id: string | undefined) => {
  return get<InspirationInterface>(`/v1/inspiration/${id}`);
};

export function useInspirationById({
  inspirationId,
}: {
  inspirationId: string | undefined;
}) {
  const { data: inspiration, isLoading } = useQuery({
    queryKey: [INSPIRATION_BY_ID_QUERY_KEY, inspirationId],
    queryFn: () => fetchInspirationById(inspirationId).then((res) => res.data),
    enabled: Boolean(inspirationId),
  });

  return { inspiration, isLoading };
}
