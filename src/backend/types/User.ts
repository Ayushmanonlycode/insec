export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
