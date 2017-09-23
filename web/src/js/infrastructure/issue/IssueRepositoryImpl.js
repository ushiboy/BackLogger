/* @flow */
import type { IssueRepository } from '../../domain/issue/IssueRepository.js';
import Issue from '../../domain/issue/Issue.js';

export default class IssueRepositoryImpl implements IssueRepository {

  static status: Map<number, Issue[]>;

  replaceAllOf(projectId: number, is: Issue[]): void {
    IssueRepositoryImpl.status.set(projectId, is);
  }

  getAllOf(projectId: number): Issue[] {
    return IssueRepositoryImpl.status.get(projectId) || [];
  }

  get(projectId: number, issueId: number): Issue {
    const issues = IssueRepositoryImpl.status.get(projectId);
    /**
     * FIXME flow に怒られるので苦肉の策
     */
    const i = (issues || []).find(i => i.id === issueId);
    if (i != null) {
      return i;
    }
    throw new Error('nothing');
  }

  store(projectId: number, issue: Issue): void {
    const issues = IssueRepositoryImpl.status.get(projectId) || [];
    const index = issues.findIndex(iInDB => iInDB.id === issue.id);
    issues[index] = issue;
    IssueRepositoryImpl.status.set(projectId, issues);
  }

  remove(projectId: number, issueId: number): void {
    const issues = IssueRepositoryImpl.status.get(projectId) || [];
    IssueRepositoryImpl.status.set(projectId, issues.filter(i => i.id !== issueId));
  }

}

IssueRepositoryImpl.status = new Map();
