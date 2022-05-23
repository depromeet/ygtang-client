interface MemberResponseInterface {
  id: number;
  nickName: string;
  email: string;
}

type UserInformationType = Omit<MemberResponseInterface, 'id'>;
