import { pgTable, uuid, text, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const issueTypeEnum = pgEnum('issue_type', ['Cloud Security', 'Redteam Assessment', 'VAPT']);
export const issueStatusEnum = pgEnum('issue_status', ['Open', 'In Progress', 'Resolved', 'Closed']);
export const issuePriorityEnum = pgEnum('issue_priority', ['Low', 'Medium', 'High', 'Critical']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: text('password').notNull(),
  fullName: varchar('full_name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const issues = pgTable('issues', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: issueTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  priority: issuePriorityEnum('priority').default('Medium').notNull(),
  status: issueStatusEnum('status').default('Open').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const blogs = pgTable('blogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  issues: many(issues),
  blogs: many(blogs),
}));

export const issuesRelations = relations(issues, ({ one }) => ({
  user: one(users, {
    fields: [issues.userId],
    references: [users.id],
  }),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  author: one(users, {
    fields: [blogs.authorId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Issue = typeof issues.$inferSelect;
export type NewIssue = typeof issues.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type UpdateIssue = Partial<Omit<Issue, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
