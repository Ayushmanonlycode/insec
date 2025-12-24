import { db } from '../../../lib/db';
import { users, User, NewUser } from '../../../lib/db/schema';
import { eq, or } from 'drizzle-orm';
import { IUserRepository } from '../interfaces/IUserRepository';

export class DrizzleUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0] || null;
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User[]> {
    return await db.select().from(users).where(or(eq(users.email, email), eq(users.username, username)));
  }

  async create(user: NewUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const result = await db.update(users).set(user).where(eq(users.id, id)).returning();
    return result[0];
  }
}
