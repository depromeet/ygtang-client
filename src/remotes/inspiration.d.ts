type InspirationType = 'TEXT' | 'IMAGE' | 'LINK';

interface OpenGraphResponse {
  code: number;
  description: string | null;
  siteName: string | null;
  title: string | null;
  url: string | null;
  image: string | null;
}

interface InspirationInterface {
  id: number;
  memberResponse: MemberResponseInterface;
  tagResponses: TagInterface[];
  type: InspirationType;
  content: string;
  memo: string;
  openGraphResponse: OpenGraphResonse;
  createdDatetime: string;
  updatedDatetime: string;
}
