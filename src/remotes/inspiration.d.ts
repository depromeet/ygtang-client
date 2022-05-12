type InspirationType = 'TEXT' | 'IMAGE' | 'LINK';

interface OpenGraphResonse {
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
  tagResponse: TagInterface[];
  type: InspirationType;
  content: string;
  memo: string;
  openGraphResponse: OpenGraphResonse;
  createDatetime: string;
  updatedDatetime: string;
}
