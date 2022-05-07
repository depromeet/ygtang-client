type TagType = Pick<TagInterface, 'content' | 'id'>;

interface TagInterface {
  id: number;
  memberResponse: MemberResponseInterface;
  content: string;
  createdDatetime: string;
  updatedDatetime: string;
}
