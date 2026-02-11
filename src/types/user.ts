export interface UserDoc {
  $id: string;
  name: string;
  email: string;
  accountId: string;
  avatar: string;
  roles: ("user" | "student" | "coach")[];
}