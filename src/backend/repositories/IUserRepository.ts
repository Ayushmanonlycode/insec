  import { User, NewUser } from '@/lib/db/schema';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User[]>;
  create(user: NewUser): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
}
