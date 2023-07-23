interface TagInterface {
  id: number;
  count: number;
  memberResponse: MemberResponseInterface;
  content: string;
  createdDatetime: string;
  updatedDatetime: string;
}

type TagType = Pick<TagInterface, 'content' | 'id' | 'count'>;
