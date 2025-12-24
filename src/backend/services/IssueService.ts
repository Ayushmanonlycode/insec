import { IIssueRepository } from '../repositories/interfaces/IIssueRepository';
import { NewIssue, UpdateIssue } from '@/lib/db/schema';
import { CacheService } from '../utils/CacheService';

export class IssueService {
  private readonly CACHE_TTL = 120; // 2 minutes

  constructor(private issueRepository: IIssueRepository) {}

  async createIssue(userId: string, data: Omit<NewIssue, 'userId'>) {
    const issue = await this.issueRepository.create({
      ...data,
      userId,
    } as NewIssue);
    
    this.invalidateUserIssuesCache(userId);
    return issue;
  }

  async getAllIssues(userId: string, type?: string) {
    const cacheKey = `issues:${userId}:${type || 'all'}`;
    const cachedData = CacheService.get<any[]>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const issues = await this.issueRepository.findAll(userId, { type });
    CacheService.set(cacheKey, issues, this.CACHE_TTL);
    return issues;
  }

  async getIssueById(issueId: string, userId: string) {
    const cacheKey = `issue:${issueId}`;
    const cachedIssue = CacheService.get<any>(cacheKey);

    if (cachedIssue && cachedIssue.userId === userId) {
      return cachedIssue;
    }

    const issue = await this.issueRepository.findById(issueId);
    if (!issue || issue.userId !== userId) {
      throw new Error('Issue not found or unauthorized');
    }
    
    CacheService.set(cacheKey, issue, this.CACHE_TTL);
    return issue;
  }

  async updateIssue(issueId: string, userId: string, data: UpdateIssue) {
    const isOwner = await this.issueRepository.isOwner(issueId, userId);
    if (!isOwner) {
      throw new Error('Unauthorized: Access Denied');
    }
    const updated = await this.issueRepository.update(issueId, data);
    
    this.invalidateUserIssuesCache(userId);
    CacheService.delete(`issue:${issueId}`);
    return updated;
  }

  async deleteIssue(issueId: string, userId: string) {
    const isOwner = await this.issueRepository.isOwner(issueId, userId);
    if (!isOwner) {
      throw new Error('Unauthorized: Access Denied');
    }
    const result = await this.issueRepository.delete(issueId);
    
    this.invalidateUserIssuesCache(userId);
    CacheService.delete(`issue:${issueId}`);
    return result;
  }

  private invalidateUserIssuesCache(userId: string) {
    const types = ['all', 'Cloud Security', 'Redteam Assessment', 'VAPT'];
    types.forEach(type => CacheService.delete(`issues:${userId}:${type}`));
  }
}
