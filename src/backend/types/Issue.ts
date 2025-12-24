export type IssueType = 'Cloud Security' | 'Redteam Assessment' | 'VAPT';
export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Issue {
  id: string;
  userId: string;
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
}
