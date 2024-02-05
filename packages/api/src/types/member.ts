export interface MemberResponseInterface {
  id: number;
  nickName: string;
  email: string;
}

export type UserInformationType = Omit<MemberResponseInterface, "id">;
