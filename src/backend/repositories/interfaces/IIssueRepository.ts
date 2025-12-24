import { Issue } from '../../types/Issue';
import { NewIssue, UpdateIssue } from '../../../lib/db/schema';

export interface IIssueRepository {
  findById(id: string): Promise<Issue | null>;
  findAll(userId: string, filters?: { type?: string }): Promise<Issue[]>;
  create(issue: NewIssue): Promise<Issue>;
  update(id: string, issue: UpdateIssue): Promise<Issue>;
  delete(id: string): Promise<void>;
  isOwner(issueId: string, userId: string): Promise<boolean>;
}
