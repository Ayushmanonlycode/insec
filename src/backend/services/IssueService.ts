import { IIssueRepository } from '../repositories/interfaces/IIssueRepository';
import { NewIssue, UpdateIssue } from '@/lib/db/schema';

export class IssueService {
  constructor(private issueRepository: IIssueRepository) {}

  async createIssue(userId: string, data: Omit<NewIssue, 'userId'>) {
    return this.issueRepository.create({
      ...data,
      userId,
    } as NewIssue);
  }

  async getAllIssues(userId: string, type?: string) {
    return this.issueRepository.findAll(userId, { type });
  }

  async getIssueById(issueId: string, userId: string) {
    const issue = await this.issueRepository.findById(issueId);
    if (!issue || issue.userId !== userId) {
      throw new Error('Issue not found or unauthorized');
    }
    return issue;
  }

  async updateIssue(issueId: string, userId: string, data: UpdateIssue) {
    const isOwner = await this.issueRepository.isOwner(issueId, userId);
    if (!isOwner) {
      throw new Error('Unauthorized: Access Denied');
    }
    return this.issueRepository.update(issueId, data);
  }

  async deleteIssue(issueId: string, userId: string) {
    const isOwner = await this.issueRepository.isOwner(issueId, userId);
    if (!isOwner) {
      throw new Error('Unauthorized: Access Denied');
    }
    return this.issueRepository.delete(issueId);
  }
}
