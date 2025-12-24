import { z } from 'zod';

export class IssueValidator {
  static createIssueSchema = z.object({
    type: z.enum(['Cloud Security', 'Redteam Assessment', 'VAPT']),
    title: z.string().min(5).max(255).trim(),
    description: z.string().min(10).trim(),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
    status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']).optional(),
  });

  static updateIssueSchema = z.object({
    type: z.enum(['Cloud Security', 'Redteam Assessment', 'VAPT']).optional(),
    title: z.string().min(5).max(255).trim().optional(),
    description: z.string().min(10).trim().optional(),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
    status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']).optional(),
  });
}
