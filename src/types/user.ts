export interface UserDoc {
  $id: string;
  name: string;
  email: string;
  accountId: string;
  roles: ("user" | "student" | "coach")[];
}