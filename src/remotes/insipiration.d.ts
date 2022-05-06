type InspirationType = 'TEXT' | 'IMAGE' | 'LINK';

interface InspirationInterface {
  id: number;
  memberResponse: MemberResponseInterface;
  tagResponse: TagInterface[];
  type: InspirationType;
  content: string;
  memo: string;
  createDatetime: string;
  updatedDatetime: string;
}
