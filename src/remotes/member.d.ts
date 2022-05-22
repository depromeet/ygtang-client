interface MemberResponseInterface {
  id: number;
  nickName: string;
  email: string;
}

type UserInformationInterface = Omit<MemberResponseInterface, 'id'>;
